"use client";

import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginValidate from "@/lib/validations/logInValidate";
import { Button } from "@/components/ui/moving-border";

function LogInPage() {
  const [detail, setDetail] = useState("");
  const [forgot, setForgot] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handelData = async (data) => {
    console.log("Form Data: ", data);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="flex flex-col items-center justify-center lg:p-12 *:lg:flex-row min-h-screen   overflow-hidden w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative   p-10">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidate}
        onSubmit={(values, { resetForm }) => {
          const userData = {
            email: values.email,
            password: values.password,
          };
          handelData(userData);
          // resetForm();
        }}
      >
        {(formikProps) => {
          const { values, handleSubmit } = formikProps;

          return (
            <Form
              className="bg-white shadow-2xl rounded-lg p-8 w-full sm:w-[400px] max-w-md space-y-6"
              onSubmit={handleSubmit}
            >
              <h1 className="text-2xl font-semibold text-teal-600 text-center">
                Log In
              </h1>

              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-mail
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-teal-500">
                  <Field
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border-none rounded-l-md focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="px-4 py-2 bg-gray-100 rounded-r-md text-gray-600"
                  >
                    {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4 m-auto   flex justify-center">
                <Button
                  borderRadius="md"
                  duration={3000}
                  containerClassName="border-3 "
                  className="w-full bg-transparent text-teal-600 hover:bg-teal-100 p-2  font-semibold transition duration-200   border-3 border-b-red-400 text-lg "
                  type="submit"
                >
                  Submit
                </Button>
              </div>
              {/* Forgot Password Link */}
              <div>
                <p className="hover:text-red-700 text-sm text-gray-500 hover:underline mt-1 text-right">
                  <Link href={`/forgot/${values.email}`}>Forgot Password</Link>
                </p>
                <p className="text-red-700 text-sm">{detail}</p>
              </div>

              {/* Registration Link */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?
                  <Link
                    href="/signup"
                    className="text-teal-600 hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LogInPage;
