"use client"

import AdminAuthWrapper from '@/components/AdminAuthWrapper'
import AdminLayout from '@/components/AdminLayout'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

function addProduct() {
  const [productName, setProductName] = useState("");
  const [printingCost, setPrintingCost] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null); // For file upload

  const router = useRouter();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      product_name: productName,
      product_description: productDescription,
      category_id: selectedCategory,
      price: printingCost,
      is_active: isActive,
    };

    try {
      // Add the product first
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Product added successfully:", data);

        // After adding product, upload image
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('product_id', data.product.id); // Assuming product ID is in the response

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            console.log("Image uploaded successfully:", uploadData);
          } else {
            console.error("Failed to upload image");
          }
        }

        router.push("/admin/products"); // Redirect after adding product and uploading image
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <div className="container mx-auto p-10 pt-16">
          <h1 className="text-3xl font-bold mb-4">Add Product</h1>
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md ${
                      selectedCategory === "1" ? "bg-orange-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory("1")}
                  >
                    Category 1
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md ${
                      selectedCategory === "2" ? "bg-orange-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory("2")}
                  >
                    Category 2
                  </button>
                </div>
              </div>

              {/* Printing Cost */}
              <div>
                <label htmlFor="printingCost" className="block text-sm font-medium text-gray-700">
                  Printing Cost
                </label>
                <input
                  type="number"
                  id="printingCost"
                  value={printingCost}
                  onChange={(e) => setPrintingCost(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                />
              </div>

              {/* Product Description */}
              <div className="col-span-2">
                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                  rows="4"
                />
              </div>

              {/* Image Upload */}
              <div className="col-span-2">
                <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="productImage"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AdminAuthWrapper>
  )
}

export default addProduct;
