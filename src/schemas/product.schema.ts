import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { paginationProperties } from "./common.schema";

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
