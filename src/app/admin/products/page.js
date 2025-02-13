"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import AdminAuthWrapper from "@/components/AdminAuthWrapper";
import { useRouter } from "next/navigation"; // for redirection after edit

function ProductList() {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const router = useRouter();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products); // Ensure data.products exists in your API response
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }

        // Remove the deleted product from the UI
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Handle product status toggle (Active/Inactive)
  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: updatedStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product status");
      }

      // Update the product status in the UI
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, is_active: updatedStatus }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  // Handle edit product (redirect to edit form)
  const handleEditProduct = (productId) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <div className="flex justify-between items-center pt-20 pb-5">
          <h1 className="text-3xl font-bold">Product List</h1>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Add Product
          </button>
        </div>

        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-orange-50 border-b text-sm">
            <tr>
              <th className="py-2 px-6 text-left">Product ID</th>
              <th className="py-2 px-6 text-left">Image</th>
              <th className="py-2 px-6 text-left">Product Name</th>
              <th className="py-2 px-6 text-left">Category</th>
              <th className="py-2 px-6 text-left">Status</th>
              <th className="py-2 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-4 px-6">{product.id}</td>
                <td className="py-4 px-6">
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="h-10 w-10 object-cover rounded"
                  />
                </td>
                <td className="py-4 px-6">{product.product_name}</td>
                <td className="py-4 px-6">
                  <span className="bg-amber-600 text-white py-1 px-2 rounded-md text-sm">
                    Category {product.category_id}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={product.is_active}
                      onChange={() =>
                        handleToggleStatus(product.id, product.is_active)
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 dark:bg-gray-700 peer-checked:bg-orange-600 rounded-full peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {product.is_active ? "Active" : "Inactive"}
                    </span>
                  </label>
                </td>
                <td className="py-4 px-6 flex items-center space-x-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

export default ProductList;
