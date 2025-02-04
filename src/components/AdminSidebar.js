import { useState } from "react";

const AdminSidebar = ({ isCollapsed, toggleCollapse }) => {
  // Updated navItems with an icon field for each item
  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "/Icons/Home.svg" },
    {
      href: "/admin/categories",
      label: "Categories List",
      icon: "/Icons/CategoryList.svg",
    },
    { href: "/admin/users", label: "Users List", icon: "/Icons/UserList.svg" },
    {
      href: "/admin/products",
      label: "Product List",
      icon: "/Icons/ProductList.svg",
    },
    // { href: '/admin/subscription', label: 'Subscription', icon: '/Icons/Subscription.svg' }, // For future Use
    {
      href: "/admin/orders",
      label: "Order Management",
      icon: "/Icons/OrderManagement.svg",
    },
  ];

  return (
    <aside
      className={`transition-all duration-300 bg-white h-screen shadow-lg fixed top-0 left-0 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo and collapse button */}
      <div className="p-2 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={isCollapsed ? "/smallLogo.svg" : "/Logo.svg"}
            alt="Logo"
            className="h-10"
          />
        </div>

        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {"<<"}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <ul className="mt-4 space-y-2">
        {navItems.map((item) => (
          <li
            key={item.href}
            className="group flex items-center p-2 mx-4 rounded transition-colors duration-300 hover:bg-gray-200 focus:bg-gray-200 "
          >
            <a href={item.href} className="flex items-center">
              <img
                src={item.icon}
                alt={item.label}
                className="h-6 w-6 mr-2 fill-amber-500"
              />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>
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
