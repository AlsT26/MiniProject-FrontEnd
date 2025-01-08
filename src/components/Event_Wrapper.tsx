"use client";

import { ShowEvents } from "@/app/libs/event";
import { IEvent } from "@/types/event";
import { useEffect, useState } from "react";
import Card from "./eventCard";

export default function EventWrapper() {
  const [dataEvents, setDataEvents] = useState<IEvent[] | null>(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state for better UX

  const fetchEvents = async () => {
    try {
      const events = await ShowEvents();
      setDataEvents(events); // Set fetched events into state
      console.log("data events", events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (!dataEvents || dataEvents.length === 0) {
    return (
      <div className="text-center my-10">
        No events available at the moment.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-[1rem] justify-left my-12 px-4">
      {dataEvents.map((event, idx) => (
        <Card
          key={idx}
          title={event.title}
          thumbnail={event.thumbnail}
          avatar={
            event.promotor.avatar ||
            "https://res.cloudinary.com/dn6uglajh/image/upload/v1733990935/blank-image_yfczs3.jpg"
          }
          promotor={event.promotor.name}
          slug={event.slug}
          category={event.category}
          location={event.location}
          dateTime={event.dateTime}
        />
      ))}
    </div>
  );
}
