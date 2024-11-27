import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDb } from "@/config/dbConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDb();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User with this email not found" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch && !user.isVerified) {
      return NextResponse.json({
        success: false,
        status: "User Not Verified",
        message: "Please check email and verify your account.",
      });
    }

    if (isMatch) {
      const tokenData = {
        id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: `${user.firstName} Log in successfullly`,
        success: true,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
