"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { IEvent } from "@/types/event";
import { getEvent } from "@/app/libs/event";

export default function Carousel() {
  const [dataEvents, setDataEvents] = useState<IEvent[] | null>(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state for better UX

  const fetchEvents = async () => {
    try {
      const events = await getEvent();
      setDataEvents(events); // Set fetched events into state
      console.log("data events", dataEvents);
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
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoHeight={true}
        slidesPerView={1}
        // spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="Swiper rounded-2xl"
      >
        {dataEvents?.map((event, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-[13rem] rounded-2xl overflow-hidden md:h-[20rem]">
                {/* <img src={event.thumbnail} alt={event.title} h-48 w-96 /> */}
                <Image src={event.thumbnail} alt={event.title} fill priority />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
