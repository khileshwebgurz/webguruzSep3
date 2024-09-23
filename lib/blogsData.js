// lib/blogsData.js
export async function getBlogData(pageNumber) {
  const limit = 10; // Number of items per page
  const skip = (pageNumber - 1) * limit; // Calculate the number of items to skip

  // Fetch data from your API or database
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getdata?page=${pageNumber}&limit=${limit}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  const { data, currentPage, totalPages } = await response.json();
  
  return { posts: data, paginatedPosts: data, totalPages, currentPage };
}
