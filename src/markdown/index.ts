/**
 * Utilities for converting KiotViet API responses to Markdown
 */

/**
 * Converts KiotViet API response to Markdown
 * @param response Response from KiotViet API
 * @returns Markdown formatted string
 */
export function convertToMarkdown(response: any): string {
  if (!response) return "";

  // Kiểm tra loại phản hồi để xác định cách xử lý
  if (Array.isArray(response.data)) {
    return convertListToMarkdown(response);
  } else if (response.total !== undefined) {
    return convertListToMarkdown(response);
  } else {
    return convertEntityToMarkdown(response);
  }
}

/**
 * Chuyển đổi danh sách các mục thành markdown
 */
function convertListToMarkdown(response: any): string {
  if (!response || !response.data) {
    return "```\nKhông có kết quả\n```";
  }

  let markdown = "";
  const items = response.data;

  // Xác định loại dữ liệu dựa trên thuộc tính của item đầu tiên
  const firstItem = items[0];
  if (!firstItem) {
    return `# Danh sách (${response.total || 0} mục)\n\nKhông có dữ liệu.`;
  }

  // Thêm tiêu đề dựa trên loại dữ liệu
  if (firstItem.code && firstItem.name && firstItem.inventories) {
    markdown += "# Danh sách sản phẩm\n\n";
  } else if (firstItem.categoryName || firstItem.parentId !== undefined) {
    markdown += "# Danh sách danh mục\n\n";
  } else if (firstItem.customerCode || firstItem.contactNumber) {
    markdown += "# Danh sách khách hàng\n\n";
  } else if (firstItem.code && firstItem.soldById) {
    markdown += "# Danh sách đơn hàng\n\n";
  } else {
    markdown += "# Danh sách dữ liệu\n\n";
  }

  // Thêm thông tin tổng kết
  markdown += `Tổng số: **${response.total || items.length}**\n\n`;

  // Tạo bảng dữ liệu
  if (items.length > 0) {
    // Lấy các trường cần hiển thị
    const keysToDisplay = getRelevantKeys(items[0]);
    
    // Tạo header cho bảng
    markdown += "| " + keysToDisplay.map(key => formatHeaderName(key)).join(" | ") + " |\n";
    markdown += "| " + keysToDisplay.map(() => "---").join(" | ") + " |\n";
    
    // Thêm dữ liệu vào bảng
    for (const item of items) {
      const rowData = keysToDisplay.map(key => {
        const value = item[key];
        return formatCellValue(value);
      });
      markdown += "| " + rowData.join(" | ") + " |\n";
    }
  }

  // Thêm thông tin phân trang nếu có
  if (response.pageSize) {
    markdown += `\n> Trang ${response.currentPage || 1}/${Math.ceil(response.total / response.pageSize) || 1}, ${response.pageSize} mục/trang\n`;
  }

  return markdown;
}

/**
 * Chuyển đổi một thực thể đơn lẻ thành markdown
 */
