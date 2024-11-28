import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDb } from "@/config/dbConfig";

import { sendMail } from "@/lib/mailer";

connectToDb();

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User with this email not found" },
        { status: 404 }
      );
    }

    await sendMail({
      email,
      emailType: "RESET_LINK",
      userId: user._id,
    });

    return NextResponse.json(
      {
        success: true,
        userId: user._id,
        message: "RESET link sent successfully",
      },
      { status: 200 }
    );
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
// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { success: false, message: "Email is required" },
//         { status: 400 }
//       );
//     }
//     if (!password) {
//       return NextResponse.json(
//         { success: false, message: "Password is required" },
//         { status: 400 }
//       );
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User with this email not found" },
//         { status: 404 }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch && !user.isVerified) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please verify your email before logging in.",

//         },
//         { status: 403 }
//       );
//     }

//     if (isMatch) {
//       const tokenData = {
//         id: user._id,
//         email: user.email,
//       };

//       const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
//         expiresIn: "1d",
//       });

//       const response = NextResponse.json({
//         success: true,
//         message: `${user.firstName} Log in successfullly`,
//       });

//       response.cookies.set("token", token, {
//         httpOnly: true,
//       });

//       return response;
//     } else {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Incorrect password",
//         },
//         { status: 401 }
//       );
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal Server Error",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
