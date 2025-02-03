// components/AdminLayout.js
import { useState, useCallback } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminLayout = ({ children, noPadding = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Initialize to false

  // useCallback to prevent unnecessary re-renders
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Conditionally render Sidebar */}
      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 overflow-y-auto">
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <main className={noPadding ? '' : 'p-6'}> {/* Conditional padding */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
