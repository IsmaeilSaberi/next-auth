import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const users = (await User.find()).reverse();
    return NextResponse.json({ data: users, message: "ok" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: null, message: "error" }, { status: 400 });
  }
}
