import { query } from "../../../../lib/db"; // Assuming a db utility is already created

// GET: Fetch product list from the database
export async function GET(req) {
  try {
    // Fetch the total number of product from the database
    const totalProductsResult = await query(
      "SELECT COUNT(*) AS totalproducts FROM product"
    );

    const totalProducts = totalProductsResult.rows[0].totalproducts;

    const productResult = await query(`
      SELECT * FROM product
    `);
    if (productResult.rows.length === 0) {
      return new Response(JSON.stringify({ message: "No products found" }), {
        status: 404,
      });
    }
    const product = productResult.rows;

    return new Response(JSON.stringify({ totalProducts, product }), {
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

// POST: Create a new product
export async function POST(req) {
  const { product_name, category_id, image_url, is_active } = await req.json();

  try {
    const result = await query(
      `INSERT INTO product (product_name, category_id, image_url, is_active) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [product_name, category_id, image_url, is_active]
    );

    return new Response(JSON.stringify({ product: result.rows[0] }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// PATCH: Update an existing product
export async function PATCH(req) {
  const { id, product_name, category_id, image_url, is_active } =
    await req.json();

  try {
    const result = await query(
      `UPDATE product 
       SET product_name = $1, category_id = $2, image_url = $3, is_active = $4 
       WHERE id = $5 RETURNING *`,
      [product_name, category_id, image_url, is_active, id]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ product: result.rows[0] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// DELETE: Delete a product
export async function DELETE(req) {
  const { id } = await req.json();

  try {
    const result = await query(
      `DELETE FROM product WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
