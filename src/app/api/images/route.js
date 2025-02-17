import { query } from '../../../../lib/db'; // Adjust the path as needed

export async function GET(req) {
  try {
    // Fetch all image records and associated product names
    const selectQuery = `
      SELECT pi.*, p.product_name
      FROM product_images pi
      JOIN product p ON pi.product_id = p.id
      ORDER BY pi.created_at DESC;
    `;
    const result = await query(selectQuery);

    // Return the image data with product names as a JSON response
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching images and products from database:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to retrieve images and products',
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
