import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between items-center p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
        <form>
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
            Register
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">-- OR --</div>
        <Link
          className="block text-xl text-center text-blue-500 hover:underline mt-2"
          href={"/login"}
        >
          {" "}
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;
