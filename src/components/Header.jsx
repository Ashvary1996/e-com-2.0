"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [user, setUser] = useState(null);
  console.log("user", user);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.post("api/user/me");
        // console.log("response", response);
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <header className="p-2 bg-slate-200 flex flex-wrap items-center sticky top-0 z-50 shadow-md  justify-between w-full ">
      {/* Logo */}
      <div className=" flex items-center justify-start ">
        <Link href="/">
          <img
            className="rounded-full w-12 h-12 sm:w-16 sm:h-16"
            src="https://www.shutterstock.com/image-vector/electronic-commerce-logo-template-260nw-611143775.jpg"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="  order-last w-full mt-1 sm:mt-0 sm:order-none sm:w-auto sm:flex-1  sm:mx-4   ">
        <div className="relative flex items-center  sm:mx-auto sm:max-w-md ">
          <input
            className="w-full h-10 px-4 rounded-l-lg border border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search for Products/Brands"
            autoComplete="on"
          />
          <button className="h-10 px-4 bg-orange-400 text-white rounded-r-lg hover:bg-orange-500">
            Search
          </button>
        </div>
      </div>

      {/* User & Cart */}
      <div className="  flex items-center justify-end w-fit   space-x-4 ">
     
        {user && (
          <Link
            href="/"
            className="relative p-2 bg-white  rounded-full hover:bg-gray-100"
          >
            🛒
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`p-2 text-lg font-medium rounded-lg ${
                user
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {user ? user.firstName : "Guest"}
            </Button>
          </DropdownMenuTrigger>
          {/*  */}

          {!user ? (
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/login">Log-In</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Cart</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Orders</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Track Current Orders</DropdownMenuItem>
                      <DropdownMenuItem>All Orders</DropdownMenuItem>
                      {/* <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem> */}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>GitHub</DropdownMenuItem> */}
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </header>
  );
};
