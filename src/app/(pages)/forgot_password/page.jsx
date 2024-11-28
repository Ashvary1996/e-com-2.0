"use client";
import React, { useState  } from "react";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";

function Forgotpass() {
  const [emailSent, setEmailSent] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const sendMail = async () => {
    setLoading(true);
    if (!emailRegex.test(email)) {
      toast.warn("Enter a valid email address.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/user/getResetPasswordLink", {
        email,
      });

      if (response.data.success === true) {
        setMessage(response.data.message);
        setEmailSent(true);
        toast.info(response.data.message);
      } else {
        toast.error(response.data.message);
        setMessage(response.data.message);
        setEmailSent(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in sending data", error);
    }
    setLoading(false);
  };

  return (
    <div className=" flex items-center justify-center min-h-screen  dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative  ">
      <ToastContainer pauseOnFocusLoss={false} closeOnClick={true} />
      <div className="bg-white border-2 shadow-lg rounded-lg p-8 max-w-md w-full opacity-95">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Forgot Password
          <br />
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please enter your email to get reset password link.
        </p>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 mb-4 text-gray-800 border rounded-lg focus:outline-none focus:border-orange-500 text-center"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
        />
        <p
          className={`${
            emailSent ? "text-green-600" : "text-red-500"
          } text-sm mb-6 text-center`}
        >
          {message}
        </p>
        <div className="text-center"> 
        {emailSent && (

          <a
            className="text-orange-600 font-medium  "
            href={"https://mail.google.com/mail/u/0/#inbox"}
            target="_blank"
            rel="noreferrer"
          >
            Go to Mail
          </a>
        )}
        </div>

        <button
          onClick={sendMail}
          className={`w-full mt-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading || email === ""}
          style={{
            cursor: loading || email === "" ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </div>
    </div>
  );
}

export default Forgotpass;
