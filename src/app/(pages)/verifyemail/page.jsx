"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/verifyemail", { token });
      setVerified(true);
      setError(false);
      alert("Email verified successfully!");
    } catch (error) {
      setError(true);
      console.error("Verification Error:", error);
      alert("Verification failed. Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    console.log("tokennnnnnnn", token);

    if (token) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Email-Verification
        </h1>

        <p className="text-gray-700 mb-4  break-all ">{token}</p>

        {loading && (
          <p className="text-center text-gray-500 mb-6">
            Verifying your email...
          </p>
        )}

        {verified ? (
          <div className="text-center">
            <h2 className="text-lg font-medium text-green-600 mb-3">
              Email Verified Successfully!
            </h2>
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Go to Login
            </Link>
          </div>
        ) : error ? (
          <div className="text-center">
            <h2 className="text-lg font-medium text-red-600 mb-3">
              Verification Failed
            </h2>
            <p className="text-sm text-gray-600">Invalid or expired token.</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Awaiting verification...</p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
