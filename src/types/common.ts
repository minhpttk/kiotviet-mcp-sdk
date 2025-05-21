// Common ID description
export const commonIdDescription =
  "It should be a 32-character string (excluding hyphens) formatted as 8-4-4-4-12 with hyphens (-).";

// Format parameter schema
export const formatParameter = {
  type: "string",
  enum: ["json", "markdown"],
  description:
    "Specify the response format. 'json' returns the original data structure, 'markdown' returns a more readable format. Use 'markdown' when the user only needs to read the page and isn't planning to write or modify it. Use 'json' when the user needs to read the page with the intention of writing to or modifying it.",
  default: "markdown",
};