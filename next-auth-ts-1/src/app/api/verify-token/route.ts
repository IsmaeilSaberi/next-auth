import User from "@/models/User";
import connect from "@/utils/db";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { token } = await request.json();
  await connect();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return new NextResponse("Invalid Token or has expired!", { status: 400 });
  }

  return new NextResponse(JSON.stringify(user), { status: 200 });
};
