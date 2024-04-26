import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, password } = reqBody;

    //check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //token token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      message: "User logged in successfully",
      success: true,
    });
    res.cookies.set("token", token, {
      httpOnly: true,
    });
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
