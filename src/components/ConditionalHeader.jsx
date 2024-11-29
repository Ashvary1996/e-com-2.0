"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const shouldShowHeader = ![
    "/login",
    "/signup",
    "/forgot_password",
    "/resetpassword",
    "/verifyemail",
  ].includes(pathname);

  return shouldShowHeader ? <Header /> : null;
}
