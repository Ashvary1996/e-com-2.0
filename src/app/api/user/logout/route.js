import { connectToDb } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
 

connectToDb ();

export async function GET(request) {
  try {
    const response = NextResponse.json({
      message: `Logout successfullly`,
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: error.messsage,
    });
  }
}
