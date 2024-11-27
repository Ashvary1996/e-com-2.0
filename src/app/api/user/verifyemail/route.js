import { connectToDb } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { token } = reqbody;
    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid Token",
        },
        { status: 400 }
      );
    }

    // console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    console.log("user verified");
    return NextResponse.json(
      {
        success: true,
        message: "email verified successfullly",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: error.messsage,
    });
  }
}
