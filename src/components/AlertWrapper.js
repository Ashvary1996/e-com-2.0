"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AlertWrapper({ children }) {
  return (
    <>
      <ToastContainer />
      {children} 
    </>
  );
}

export default AlertWrapper;
