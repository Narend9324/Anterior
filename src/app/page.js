"use client";

import { useEffect, useState } from "react";
import GridSection from "@/components/GridSection";
import Image from "next/image";
import Navbar from "@/components/Navbar";
export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        {/* ***************************
            ------- SECTION-1 ---------
            *************************** */}

        <div>
          <section className=" w-full h-[100vh] max-h-[613px] relative overflow-hidden rounded-lg">
            <Image
              src="/MagicPattern.svg"
              alt="Magic Pattern Background"
              layout="fill"
              objectFit="cover"
            />
            <div className="content absolute top-1/3 left-[55%] transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="hero-content ">Over 1 Million+ 3D Models</h1>
              <p className="">
                Est amet ante aliquet lacus imperdiet. Nulla id scelerisque
                condimentum dictum suspendisse arcu tellus. Pellentesque
                fermentum urna dui nullam quam leo risus pulvinar.
              </p>
            </div>
          </section>
        </div>
      </main>
      <div className="">
        <h1>User Information</h1>
        {user ? (
          <div>
            <p>
              <strong>ID:</strong> {user.user_id}
            </p>
            <p>
              <strong>Name:</strong> {user.full_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p>No user found.</p>
        )}
      </div>

      {/* ***************************
            ------- SECTION-2 ---------
            *************************** */}
      <GridSection />
    </>
  );
}
