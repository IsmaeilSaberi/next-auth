"use client";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { useState, useRef } from "react";

const Register = () => {
  const [passDisplay, setpassDisplay] = useState(-1);
  return (
    <section className="mt-2">
      <div className="container h-full px-6 py-10">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="flex items-center justify-center mb-12 md:mb-5 md:w-8/12 lg:w-6/12">
            <Image
              src="/images/register.png"
              width={400}
              height={400}
              className=""
              alt="image"
            />
          </div>
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form className="flex flex-col gap-4">
              <div className="p-2 bg-[#e8f0fe] flex rounded-md border-2 border-blue-300 focus:border-blue-600">
                <input
                  className="outline-none bg-[#e8f0fe]"
                  type="email"
                  placeholder="email"
                ></input>
              </div>
              <div className="p-2 bg-[#e8f0fe] flex justify-between rounded-md border-2 border-blue-300 focus:border-blue-600">
                <input
                  className="outline-none bg-[#e8f0fe]"
                  type={passDisplay == -1 ? "password" : "text"}
                  placeholder="Password"
                ></input>
                <IoEyeOutline
                  onClick={() => setpassDisplay(passDisplay * -1)}
                  className="text-lg cursor-pointer text-gray-400"
                />
              </div>

              <div className="mb-6 flex gap-2 flex-col md:flex-row items-center justify-between">
                <div className="flex gap-1 justify-center items-center">
                  <input
                    className="text-2xl size-4 relative"
                    type="checkbox"
                    value=""
                    id="exampleCheck3"
                    defaultChecked
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck3"
                  >
                    Remember me
                  </label>
                </div>
                <Link href="#!" className="text-blue-800 underline">
                  Terms and conditions
                </Link>
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="bg-blue-600 w-full p-2 rounded text-white transition-all duration-200 hover:bg-blue-700 "
                >
                  Sign up
                </button>
              </div>

              <div className="my-1 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>
              <button className="flex gap-2 justify-center items-center bg-white text-center border-2 border-gray-500 w-full p-2 rounded text-black transition-all duration-200 hover:bg-gray-300 ">
                <FcGoogle className="text-2xl" />{" "}
                <span>Continue with Google</span>
              </button>
              <button className="flex gap-2 justify-center items-center bg-gray-500 text-center w-full p-2 rounded text-white transition-all duration-200 hover:bg-gray-800 ">
                <FaGithub className="text-2xl" />{" "}
                <span>Continue with Github</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
