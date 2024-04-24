"use client";
import Header from "../(components)/header";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";

export default function Explore() {
  const [price, setPrice] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [bedrooms, setBedrooms] = React.useState("");

  const handleChangePrice = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
  };

  const handleChangeLocation = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleChangeBedrooms = (event: SelectChangeEvent) => {
    setBedrooms(event.target.value as string);
  };

  return (
    <>
      <Header />
      <div className="hero h-full pt-12 pb-5">
        <div className="mx-20">
          <h1 className="text-4xl font-bold">Find Property</h1>
          <div className="flex items-center mt-4 gap-3">
            <input
              type="text"
              placeholder="Search for property"
              className="w-1/3 rounded-lg p-2 outline-none border-2"
            />
            <FormControl
              className="bg-white"
              sx={{ minWidth: 200 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Price Range</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={price}
                label="price"
                onChange={handleChangePrice}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>10000 - 15000</MenuItem>
                <MenuItem value={20}>15000 - 20000</MenuItem>
                <MenuItem value={30}>20000 - 25000</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className="bg-white"
              sx={{ minWidth: 200 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Location</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={location}
                label="location"
                onChange={handleChangeLocation}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Delhi</MenuItem>
                <MenuItem value={20}>Gurgaon</MenuItem>
                <MenuItem value={30}>Jaipur</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className="bg-white"
              sx={{ minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Bedrooms</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={bedrooms}
                label="bedrooms"
                onChange={handleChangeBedrooms}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={2}>2 Bed</MenuItem>
                <MenuItem value={3}>3 Bed</MenuItem>
                <MenuItem value={4}>4 Bed</MenuItem>
              </Select>
            </FormControl>
            <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-6 rounded ml-8">
              Search
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mt-8">Featured Properties</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="property-card bg-white rounded-lg p-4">
                <Image
                  className="cursor-pointer"
                  src="/property1.jpg"
                  alt="property1"
                  width={500}
                  height={100}
                />
                <h3 className="text-lg font-bold mt-2">Property 1</h3>
                <p className="text-md text-gray-500">Delhi</p>
                <p className="text-md text-gray-500">2 Bed</p>
                <p className="text-md text-gray-500">15000</p>
              </div>
              <div className="property-card bg-white rounded-lg p-4">
                <Image
                  className="cursor-pointer"
                  src="/property2.jpg"
                  alt="property2"
                  width={500}
                  height={100}
                />
                <h3 className="text-lg font-bold mt-2">Property 2</h3>
                <p className="text-md text-gray-500">Gurgaon</p>
                <p className="text-md text-gray-500">3 Bed</p>
                <p className="text-md text-gray-500">20000</p>
              </div>
              <div className="property-card bg-white rounded-lg p-4">
                <Image
                  className="cursor-pointer"
                  src="/property3.jpg"
                  alt="property3"
                  width={500}
                  height={100}
                />
                <h3 className="text-lg font-bold mt-2">Property 3</h3>
                <p className="text-md text-gray-500">Jaipur</p>
                <p className="text-md text-gray-500">4 Bed</p>
                <p className="text-md text-gray-500">25000</p>
              </div>
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

