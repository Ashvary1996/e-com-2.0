"use client";

import signUpValidate from "@/lib/validations/signUpValidate";
import { Form, Field, Formik, ErrorMessage } from "formik";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignInPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    checkbox: false,
  };

  const handelData = async (data) => {
    console.log("Form_Data : ", data);
  };

  return (
    <div className=" lg:flex-row min-h-screen flex-col overflow-hidden w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex ">
      <div className="lg:w-1/3 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome Back!</h1>
        <p className="text-lg font-light">
          Join us today and unlock exclusive features.
        </p>
      </div>

      <div className="w-full lg:w-2/3 flex justify-center items-center p-4  ">
        <Formik
          initialValues={initialValues}
          validationSchema={signUpValidate}
          onSubmit={(values, { resetForm }) => {
            
            const userData = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
              phoneNumber: values.phoneNumber,
            };
            handelData(userData);
             // resetForm(); // Optionally reset form after submission
          }}
        >
          {({ values }) => (
            <Form className="bg-gray-200  text-gray-700 rounded-lg shadow-lg w-full max-w-lg p-8">
              <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Create A New Account
              </h1>
              {/* will add avatar implementation */}

              <div className="flex gap-5 justify-around">
                <div className="mb-4">
                  <label htmlFor="firstName" className="block font-medium">
                    First Name
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-2 border rounded-md   focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="lastName" className="block font-medium">
                    Last Name
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block font-medium">
                  Phone Number
                </label>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Mobile Number"
                  maxLength="10"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-teal-500">
                  <Field
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-2 border-none rounded-l-md focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="px-4 py-3 bg-white rounded-r-md text-gray-600"
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

              <div className="mb-4 flex items-center">
                <Field
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  className="mr-2"
                />
                <label htmlFor="checkbox" className="text-sm">
                  I agree to the terms and conditions.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Sign Up
              </button>

              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-teal-500 hover:underline transform hover:scale-125 transition-transform duration-100 p-1 ease-in-out"
                  >
                  Log In
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
