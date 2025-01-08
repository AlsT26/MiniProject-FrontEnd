"use client";

<<<<<<< HEAD
import { useState } from "react";
import Card from "@/components/eventCard";
import Wrapper from "@/components/cardWrapper";

const dataEvents = [
  {
    title: "Event 1",
    thumbnail: "https://via.placeholder.com/300",
    promotor: {
      name: "Promotor A",
      avatar: "https://via.placeholder.com/100",
    },
    slug: "event-1",
    category: "Music",
    location: "New York",
    dateTime: "2025-01-10T20:00:00",
  },
  {
    title: "Event 2",
    thumbnail: "https://via.placeholder.com/300",
    promotor: {
      name: "Promotor B",
      avatar: "https://via.placeholder.com/100",
    },
    slug: "event-2",
    category: "Art",
    location: "Los Angeles",
    dateTime: "2025-01-15T18:00:00",
  },
  {
    title: "Event 3",
    thumbnail: "https://via.placeholder.com/300",
    promotor: {
      name: "Promotor C",
      avatar: "https://via.placeholder.com/100",
    },
    slug: "event-3",
    category: "Tech",
    location: "San Francisco",
    dateTime: "2025-01-20T14:00:00",
  },
];

=======
import EventWrapper from "@/components/Event_Wrapper";
>>>>>>> f5f468f6ec6e249b185a5484b96a272326d059eb
export default function Home() {
  const [priceRange, setPriceRange] = useState(500); // Price range state

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(event.target.value));
  };

  return (
    <div className="pt-[7rem] h-[100vh] bg-slate-100">
      <div className="flex w-screen h-full">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white shadow-lg p-4">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Price Range</label>
            <input
              type="range"
              className="w-full"
              min="0"
              max="1000"
              step="10"
              value={priceRange}
              onChange={handleRangeChange}
            />
            <div className="text-gray-600 mt-2">
              Selected Range: <span className="font-bold">${priceRange}</span>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Right Main Content */}
        <div className="w-3/4 bg-slate-50 p-6">
          <h2 className="text-2xl font-bold mb-6">Events</h2>
          <div className="grid grid-cols-3 gap-6">
            <Wrapper/>
=======

        <div className="w-3/4 bg-slate-50 p-6">
          <h2 className="text-2xl font-bold mb-6">Events</h2>
          <div className="">
            <EventWrapper />

>>>>>>> f5f468f6ec6e249b185a5484b96a272326d059eb
          </div>
        </div>
      </div>
    </div>
  );
}
