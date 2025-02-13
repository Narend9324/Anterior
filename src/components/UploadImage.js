import { useState } from 'react';

function UploadImage() {
  const [image, setImage] = useState(null);
  const [productId, setProductId] = useState(''); // State to hold product ID
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };

  const handleProductIdChange = (e) => {
    setProductId(e.target.value); // Update the product ID state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', image); // Append image to form data
    formData.append('product_id', productId); // Append product ID to form data

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.url); // Get and display the uploaded image URL
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={handleProductIdChange}
          required
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
