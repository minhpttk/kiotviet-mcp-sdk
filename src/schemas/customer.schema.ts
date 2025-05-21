import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { paginationProperties } from "./common.schema";


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