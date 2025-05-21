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
    },
    format: {
      type: "string",
      enum: ["json", "markdown"],
      description:"Response format (josn or markdown)",
      default: "markdown",
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

export const getProductByIdTool: Tool = {
    name: "getProductById",
    description: "Retrieve a product by its ID from your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            id: {
                type: "string",
                description: "The ID of the product to retrieve.",
            }
        },
        required: ["id"],
    }
}

export const createProductTool: Tool = {
    name: "createProduct",
    description: "Create a new product in your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            data: {
                type: "object",
                description: "The product data to create.",
            }
        },
        required: ["data"],
    }
}

export const updateProductTool: Tool = {
    name: "updateProduct",
    description: "Update an existing product in your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            id: {
                type: "string",
                description: "The ID of the product to update.",
            },
            data: {
                type: "object",
                description: "The updated product data.",
            }
        },
        required: ["id", "data"],
    }
}

export const deleteProductTool: Tool = {
    name: "deleteProduct",
    description: "Delete a product from your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            id: {
                type: "string",
                description: "The ID of the product to delete.",
            }
        },
        required: ["id"],
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
export const createCategoryTool: Tool = {
    name: "createCategory",
    description: "Create a new category in your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            data: {
                type: "object",
                description: "The category data to create.",
            }
        },
        required: ["data"],
    }
}
export const updateCategoryTool: Tool = {
    name: "updateCategory",
    description: "Update an existing category in your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            id: {
                type: "string",
                description: "The ID of the category to update.",
            },
            data: {
                type: "object",
                description: "The updated category data.",
            }
        },
        required: ["id", "data"],
    }
}
export const deleteCategoryTool: Tool = {
    name: "deleteCategory",
    description: "Delete a category from your KiotViet shop.",
    inputSchema: {
        type: "object",
        properties: {
            id: {
                type: "string",
                description: "The ID of the category to delete.",
            }
        },
        required: ["id"],
    }
}

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

export const getCustomerByIdTool: Tool = {
  name: "getCustomerById",
  description: "Retrieve a specific customer by ID from KiotViet",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the customer to retrieve"
      }
    },
    required: ["id"]
  }
};