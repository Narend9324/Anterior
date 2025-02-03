// app/admin/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/AdminSidebar";
import AdminStats from "../../components/AdminStats";
import AdminLayout from "@/components/AdminLayout";

 function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if adminToken cookie is set
    const isLoggedIn = document.cookie.includes("adminToken");

    // Redirect to login if not logged in
    if (!isLoggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    // <div className="admin-dashboard flex flex-row">
    //   <Sidebar />
    //   <div className="dashboard-content">
    //     <h1>Admin Dashboard</h1>
    //     <AdminStats />
    //   </div>
    // </div>
    <AdminLayout> {/* Wrap your page content with the layout */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* Your dashboard content here */}
        <p>Welcome to the admin dashboard.</p>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;