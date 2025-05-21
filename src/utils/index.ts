import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Filter tools based on an enabled set
 */
export function filterTools(tools: Tool[], enabledToolsSet?: Set<string>): Tool[] {
  if (!enabledToolsSet || enabledToolsSet.size === 0) {
    return tools;
  }
  
  return tools.filter(tool => enabledToolsSet.has(tool.name));
}