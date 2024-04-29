"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProperty } from "@/context/PropertyProvider";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

export default function Property() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyContent />
    </Suspense>
  );
}

function PropertyContent() {
  const searchParams = useSearchParams();
  const image = searchParams.get("image");
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const location = searchParams.get("location");
  const price = parseInt(searchParams.get("price") || "0", 10);

  const property = useProperty();
  const router = useRouter();

  const [count, setCount] = useState(1);

  const updatedPrice = price * count;

  const handleCart = () => {
    property[1]((prevProperty: Array<object>) => [
      ...prevProperty,
      { image, title, description, location, updatedPrice },
    ]);
    toast.success("Added to cart");
    router.push("/cart");
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col mt-20 items-center mx-10 ">
        <div>
          <Image
            className="w-96 h-80 object-cover rounded-xl mb-5"
            src={image ?? ""}
            alt="image"
            width={400}
            height={300}
          />
        </div>
        <div className="w-full md:w-1/2 lg-w-1/2 mt-4 md:mt-0 lg:mt-0">
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="text-md font-light my-2">{description}</p>
          <p className="text-md font-light my-2">{location}</p>
          <p className="text-md font-bold my-2">{`$${updatedPrice}/night`}</p>
          <div className="flex items-center gap-2">
            <p className="text-md font-semibold">Quantity</p>
            <button
              onClick={() => setCount(count - 1)}
              className="bg-gray-200 text-lg font-semibold px-2 py-1 rounded-lg"
            >
              -
            </button>
            <p className="text-md font-semibold">{count}</p>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-gray-200 text-lg font-semibold px-2 py-1 rounded-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-5 mb-10">
        <button
          onClick={handleCart}
          className="mt-2 w-1/2 font-semibold rounded-2xl px-3 py-2 text-lg text-white bg-black hover:bg-gray-600"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
