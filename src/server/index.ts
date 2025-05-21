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
import * as productSchemas from "../schemas/product.schema";

/**
 * Start the KiotViet MCP server
 */
export async function startServer(enabledToolsSet?: Set<string>, enableMarkdownConversion: boolean = true) {
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
          case "getProductById": {
            const args = request.params.arguments;
            if (!args.id) {
              throw new Error("Missing required argument: id");
            }
            response = await kiotviet.getProductById(String(args.id));
            break;
          }
          case "createProduct": {
            const args = request.params.arguments;
            if (!args.data) {
              throw new Error("Missing required argument: data");
            }
            response = await kiotviet.createProduct(args.data);
            break;
          }
          case "updateProduct": {
            const args = request.params.arguments;
            if (!args.id || !args.data) {
              throw new Error("Missing required arguments: id or data");
            }
            response = await kiotviet.updateProduct(String(args.id), args.data);
            break;
          }
          case "deleteProduct": {
            const args = request.params.arguments;
            if (!args.id) {
              throw new Error("Missing required argument: id");
            }
            response = await kiotviet.deleteProduct(String(args.id));
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
          case "getCustomers": {
            const args = request.params.arguments;
            response = await kiotviet.getCustomers(args);
            break;
          }
          case "getCustomerById": {
            const args = request.params.arguments;
            if (!args.id) {
              throw new Error("Missing required argument: id");
            }
            response = await kiotviet.getCustomerById(String(args.id));
            break;
          }
          default:
            throw new Error(`Unknown tool: ${request.params.name}`);
        }

        // Kiểm tra tham số định dạng và trả về response phù hợp
        const requestedFormat = (request.params.arguments as any)?.format || "markdown";

        // Chỉ chuyển đổi sang markdown nếu cả hai điều kiện được thỏa mãn:
        // 1. Định dạng được yêu cầu là markdown
        // 2. Chức năng chuyển đổi markdown được bật
        if (enableMarkdownConversion && requestedFormat === "markdown") {
          const markdown = await kiotviet.toMarkdown(response);
          return {
            content: [{ type: "text", text: markdown }],
          };
        } else {
          return {
            content: [
              { type: "text", text: JSON.stringify(response, null, 2) },
            ],
          };
        }
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
      // Product Tools
      productSchemas.getProductsTool,
      productSchemas.getProductByIdTool,
      productSchemas.createProductTool,
      productSchemas.updateProductTool,
      productSchemas.deleteProductTool,
      //Category Tools
      schemas.getCategoriesTool,
      schemas.getCategoryByIdTool,
      schemas.getCustomersTool,
      schemas.getCustomerByIdTool,
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
  await startServer(undefined, true); // Bật chuyển đổi markdown theo mặc định
})();