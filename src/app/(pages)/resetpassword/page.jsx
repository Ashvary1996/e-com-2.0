"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or expired token.");
      // router.push("/");
    }
  }, [token, router]);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.warn("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/user/resetpassword", {
        token,
        newPassword,
        confirmPassword,
      });

      if (response.data.success) {
        toast.success("Password updated successfully.");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2]    ">
      <ToastContainer pauseOnFocusLoss={false} closeOnClick={true} />
      <div className="bg-white border-4 shadow-lg rounded-lg p-8 max-w-md w-full opacity-95 ">
        <h1 className="text-3xl font-bold mb-4 text-center">Reset Password</h1>
        <p className="text-gray-600 mb-6 text-center">
          Please enter your new password and confirm it.
        </p>

        <div className="relative mb-4">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:border-orange-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:orange-teal-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FaEyeSlash size={20} />
            ) : (
              <FaEye size={20} />
            )}
          </span>
        </div>

        <button
          onClick={handlePasswordReset}
          className={`w-full mt-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }${
            !newPassword || !confirmPassword
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={loading || newPassword === "" || confirmPassword === ""}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
