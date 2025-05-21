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
import * as productSchemas from "../schemas/product.schema";
import * as categorySchemas from "../schemas/category.schema";
import * as customerSchemas from "../schemas/customer.schema";
import { ToolFactory } from "../factory/tool.factory";

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

        const toolName = request.params.name;
        const args = request.params.arguments;
        
        try {
          // Lấy strategy từ factory
          const strategy = ToolFactory.getStrategy(toolName);
          
          // Validate tham số
          strategy.validateArgs(args);
          
          // Thực thi strategy
          const response = await strategy.execute(args, kiotviet);
          
          // Kiểm tra tham số định dạng và trả về response phù hợp
          const requestedFormat = args.format || "markdown";

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
          throw error;
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
  const tools = ToolFactory.getFilteredSchemas(enabledToolsSet);
  return { tools };
});

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// Start the server when this file is executed
(async () => {
  await startServer(undefined, true); 
})();