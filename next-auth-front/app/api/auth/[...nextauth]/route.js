import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await dbConnect();

        const emailExist = await User.findOne({ email: credentials.email });
        if (!emailExist) {
          throw new Error("email not found ...");
        }

        const isPasswordTrue = await bcrypt.compare(
          credentials.password,
          emailExist.password
        );
        if (!isPasswordTrue) {
          throw new Error("password is wrong ...");
        }

        return emailExist;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
