"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("userRawId");
    if (!storedUsername) {
      router.push("/");
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("userRawId");
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Home</h2>
        <button
          onClick={signOut}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
