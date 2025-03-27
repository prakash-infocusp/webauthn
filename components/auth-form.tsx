"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setMessage(data.message || "Registered successfully");
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  const login = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("username", username);
        router.push("/profile");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      setMessage("Login failed");
    }
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold mb-4">WebAuthn Auth</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 border rounded mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={register}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2"
      >
        Register New Pass Key
      </button>
      <button
        onClick={login}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Login
      </button>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
