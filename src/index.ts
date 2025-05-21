#!/usr/bin/env node
/**
 * All API endpoints support both JSON and Markdown response formats.
 * Set the "format" parameter to "json" or "markdown" (default is "markdown").
 * - Use "markdown" for human-readable output when only reading content
 * - Use "json" when you need to process or modify the data programmatically
 *
 * Command-line Arguments:
 * --enabledTools: Comma-separated list of tools to enable (e.g. "notion_retrieve_page,notion_query_database")
 *
 * Environment Variables:
 * - NOTION_API_TOKEN: Required. Your Notion API integration token.
 * - NOTION_MARKDOWN_CONVERSION: Optional. Set to "true" to enable
 *   experimental Markdown conversion. If not set or set to any other value,
 *   all responses will be in JSON format regardless of the "format" parameter.
 */
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { startServer } from "./server/index.js";

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option("enabledTools", {
    type: "string",
    description: "Comma-separated list of tools to enable",
  })
  .parseSync();

const enabledToolsSet = new Set<string>(
  argv.enabledTools ? argv.enabledTools.split(",") : []
);

async function main() {
  const enableMarkdownConversion =
  process.env.NOTION_MARKDOWN_CONVERSION === "true";
  
  await startServer( enabledToolsSet, enableMarkdownConversion);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});