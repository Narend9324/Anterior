import { query } from "../../../../lib/db"; // Assuming a db utility is already created

export async function GET(req) {
  try {
    // Fetch product list from the database
    const result = await query(`
      SELECT * FROM product
    `);
        // console.log('result::',result)
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "No products found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ products: result.rows }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
