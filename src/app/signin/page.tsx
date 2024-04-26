"use client";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "../(components)/header";

const SigninPage = () => {
  const router = useRouter();

  const [loginUser, setLoginUser] = React.useState({
    username: "",
    password: "",
  });

  const signin = async () => {
    try {
      toast.loading("Loading...");
      const res = await axios.post("/api/users/signin", loginUser);
      toast.dismiss();
      toast.success("User logged in successfully");
      router.push("/explore");
    } catch (error) {
      toast.dismiss();
      toast.error("Invalid Credentials!");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginUser({
      ...loginUser,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <Header />
      <div className="flex flex-col items-center mt-20">
        <div className="border-2 flex flex-col items-center justify-center p-8 rounded-xl">
          <h3 className="font-bold text-2xl">Sign In</h3>
          <input
            type="text"
            placeholder="Username"
            className="border-2 rounded-lg p-3 my-2"
            onChange={handleChange}
            value={loginUser.username}
            name="username"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-lg p-3 my-2"
            onChange={handleChange}
            value={loginUser.password}
            name="password"
          />
          <button
            onClick={signin}
            className="bg-black hover:bg-gray-700 text-white font-bold p-4 mt-6 rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
