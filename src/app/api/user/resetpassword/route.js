import { connectToDb } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/lib/mailer";

connectToDb();

export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { token, newPassword, confirmPassword } = reqbody;

   
    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }
    if (!newPassword) {
      return NextResponse.json(
        { message: "New Password is required" },
        { status: 400 }
      );
    }
    if (!confirmPassword) {
      return NextResponse.json(
        { message: "Confirm Password is required" },
        { status: 400 }
      );
    }

     
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUND)
    );
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();
    await sendMail({
      email: user.email,
      emailType: "PASSWORD_RESETED",
      userId: user._id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
  
    return NextResponse.json({
      status: 500,
      error: error.message,
    });
  }
}
