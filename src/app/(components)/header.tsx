"use client";
import React, { useState } from "react";
import SignInModal from "../(components)/signin";
import Image from "next/image";

const Header = () => {
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpenSignIn = () => setOpenSignIn(true);
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
          <ul className="flex space-x-12">
            <li>
              <a className="hover:text-gray-500 font-bold" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500 font-bold" href="/about">
                About
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500 font-bold" href="/contact">
                Contact
              </a>
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
