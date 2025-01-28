import AWS from 'aws-sdk';

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

    if (!file) {
      return new Response(JSON.stringify({ message: 'No file uploaded' }), { status: 400 });
    }

    // Convert file stream to buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
      Key: `${Date.now()}_${file.name}`, // File name in S3
      Body: buffer, // File content as a buffer
      ContentType: file.type, // File type
      ACL: 'public-read', // Set permissions (public access)
    };

    // Upload the file to S3
    const data = await s3.upload(params).promise();
    
    return new Response(JSON.stringify({ url: data.Location }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error uploading to S3:', error);

    return new Response(JSON.stringify({ message: 'Upload failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

