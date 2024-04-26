"use client";
import * as React from "react";
import { ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import data from "../../data.json";
import Image from "next/image";

export default function Explore() {
  const [minPrice, setMinPrice] = React.useState<number | undefined>();
  const [maxPrice, setMaxPrice] = React.useState<number | undefined>();
  const [location, setLocation] = React.useState("");
  const [bedrooms, setBedrooms] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const [name, setName] = React.useState("");
  const [filteredProperties, setFilteredProperties] = React.useState<Property[]>([]);

  const router = useRouter();

  const resData = data;

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    const name = res.data.data.name;
    setName(name);
  };

  const price = minPrice && maxPrice;

  interface Property {
    title: string;
    image: string;
    description: string;
    price: number;
    location: string;
    bedrooms: string;
  }

  React.useEffect(() => {
    const filtered = resData.properties.filter(
      (property: Property) =>
        property.title.toLowerCase().includes(searchInput.toLowerCase()) &&
        (location ? property.location === location : true) &&
        (bedrooms ? property.bedrooms === bedrooms : true) &&
        (price
          ? minPrice && maxPrice
            ? property.price >= minPrice && property.price <= maxPrice
            : property.price === price
          : true)
    );
    getUserDetails();
    setFilteredProperties(filtered);
  }, [searchInput, location, bedrooms, minPrice, maxPrice, price, resData.properties]);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("User logged out successfully");
      window.location.href = "/";
    } catch (error: any) {
      toast.error("Something went wrong while signing out!");
    }
  };

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleChangePrice = (event: ChangeEvent<HTMLSelectElement>) => {
    const [min, max] = event.target.value.split(" - ").map(price => parseInt(price, 10));
    setMinPrice(min);
    setMaxPrice(max);
  };  

  const handleChangeLocation = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };

  const handleChangeBedrooms = (event: ChangeEvent<HTMLSelectElement>) => {
    setBedrooms(event.target.value);
  };

  return (
    <>
      <Toaster position="top-center" />
      <header>
        <nav className="flex justify-between items-center py-4 px-8">
          <Image
            className="cursor-pointer"
            src="/logo.png"
            alt="Logo"
            width={35}
            height={35}
            priority
            onClick={() => router.push("/")}
          />
          <ul className="flex space-x-12">
            <li>
              <p
                onClick={() => router.push("/")}
                className="hover:text-gray-500 font-bold cursor-pointer"
              >
                Home
              </p>
            </li>
            <li>
              <p className="hover:text-gray-500 font-bold cursor-pointer">
                About
              </p>
            </li>
            <li>
              <p className="hover:text-gray-500 font-bold cursor-pointer">
                Contact
              </p>
            </li>
          </ul>
          <button
            onClick={logout}
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </nav>
      </header>
      <div className="hero h-full pt-12 pb-5">
        <div className="flex flex-col items-center mb-1">
          <h1 className="text-2xl font-bold">Welcome {name}</h1>
        </div>
        <div className="mx-20">
          <h1 className="text-4xl font-bold">Find Property</h1>
          <div className="flex flex-col md:flex-row lg:flex-row items-center mt-4 gap-3">
            <input
              type="text"
              placeholder="Search for property"
              className="w-full md:w-1/3 lg:w-1/3 rounded-lg p-2 outline-none border-2"
              value={searchInput}
              onChange={handleChangeSearchInput}
            />
            <select
              className="cursor-pointer w-52 rounded-lg p-2 outline-none border-2"
              name="priceRange"
              id="priceRange"
              value={`${minPrice} - ${maxPrice}`}
              onChange={handleChangePrice}
            >
              <option value="">Price Range</option>
              <option value={`${200} - ${300}`}>$200 - $300</option>
              <option value={`${300} - ${400}`}>$300 - $400</option>
              <option value={`${400} - ${600}`}>$400 - $600</option>
            </select>
            <select
              className="cursor-pointer w-52 rounded-lg p-2 outline-none border-2"
              name="location"
              id="location"
              value={location}
              onChange={handleChangeLocation}
            >
              <option value="">Select Location</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Delhi">Delhi</option>
              <option value="Jaipur">Jaipur</option>
            </select>
            <select
              className="cursor-pointer w-52 rounded-lg p-2 outline-none border-2"
              name="bedrooms"
              id="bedrooms"
              value={bedrooms}
              onChange={handleChangeBedrooms}
            >
              <option value="">Bedrooms</option>
              <option value="Bed 2">2 Bed</option>
              <option value="Bed 3">3 Bed</option>
              <option value="Bed 4">4 Bed</option>
            </select>
          </div>
          <div>
            <h2 className="text-2xl font-bold mt-8">Featured Properties</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
              {filteredProperties.map((property: any, index) => (
                <div
                  key={index}
                  className="property-card bg-white rounded-lg p-4"
                >
                  <Image
                    className="cursor-pointer"
                    src={property.image}
                    alt="property-image"
                    width={500}
                    height={100}
                  />
                  <h3 className="text-xl font-bold mt-2">{property.title}</h3>
                  <p className="text-md text-gray-500">
                    {property.description}
                  </p>
                  <p className="text-md font-semibold text-gray-800">
                    {property.location}
                  </p>
                  <p className="text-md font-semibold text-gray-800">
                    {property.bedrooms}
                  </p>
                  <p className="text-lg font-semibold text-gray-500">
                    {`$${property.price}/night`}
                  </p>
                  <Link
                    href={{
                      pathname: "/property",
                      query: {
                        image: property.image,
                        title: property.title,
                        description: property.description,
                        location: property.location,
                        price: property.price,
                      },
                    }}
                  >
                    <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-6 rounded mt-1">
                      Book Now!
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .property-card {
          transition: transform 0.3s;
        }
        .property-card:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
