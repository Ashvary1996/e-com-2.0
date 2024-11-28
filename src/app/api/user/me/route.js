import { connectToDb } from "@/config/dbConfig";
import { getDataFromToken } from "@/lib/getDataFormToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export async function POST(request) {
  try {
    const userId = await getDataFromToken(request);
    // const user = await User.findOne({ _id: userId }).select("-password");
    const user = await User.findOne({ _id: userId });

    console.log(userId, user);

    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
