"use client";
import { useProperty } from "@/context/PropertyProvider";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

interface PropertyItem {
  image: string;
  title: string;
  price: number;
}

export default function Property() {
  const data: PropertyItem[] = useProperty();
  const setProperty = useProperty; 
  const property = data[0];
  console.log(property);

  const router = useRouter();

  return (
    <div className="hero mt-40 py-10">
      <h1 className="text-center font-bold text-3xl">Your Cart</h1>
      <div className="flex flex-col gap-5 md:flex-row lg:flex-row items-center md:items-start lg:items-start md:justify-between lg:justify-between md:mx-10 lg:mx-10">
        <section className="bg-orange-100 w-full md:w-1/2 lg:w-1/2 mt-8">
          {Array.isArray(property) &&
            property.map((item: PropertyItem, index: number) => (
              <div key={index} className="flex items-center gap-5 mx-5 my-5">
                <div>
                  <Image
                    className="cursor-pointer rounded-lg"
                    src={item.image || "/placeholder.jpg"}
                    alt="Logo"
                    width={200}
                    height={200}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xl">{item.title}</h4>
                  <h6 className="font-medium">{`$${item.price}/night`}</h6>{" "}
                </div>
                <MdDelete
                  className="text-gray-500 text-xl cursor-pointer"
                />
              </div>
            ))}
        </section>
        <section className="bg-white w-full md:w-1/2 lg:w-1/2 px-5 pb-5 mt-5 md:mt-0 lg:mt-0 flex flex-col items-center">
          <h5 className="text-xl font-bold text-center mt-5">Checkout</h5>
          <div className="mt-5 flex flex-col items-center">
            <p className="text-md font-semibold">Full Name</p>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="py-2 px-4 bg-orange-100 rounded-lg "
            />
            <p className="text-md font-semibold mt-4">Email</p>
            <input
              type="email"
              placeholder="Enter Email"
              className="py-2 px-4 bg-orange-100 rounded-lg "
            />
            <p className="text-md font-semibold mt-4">Phone</p>
            <input
              type="email"
              placeholder="Enter Phone Number"
              className="py-2 px-4 bg-orange-100 rounded-lg "
            />
            <div className="flex gap-10 mt-6">
              <p className="text-lg font-medium">Total Cost: </p>
              <p className="text-lg font-bold">0</p>
            </div>
            <button onClick={() => router.push("/")} className="bg-black text-xl text-white py-1 px-2 w-1/2 rounded-xl mt-2">
              Book Order
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
