// components/AdminSidebar.js
import { useState } from 'react';

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Manage collapse state
  
  // Updated navItems with an icon field for each item
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '/Icons/Home.svg' },
    { href: '/admin/categories', label: 'Categories List', icon: '/Icons/CategoryList.svg' },
    { href: '/admin/users', label: 'Users List', icon: '/Icons/UserList.svg' },
    { href: '/admin/products', label: 'Product List', icon: '/Icons/ProductList.svg' },
    { href: '/admin/subscription', label: 'Subscription', icon: '/Icons/Subscription.svg' },
    { href: '/admin/orders', label: 'Order Management', icon: '/Icons/OrderManagement.svg' },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`transition-all duration-300 bg-white h-screen shadow-lg fixed top-0 left-0 ${
        isCollapsed ? 'w-20' : 'w-64' // Dynamic width for sidebar collapse
      }`}
    >
      {/* Logo and collapse button */}
      <div className="p-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={isCollapsed ? "/smallLogo.svg" : "/Logo.svg"}
            alt="Logo"
            className="h-10"
          />
        </div>

        {/* Collapse button */}
        {!isCollapsed && ( // Hide the collapse button when sidebar is collapsed
          <button
            onClick={toggleCollapse}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {'<<'} {/* Display the collapse arrow */}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <ul className="mt-4 space-y-2">
        {navItems.map((item) => (
          <li key={item.href} className="flex">
            <a
              href={item.href}
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <img
                src={item.icon} // Use the image from the navItems object
                alt={item.label}
                className="h-6 w-6 mr-2" // Ensure icon has consistent size
              />
              <span className={`${isCollapsed ? 'hidden' : 'block'}`}>
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
