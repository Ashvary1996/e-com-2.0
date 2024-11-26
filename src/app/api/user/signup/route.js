import { connectToDb } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connectToDb();

export async function GET() {
  try {
    console.log("server is up ");

    return NextResponse.json({
      success: true,
      message: "server is up",
    });
  } catch (error) {
    console.log(error);
  }
}
