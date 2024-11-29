"use client";

import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const verifyUserEmail = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/verifyemail", { token });
      setVerified(true);
      toast.success("Email verified successfully!");
    } catch (error) {
      setError(true);
      console.error("Verification Error:", error);
      toast.error(error?.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  }, [token]); // Memoize the function based on token

  const sendVerification = async () => {
    if (!emailRegex.test(email)) {
      toast.warn("Enter a valid email address.");
      return;
    }
    setSending(true);
    try {
      const response = await axios.post("/api/user/generate_new_verify_email", {
        email,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send email.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) verifyUserEmail();
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Email Verification
        </h1>
        <ToastContainer />

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
            <Accordion className="w-fit m-auto" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-orange-600 font-medium hover:underline  ">
                  Request a new verification link
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 mt-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter registered email"
                      className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 w-full"
                    />
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition"
                      onClick={sendVerification}
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Send Verification Link"}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ) : (
          <p className="text-center text-gray-500">Awaiting verification...</p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
