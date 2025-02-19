import { query } from "../../../../lib/db"; // Assuming a db utility is already created

// GET: Fetch product list from the database
export async function GET(req) {
  try {
    // Fetch the total number of products from the database
    const totalProductsResult = await query(
      "SELECT COUNT(*) AS totalproducts FROM product"
    );

    const totalProducts = totalProductsResult.rows[0].totalproducts;

    // Fetch products along with their associated images
    const productResult = await query(
      `
        SELECT * FROM product
      `
    );

    if (productResult.rows.length === 0) {
      return new Response(JSON.stringify({ message: "No products found" }), {
        status: 404,
      });
    }

    var productResults = productResult.rows;

    for (let i = 0; i < productResults.length; i++) {
      const pid = productResults[i].id;

      const productimages = await query(
        `
          SELECT * FROM product_images where product_id = ${pid} and  image_type = 'image/png' order by id asc limit 1
        `
      );
      productResults[i]["images"] = productimages.rows[0];
    }

    return new Response(
      JSON.stringify({ totalProducts, products: productResults }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// POST: Create a new product
export async function POST(req) {
  try {
    // Parse incoming request
    const { product_name, product_description, category_id, price, is_active } = await req.json();

    // Input validation (can be extended as needed)
    if (!product_name || !category_id || !price) {
      return new Response(
        JSON.stringify({ message: "Product name, category, and price are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert product into the database
    const result = await query(
      `INSERT INTO product (product_name, product_description, category_id, price, is_active, is_delete, created_at)
       VALUES ($1, $2, $3, $4, $5, FALSE, NOW()) RETURNING *`,
      [product_name, product_description || null, category_id, price, is_active || true]
    );

    const newProduct = result.rows[0];

    // Respond with the newly created product
    return new Response(JSON.stringify({ product: newProduct }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
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
