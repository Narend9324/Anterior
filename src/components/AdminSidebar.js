// src/components/Sidebar.js
"use client";
import Link from "next/link";

 function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Anterior</h2>
      
      <nav>
        <Link href="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard
        </Link>
        <Link href="/admin/categories" className="block py-2 px-4 hover:bg-gray-700 rounded">Categories List
        </Link>
        <Link href="/admin/users"
           className="block py-2 px-4 hover:bg-gray-700 rounded">Users List
        </Link>
        <Link href="/admin/products"
           className="block py-2 px-4 hover:bg-gray-700 rounded">Product List
        </Link>
        <Link href="/admin/subscriptions"
           className="block py-2 px-4 hover:bg-gray-700 rounded">Subscription
        </Link>
        <Link href="/admin/orders"
           className="block py-2 px-4 hover:bg-gray-700 rounded">Order Management
        </Link>
      </nav>
    </div>
  );
}


export default Sidebar;
