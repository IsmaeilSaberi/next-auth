import User from "@/models/User";
import connect from "@/utils/db";
import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (request: any) => {
  const { email } = await request.json();
  await connect();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return new NextResponse("Email doesn't exist!", { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpires = Date.now() + 360000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;
  //SENDING SECURITY EMAIL TO USER ACCOUNT
  const MAIL_HOST = process.env.MAIL_HOST;
  const MAIL_PORT = process.env.MAIL_PORT;
  const MAIL_USER = process.env.MAIL_USER;
  const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
  const MAIL_MAIN_ADDRESS = process.env.MAIL_MAIN_ADDRESS;

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    tls: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  });
  transporter
    .sendMail({
      from: MAIL_MAIN_ADDRESS,
      to: email,
      subject: "Changing password by clicking on the following url!",
      html: `<html><head><style>strong{color: rgb(0, 81, 255);}h1{font-size: large;}</style></head><body><h1>Changing your password</h1><div>Link :<strong>${resetUrl}</strong></div></body></html>`,
    })
    .then(() => {
      return new NextResponse("Reset password email is sent.", { status: 200 });
    })
    .catch(async (error: any) => {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      return new NextResponse("Failed sending email, Try again!", {
        status: 400,
      });
    });

  try {
    await existingUser.save();

    return new NextResponse("Email is sent for resetting password!", {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 200 });
  }
};
