import { useEffect, useState } from "react";

function GridSection() {
  const [images, setImages] = useState([]);

  // Fetch the images from the API when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/images"); // Call your API endpoint
      const data = await response.json();
      setImages(data); // Set the images to state
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-8 p-4">
      {images.length > 0 ? (
        images.map((image) => (
          <div
            key={image.id}
            className="rounded-2xl overflow-hidden content-center shadow-lg bg-slate-50"
          >
            <img
              src={image.filename} // Assuming the S3 URL is stored in the filename column
              alt={`Product ${image.product_name}`} // Use the product name here for the alt text
              className="w-full h-auto object-fill"
            />
            <p className="text-gray-900 text-center font-bold mt-2">
              {image.product_name} {/* Display the product name here */}
            </p>
          </div>
        ))
      ) : (
        <p>No images to display</p>
      )}
    </div>
  );
}

export default GridSection;
