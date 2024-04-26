"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import SignUpModal from "../(components)/signup";
import Image from "next/image";

const Hero = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const router = useRouter();
  return (
    <>
      <div className="hero flex justify-center items-center gap-40 h-[90vh]">
        <section>
          <h1 className="text-3xl lg:text-5xl font-bold">Find a perfect place to stay</h1>
          <p className="text-lg lg:text-xl font-medium my-2">
            From luxurious homes to cozy cabins
          </p>
          <div className="flex gap-3 mt-5">
            <button onClick={handleOpenSignUp} className="border-2 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded">
              Sign Up
            </button>
            <button onClick={() => router.push('/explore')} className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Explore
            </button>
          </div>
        </section>
        <section className="hidden md:block lg:block">
          <Image src="/hero.png" alt="Logo" width={500} height={500} priority />
        </section>
      </div>
      <SignUpModal open={openSignUp} setOpen={setOpenSignUp} />
    </>
  );
};

export default Hero;
