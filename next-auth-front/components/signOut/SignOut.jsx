"use client";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="p-2 rounded-md bg-rose-600 text-white hover:bg-rose-700"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
