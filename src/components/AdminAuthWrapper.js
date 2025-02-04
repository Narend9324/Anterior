// components/AdminAuthWrapper.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminAuthWrapper = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if adminToken cookie is set
    const isLoggedIn = document.cookie.includes("adminToken");

    // Redirect to login if not logged in
    if (!isLoggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  // Render the children if the user is authenticated
  return <>{children}</>;
};

export default AdminAuthWrapper;
