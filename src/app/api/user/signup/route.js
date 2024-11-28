import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDb } from "@/config/dbConfig";
import bcrypt from "bcryptjs";
import { sendMail } from "@/lib/mailer";

connectToDb();

export async function POST(req) {
  try {
    const { firstName, lastName, email, phoneNumber, password } =
      await req.json();

    const existingUserByEmail = await User.findOne({ email });

    // const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    // const expiryDate = new Date(Date.now() + 3600000); // 1-hour expiry

    if (existingUserByEmail) {
      return NextResponse.json(
        { success: false, message: "User already registered with this email" },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUND)
      );
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        password: hashedPassword,
        isVerified: false,
      });

      await newUser.save();

      await sendMail({ email, emailType: "VERIFY", userId: newUser._id });

      return NextResponse.json(
        {
          success: true,
          message: "User registered successfully",
          // user: newUser,
          // verifyCode,
          // expiryDate,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error in POST API:", error);
    return NextResponse.json(
      { status: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
