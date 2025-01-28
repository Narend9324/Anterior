// app/admin/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side: Image with centered SVG */}
      <div className="relative w-full md:w-1/2 rounded-md">
        {/* Background Image */}
        <Image
          src="/AdminLogin.svg"
          alt="Magic Pattern Background"
          layout="responsive"
          width={1000}
          height={1000}
          className="object-cover h-full"
        />

        {/* Centered SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/LogoWhite.svg"
            alt="Logo SVG"
            width={200} // Adjust size as needed
            height={200}
          />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="w-full p-3 bg-amber-500 text-white rounded-md hover:bg-amber-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
