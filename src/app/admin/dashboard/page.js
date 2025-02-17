"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import AdminAuthWrapper from "@/components/AdminAuthWrapper";

function DashboardPage() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0); // Placeholder for total products

  // Fetch total number of users and products from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("/api/users"); 
        const userData = await userResponse.json();
        setTotalUsers(userData.totalUsers  || 0);

        const productResponse = await fetch("/api/products")
        const productData = await productResponse.json();
        setTotalProducts(productData.totalProducts || 40); 
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <h1 className="admin-title pt-24 pb-10">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg flex p-6 flex-row justify-between ">
            <div className="flex flex-col justify-between gap-16">
              <h2 className="dashboard-grid-title">Total Users</h2>
              <p className="dashboard-grid-content">{totalUsers}</p>
            </div>
            <div>
              <img src="/Person.svg" alt="Person" className=" bg-orange-50 rounded-full p-3" />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg flex p-6 flex-row justify-between">
            <div className="flex flex-col justify-between gap-16">
              <h2 className="dashboard-grid-title">Total Product</h2>
              <p className="dashboard-grid-content">{totalProducts}</p>
            </div>
            <div>
              <img src="/Box.svg" alt="Box" className="bg-orange-50 rounded-full p-3" />
            </div>
          </div>
          
        </div>
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

export default DashboardPage;
