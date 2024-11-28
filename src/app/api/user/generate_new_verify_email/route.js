import { connectToDb } from "@/config/dbConfig";
import { sendMail } from "@/lib/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import * as validator from "validator";

connectToDb();

export async function POST(request) {
  try {
    const { email } = await request.json();
    console.log(email);
    if (!validator.isEmail(email)) {
      return NextResponse.json({
        success: false,
        message: "Invalid email address",
        status: 400,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User NOT Found",
        },
        { status: 404 }
      );
    }
    if (user.isVerified) {
      return NextResponse.json(
        {
          success: true,
          userId: user._id,
          message: "User Already Verified",
        },
        { status: 200 }
      );
    }

    await sendMail({
      email,
      emailType: "GENERATE_NEW_VERIFY_LINK",
      userId: user._id,
    });

    return NextResponse.json(
      {
        success: true,
        userId: user._id, 
        message: "User Found & Verification link sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing your request",
      status: 500,
      error,
    });
  }
}
