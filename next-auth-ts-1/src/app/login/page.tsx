"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Login = () => {
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
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid! ");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid! ");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading... </h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col justify-between items-center p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
            <div className="text-red-600 text-[16px] mb-4">
              {error && error}
            </div>
          </form>
          <div className="">
            <p className="text-white text-[16px] mb-4">
              Forget password?
              <Link
                href={"/forget-password"}
                className="ml-2 text-blue-500 hover:underline"
              >
                Reset Here
              </Link>
            </p>
          </div>
          <button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => signIn("github")}
          >
            Sign In with Github
          </button>
          <div className="text-center text-gray-500 mt-4">-- OR --</div>
          <Link
            className="block text-xl text-center text-blue-500 hover:underline mt-2"
            href={"/register"}
          >
            {" "}
            Register Here
          </Link>
        </div>
      </div>
    )
  );
};

export default Login;
