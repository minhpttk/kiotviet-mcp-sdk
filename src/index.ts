import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { KiotVietService } from './service/kiotviet_service';

// Export KiotVietService để người dùng có thể sử dụng trực tiếp
export { KiotVietService };

// Class để tạo KiotViet MCP Server
export class KiotVietMcpServer {
  private server: McpServer;
  private kiotviet: KiotVietService;

  constructor(kiotvietService?: KiotVietService) {
    // Cho phép người dùng truyền vào service riêng hoặc tạo mới
    this.kiotviet = kiotvietService || new KiotVietService();
    
    this.server = new McpServer({
      name: 'KiotViet',
      description: 'KiotViet MCP server',
      version: '1.0.0',
    });
    
    this.registerTools();
  }

  private registerTools() {
    // Products
    this.server.tool(
      "getProducts",
      {arguments : { page: { type: "number", default: 1 }, pageSize: { type: "number", default: 10 } } },
      async (args) => {
        const result = await this.kiotviet.getProducts(args);
        return {
          content:[
            {
              type: "text",
              text: `Products: ${JSON.stringify(result)}`,
            },
          ]
        }
      }
    );

    // Categories
    this.server.tool(
      "getCategories",
      {arguments : { page: { type: "number", default: 1 }, pageSize: { type: "number", default: 10 } } },
      async (args) => {
        const result = await this.kiotviet.getCategories(args);
        return {
          content:[
            {
              type: "text",
              text: `Categories: ${JSON.stringify(result)}`,
            },
          ]
        }
      }
    );

    this.server.tool(
      "getCategoryById",
      {arguments : { id: { type: "string" } } },
      async (args) => {
        const result = await this.kiotviet.getCategoryById(args.id);
        return {
          content:[
            {
              type: "text",
              text: `Category: ${JSON.stringify(result)}`,
            },
          ]
        }
      }
    );

    // Orders
    this.server.tool(
      "getOrders",
      {arguments : { page: { type: "number", default: 1 }, pageSize: { type: "number", default: 10 } } },
      async (args) => {
        const result = await this.kiotviet.getOrders(args);
        return {
          content:[
            {
              type: "text",
              text: `Orders: ${JSON.stringify(result)}`,
            },
          ]
        }
      }
    );

    this.server.tool(
      "getOrderById",
      {arguments : { id: { type: "string" } } },
      async (args) => {
        const result = await this.kiotviet.getOrderById(args.id);
        return {
          content:[
            {
              type: "text",
              text: `Order: ${JSON.stringify(result)}`,
            },
          ]
        }
      }
    );

    // Customers
    this.server.tool(
      "getCustomers",
      {arguments : { page: { type: "number", default: 1 }, pageSize: { type: "number", default: 10 } } },
      async (args) => {
        const result = await this.kiotviet.getCustomers(args);
        return {
          content:[
            {
              type: "text",
              text: `Customers: ${JSON.stringify(result)}`,
            },
          ]
        }
      }
    );
  }

  // Kết nối với StdIO transport (cho Claude Desktop)
  async connectWithStdio() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    return transport;
  }

}

// Export hàm helper để tạo server nhanh
export function createStdioServer() {
  const server = new KiotVietMcpServer();
  return server.connectWithStdio();
}
