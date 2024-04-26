"use client";
import { useSearchParams } from "next/navigation";
import { useProperty } from "@/context/propertyProvider";
import toast, { Toaster } from "react-hot-toast";
import Header from "../(components)/header";

export default function Property() {
  const searchParams = useSearchParams();
  const image = searchParams.get("image");
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const location = searchParams.get("location");
  const price = searchParams.get("price");

  const property = useProperty();

  const handleCart = () => {
    property[1]((prevProperty: Array<object>) => ([...prevProperty, { image, title, description, location, price }]));
    toast.success("Added to cart");
  }
  
  return (
    <>
    <Toaster position="top-center"/>
    <Header />
      <div className="flex flex-col mt-20 items-center">
        <div>
          <img
            className="w-96 h-80 object-cover rounded-xl mb-5"
            src={image ?? ""}
            alt="image"
          />
        </div>
        <div className="w-full md:w-1/2 lg-w-1/2 mt-4 md:mt-0 lg:mt-0">
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="text-md font-light my-2">{description}</p>
          <p className="text-md font-light my-2">{location}</p>
          <p className="text-md font-bold my-2">{price}</p>
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <button onClick={handleCart} className="mt-2 w-1/2 font-semibold rounded-2xl px-3 py-2 text-lg text-white bg-black hover:bg-gray-600">
          Add to cart
        </button>
      </div>
    </>
  );
}
