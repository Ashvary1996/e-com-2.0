import { connectToDb } from "@/config/dbConfig";
import { getDataFromToken } from "@/lib/getDataFormToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export async function POST(request) {
  try {
    const userId = await getDataFromToken(request);
    // const user = await User.findOne({ _id: userId }).select("-password");
    // const user = await User.findOne({ _id: userId });
    const user = await User.findOne(
      { _id: userId },
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
        role: 1,
        _id: 1,
      }
    );

    console.log(userId, user);

    return NextResponse.json({
      message: "User Found",
      user: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
