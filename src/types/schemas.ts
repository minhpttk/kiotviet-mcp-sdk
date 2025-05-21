import { Tool } from "@modelcontextprotocol/sdk/types.js";


// Pagination
const paginationProperties = {
    currentItem: {
        type: "number",
        description: "The position start get.",
        default: 1,
    },
    pageSize: {
        type: "number",
        description: "The number of items per page.",
        default: 10,
    }
}

// Product Tools
export const getProductsTool: Tool = {
    name: "getProducts",
    description: "Retrieve a list of products from your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            ...paginationProperties,
        }
    }
}

// Category Tools
export const getCategoriesTool: Tool = {
    name: "getCategories",
    description: "Retrieve a list of categories from your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            ...paginationProperties,
        }
    } 
}

export const getCategoryByIdTool: Tool = {
    name: "getCategoryById",
    description: "Retrieve a category by its ID from your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            id: {
                type: "string",
                description: "The ID of the category to retrieve.",
            }
        },
        required: ["id"],
    }
}

// Order tools
export const getOrdersTool: Tool = {
  name: "getOrders",
  description: "Retrieve a list of orders from KiotViet",
  inputSchema: {
    type: "object",
    properties: {
      ...paginationProperties
    }
  }
};

export const getOrderByIdTool: Tool = {
  name: "getOrderById",
  description: "Retrieve a specific order by ID from KiotViet",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the order to retrieve"
      }
    },
    required: ["id"]
  }
};

// Customer tools
export const getCustomersTool: Tool = {
  name: "getCustomers",
  description: "Retrieve a list of customers from KiotViet",
  inputSchema: {
    type: "object",
    properties: {
      ...paginationProperties
    }
  }
};