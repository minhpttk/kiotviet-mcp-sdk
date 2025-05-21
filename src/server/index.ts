/**
 * MCP server setup and request handling for KiotViet
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { KiotVietService } from '../service/kiotviet_service';
import * as schemas from "../types/schemas";

/**
 * Start the KiotViet MCP server
 */
export async function startServer(enabledToolsSet?: Set<string>) {
  const server = new Server(
    {
      name: "KiotViet MCP Server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  const kiotviet = new KiotVietService();

  server.setRequestHandler(
    CallToolRequestSchema,
    async (request: CallToolRequest) => {
      console.error("Received CallToolRequest:", request);
      try {
        if (!request.params.arguments) {
          throw new Error("No arguments provided");
        }

        let response;

        switch (request.params.name) {
          case "getProducts": {
            const args = request.params.arguments;
            response = await kiotviet.getProducts(args);
            break;
          }

          case "getCategories": {
            const args = request.params.arguments;
            response = await kiotviet.getCategories(args);
            break;
          }

          case "getCategoryById": {
            const args = request.params.arguments;
            if (!args.id) {
              throw new Error("Missing required argument: id");
            }
            response = await kiotviet.getCategoryById(String(args.id));
            break;
          }

          case "getOrders": {
            const args = request.params.arguments;
            response = await kiotviet.getOrders(args);
            break;
          }

          case "getOrderById": {
            const args = request.params.arguments;
            if (!args.id) {
              throw new Error("Missing required argument: id");
            }
            response = await kiotviet.getOrderById(String(args.id));
            break;
          }

          case "getCustomers": {
            const args = request.params.arguments;
            response = await kiotviet.getCustomers(args);
            break;
          }

          default:
            throw new Error(`Unknown tool: ${request.params.name}`);
        }

        return {
          content: [
            { type: "text", text: JSON.stringify(response, null, 2) },
          ],
        };
      } catch (error) {
        console.error("Error executing tool:", error);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const allTools = [
      schemas.getProductsTool,
      schemas.getCategoriesTool,
      schemas.getCategoryByIdTool,
      schemas.getOrdersTool,
      schemas.getOrderByIdTool,
      schemas.getCustomersTool
    ];
    
    // If enabledToolsSet is provided, filter tools
    const tools = enabledToolsSet 
      ? allTools.filter(tool => enabledToolsSet.has(tool.name))
      : allTools;
    
    return {
      tools: tools,
    };
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// Start the server when this file is executed
(async () => {
  await startServer();
})();