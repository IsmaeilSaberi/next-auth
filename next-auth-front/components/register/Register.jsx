"use client";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { LuAtSign } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { useState, useRef } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

const Register = () => {
  const [passDisplay, setpassDisplay] = useState(-1);
  const [repassDisplay, setrepassDisplay] = useState(-1);

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const signIner = async () => {
    await signIn("credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      callbackUrl: "/account",
    });
  };

  const userCreator = (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post(`/api/user/create-user`, formData)
      .then((data) => {
        console.log(data.data);
        signIner();
      })
      .catch((err) => console.log(err.response.data));
  };

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
            <h1 className="text-center font-bold mb-4">REGISTER</h1>
            <form onSubmit={userCreator} className="flex flex-col gap-4">
              <div className="p-2 bg-[#e8f0fe] flex justify-between rounded-md border-2 border-blue-300 focus:border-blue-600">
                <input
                  className="outline-none bg-[#e8f0fe]"
                  type="email"
                  ref={emailRef}
                  placeholder="Email"
                ></input>
                <LuAtSign className="text-lg text-gray-400" />
              </div>
              <div className="p-2 bg-[#e8f0fe] flex justify-between rounded-md border-2 border-blue-300 focus:border-blue-600">
                <input
                  className="outline-none bg-[#e8f0fe]"
                  type="text"
                  ref={usernameRef}
                  placeholder="Username"
                ></input>
                <CiUser className="text-lg text-gray-400" />
              </div>
              <div className="p-2 bg-[#e8f0fe] flex justify-between rounded-md border-2 border-blue-300 focus:border-blue-600">
                <input
                  className="outline-none bg-[#e8f0fe]"
                  type={passDisplay == -1 ? "password" : "text"}
                  placeholder="Password"
                  ref={passwordRef}
                ></input>
                <IoEyeOutline
                  onClick={() => setpassDisplay(passDisplay * -1)}
                  className="text-lg cursor-pointer text-gray-400"
                />
              </div>
              <div className="p-2 bg-[#e8f0fe] flex justify-between rounded-md border-2 border-blue-300 focus:border-blue-600">
                <input
                  className="outline-none bg-[#e8f0fe]"
                  type={repassDisplay == -1 ? "password" : "text"}
                  placeholder="RePassword"
                ></input>
                <IoEyeOutline
                  onClick={() => setrepassDisplay(repassDisplay * -1)}
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
