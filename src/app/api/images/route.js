import { query } from '../../../../lib/db'; // Adjust the path as needed

export async function GET(req) {
  try {
    // Fetch all image records from the product_images table
    const selectQuery = 'SELECT * FROM product_images ORDER BY created_at DESC;';
    const result = await query(selectQuery);

    // Return the image data as a JSON response
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching images from database:', error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve images', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
