"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SignInModal from "../(components)/signin";
import Image from "next/image";

const Header = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const router = useRouter();
  return (
    <>
      <header>
        <nav className="flex justify-between items-center py-4 px-8">
          <Image
            className="cursor-pointer"
            src="/logo.png"
            alt="Logo"
            width={35}
            height={35}
            priority
          />
          <ul className="hidden md:flex lg:flex space-x-12">
            <li>
              <p onClick={() => router.push('/')} className="hover:text-gray-500 font-bold cursor-pointer">Home</p>
            </li>
            <li>
              <p className="hover:text-gray-500 font-bold cursor-pointer">About</p>
            </li>
            <li>
              <p className="hover:text-gray-500 font-bold cursor-pointer">Contact</p>
            </li>
          </ul>
          <button
            onClick={handleOpenSignIn}
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        </nav>
      </header>
      <SignInModal open={openSignIn} setOpen={setOpenSignIn} />
    </>
  );
};

export default Header;
