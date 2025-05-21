
// Pagination
export const paginationProperties = {
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

