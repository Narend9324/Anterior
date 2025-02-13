import { useEffect, useState } from 'react';

function GridSection
() {
  const [images, setImages] = useState([]);

  // Fetch the images from the API when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/images'); // Call your API endpoint
      const data = await response.json();
      setImages(data); // Set the images to state
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.length > 0 ? (
        images.map((image) => (
          <div key={image.id} className="border rounded overflow-hidden shadow-lg">
            <img
              src={image.filename} // Assuming the S3 URL is stored in the filename column
              alt={`Product ${image.product_id}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))
      ) : (
        <p>No images to display</p>
      )}
    </div>
  );
}

export default GridSection
;
