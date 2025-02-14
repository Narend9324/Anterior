import { query } from "../../../../../lib/db"; // Assuming a db utility is already created

// GET: Fetch product suggestions based on the search query
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("q"); // Get search query from URL

  if (!searchQuery) {
    return new Response(JSON.stringify({ message: "Query parameter is required" }), {
      status: 400,
    });
  }

  try {
    // Fetch product names that partially match the search query
    const result = await query(
      `SELECT product_name FROM product WHERE product_name ILIKE $1 LIMIT 10`,
      [`%${searchQuery}%`] // Partial match with case-insensitive search
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "No products found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ suggestions: result.rows }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}