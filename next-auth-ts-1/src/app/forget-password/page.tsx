"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ForgetPassword = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus == "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid! ");
      return;
    }
    try {
      const res = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status == 400) {
        setError("User with this email is not registered!");
      }
      if (res.status == 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading... </h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col justify-between items-center p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">
            Forget Password
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="w-full border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <div className="text-red-600 text-[16px] mb-4">
              {error && error}
            </div>
          </form>
          <div className="text-center text-gray-500 mt-4">-- OR --</div>

          <Link
            className="block text-xl text-center text-blue-500 hover:underline mt-2"
            href={"/login"}
          >
            {" "}
            Login Here
          </Link>
        </div>
      </div>
    )
  );
};

export default ForgetPassword;
