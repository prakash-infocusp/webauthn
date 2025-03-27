"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      const data = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: {
            name: "my backend server",
            id: "localhost",
          },
          user: {
            id: new Uint8Array(32),
            name: username,
            displayName: "",
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 },
            { type: "public-key", alg: -257 },
          ],
        },
      });

      if (data?.rawId) {
        localStorage.setItem(
          "userRawId",
          JSON.stringify([...new Uint8Array(data.rawId)])
        );
        setMessage("Registered successfully");
      } else {
        setMessage("Registration failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("Registration error");
    }
  };

  const login = async () => {
    try {
      const storedRawId = localStorage.getItem("userRawId");
      if (!storedRawId) {
        setMessage("Please Register First");
        return;
      }

      const data = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          rpId: "localhost",
          allowCredentials: [
            {
              id: new Uint8Array(JSON.parse(storedRawId)).buffer,
              type: "public-key",
            },
          ],
        },
      });

      if (data) {
        localStorage.setItem("username", username);
        router.push("/profile");
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("Login error");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold mb-4">WebAuthn Auth</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <span className="text-xs italic text-gray-600 leading-none">
        Username is optional for this demo as we are not storing anything on the
        backend.
      </span>
      <button
        onClick={register}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2 mt-4"
      >
        Register New Pass Key
      </button>
      <button
        onClick={login}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Login
      </button>
      {message && (
        <p className="mt-4 text-lg text-center text-red-700 font-bold">
          {message}
        </p>
      )}
    </div>
  );
}
