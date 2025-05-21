import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { paginationProperties } from "./common.schema";

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
