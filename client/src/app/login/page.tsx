"use client";
import React, { useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";

// Define an interface for the expected API response
interface AuthResponse {
  token: string;
}

   function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      // Note: `process.env.NEXT_PUBLIC_API_URL` will need to be configured for this to work.
      const res = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials front end");
      }
      
      const data: AuthResponse = await res.json();
      
      // Set cookie with proper attributes for middleware access
      const isSecure = window.location.protocol === 'https:';
      document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=lax${isSecure ? '; secure' : ''}`;
      
      setSuccessMessage("Login successful!");
      
      // Small delay to ensure cookie is set before navigation
      setTimeout(() => {
        router.push("/admin");
      }, 100);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-500">Sign in to your account.</p>
        </div>

        {/* Message Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
              loading
                ? "bg-purple-600 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-600 active:bg-purple-700"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white inline-block mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <h3>
          <Link
            href={"/"}
            className="inline-flex items-center gap-1 font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-200 mt-4"
          >
            Return to Home <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link></h3>
      </div>
    </div>
  );
};

export default Login;