function convertEntityToMarkdown(entity: any): string {
  if (!entity) return "```\nKhông có dữ liệu\n```";

  let markdown = "";

  // Xác định loại thực thể
  if (entity.code && entity.name && entity.inventories) {
    markdown += `# Sản phẩm: ${entity.name}\n\n`;
  } else if (entity.categoryName || entity.parentId !== undefined) {
    markdown += `# Danh mục: ${entity.categoryName || entity.name}\n\n`;
  } else if (entity.customerCode || entity.contactNumber) {
    markdown += `# Khách hàng: ${entity.name || entity.customerName}\n\n`;
  } else if (entity.code && entity.soldById) {
    markdown += `# Đơn hàng: ${entity.code}\n\n`;
  } else {
    markdown += `# Chi tiết dữ liệu\n\n`;
  }

  // Tạo bảng thông tin
  markdown += "## Thông tin chi tiết\n\n";
  markdown += "| Thuộc tính | Giá trị |\n";
  markdown += "|------------|--------|\n";

  // Thêm các trường dữ liệu
  const keysToDisplay = Object.keys(entity).filter(key => {
    // Bỏ qua các mảng lớn để tránh làm rối markdown
    const value = entity[key];
    return !(Array.isArray(value) && value.length > 5);
  });

  for (const key of keysToDisplay) {
    const value = entity[key];
    const formattedKey = formatHeaderName(key);
    const formattedValue = formatCellValue(value);
    
    markdown += `| ${formattedKey} | ${formattedValue} |\n`;
  }

  // Xử lý các mảng con riêng
  for (const key of Object.keys(entity)) {
    const value = entity[key];
    if (Array.isArray(value) && value.length > 0 && value.length <= 20) {
      markdown += `\n## ${formatHeaderName(key)} (${value.length})\n\n`;
      
      if (typeof value[0] === 'object') {
        // Trường hợp mảng đối tượng - tạo bảng
        const subKeys = getRelevantKeys(value[0]);
        
        markdown += "| " + subKeys.map(k => formatHeaderName(k)).join(" | ") + " |\n";
        markdown += "| " + subKeys.map(() => "---").join(" | ") + " |\n";
        
        for (const item of value) {
          const rowData = subKeys.map(k => {
            return formatCellValue(item[k]);
          });
          markdown += "| " + rowData.join(" | ") + " |\n";
        }
      } else {
        // Trường hợp mảng đơn giản
        for (const item of value) {
          markdown += `- ${formatCellValue(item)}\n`;
        }
      }
    }
  }

  return markdown;
}

/**
 * Lấy các khóa liên quan từ đối tượng để hiển thị
 */
function getRelevantKeys(obj: any): string[] {
  if (!obj) return [];
  
  // Ưu tiên các trường thường được hiển thị
  const importantFields = [
    'id', 'code', 'name', 'categoryName', 'price', 'total',
    'customerName', 'description', 'createdDate', 'modifiedDate', 
    'status', 'statusValue'
  ];
  
  // Lọc danh sách trường để lấy fields quan trọng trước
  const availableKeys = Object.keys(obj);
  const primaryKeys = importantFields.filter(field => availableKeys.includes(field));
  
  // Thêm một số trường khác (giới hạn tổng số trường là 6)
  const additionalKeys = availableKeys
    .filter(key => !primaryKeys.includes(key))
    .filter(key => {
      const value = obj[key];
      // Không hiển thị các mảng lớn hoặc đối tượng phức tạp trong bảng
      return !(Array.isArray(value) || 
        (typeof value === 'object' && value !== null));
    })
    .slice(0, Math.max(0, 6 - primaryKeys.length));
  
  return [...primaryKeys, ...additionalKeys];
}

/**
 * Format tên header cho dễ đọc
 */
function formatHeaderName(key: string): string {
  if (!key) return "";
  
  // Xử lý camelCase -> Tiếng Việt
  const formatted = key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
  
  // Các tên trường phổ biến
  const translations: Record<string, string> = {
    'Id': 'ID',
    'Code': 'Mã',
    'Name': 'Tên',
    'CategoryName': 'Danh mục',
    'Price': 'Giá',
    'Total': 'Tổng',
    'Status': 'Trạng thái',
    'CreatedDate': 'Ngày tạo',
    'ModifiedDate': 'Ngày cập nhật'
  };
  
  return translations[formatted] || formatted;
}

/**
 * Format giá trị của cell phù hợp với markdown
 */
function formatCellValue(value: any): string {
  if (value === null || value === undefined) return "";
  
  if (typeof value === 'boolean') {
    return value ? '✓' : '✗';
  }
  
  if (typeof value === 'object') {
    // Nếu là đối tượng Date
    if (value instanceof Date) {
      return value.toISOString();
    }
    
    // Cố gắng hiển thị như JSON ngắn gọn
    try {
      const json = JSON.stringify(value);
      if (json.length > 50) {
        return `*${typeof value}*`;
      }
      return escapeTableCell(json);
    } catch (e) {
      return `*${typeof value}*`;
    }
  }
  
  return escapeTableCell(String(value));
}

/**
 * Escapes characters that need special handling in Markdown table cells
 */
function escapeTableCell(text: string): string {
  if (!text) return "";
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}