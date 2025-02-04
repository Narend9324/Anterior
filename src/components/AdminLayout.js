"use client";

import { useState, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children, noPadding = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Manage sidebar state

  // Toggle the sidebar collapse
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prevState) => !prevState);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

      {/* Content Wrapper */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Navbar */}
        <AdminNavbar isCollapsed={isCollapsed} />

        {/* Main Content */}
        <main className={noPadding ? "" : "p-6"}>
          {" "}
          {/* Conditional padding */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
