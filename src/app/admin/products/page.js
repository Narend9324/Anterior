"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import AdminAuthWrapper from "@/components/AdminAuthWrapper";

function ProductList() {
  const [products, setProducts] = useState([]); // Initialize as an empty array

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        console.log('response::',response)
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

  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <h1 className="text-3xl font-bold py-16">Product List</h1>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 max-w-24 flex flex-wrap">Product ID</th>
              <th className="py-2 items-center">Product Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                {console.log('PRODUCT::',product)}
                <td className="py-2">{product.id}</td>
                <td className="py-2 ">{product.product_name}</td>
                <td className="py-2 max-w-24 ">{product.product_description}</td>
                <td className="py-2">{product.is_active===true ? "Active" : 0}</td>
              </tr>
             ))} 
          </tbody>
        </table>
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

export default ProductList;
