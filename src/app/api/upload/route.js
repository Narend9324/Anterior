import AWS from 'aws-sdk';
import { query } from '../../../../lib/db'; // Import your PostgreSQL query function

// Configure AWS SDK with credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const productId = formData.get('product_id'); // Assuming you're passing product ID from the form

    // Input validation
    if (!file || !productId) {
      return new Response(JSON.stringify({ message: 'File and product ID are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert file stream to buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
      Key: `${Date.now()}_${file.name}`, // File name in S3 (keeping your original logic)
      Body: buffer, // File content as a buffer
      ContentType: file.type, // File type
      ACL: 'public-read', // Set permissions (public access)
    };

    // Upload the file to S3
    const data = await s3.upload(params).promise();
    const imageUrl = data.Location; // S3 URL
    const filename = params.Key; // File name in S3

    // Insert the S3 URL and file metadata into the product_images table
    const insertQuery = `
      INSERT INTO product_images (product_id, image_type, filename, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const values = [productId, file.type, imageUrl]; // Store the URL in filename field

    const result = await query(insertQuery, values);

    // Return the uploaded file URL and database entry details
    return new Response(JSON.stringify({ 
      message: 'Image uploaded successfully',
      url: imageUrl, 
      image: result.rows[0] // Return the inserted row
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error uploading to S3 or saving to database:', error);

    return new Response(JSON.stringify({ message: 'Upload or database save failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
