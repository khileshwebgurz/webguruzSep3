export function getQueryParams(request) {
  // Extract URL from the request object
  const url = new URL(request.url);

  // Extract search parameters
  const { searchParams } = url;

  // Parse query parameters
  const page = parseInt(searchParams.get("page")) || 1; // Default to page 1
  const limit = parseInt(searchParams.get("limit")) || 10; // Default to 10 posts per page

  return { page, limit };
}

  