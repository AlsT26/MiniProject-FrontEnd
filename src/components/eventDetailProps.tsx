"use client";

import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { PiTextAlignLeftBold } from "react-icons/pi";
import { LuTicketCheck } from "react-icons/lu";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import EventDescription from "./eventDescription";
import EventTickets from "./eventTicket";
import { formatDateTime } from "@/helpers/formatDateTime";
import { handleOrderSubmit } from "@/app/libs/order";

interface Ticket {
  id: number;
  title: string;
  price: number;
  desc: string;
  available: number;
  totalSeats: number;
}

interface EventDetailsProps {
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  dateTime: string;
  location: string;
  promotor: string;
  tickets: Ticket[];
}

const EventDetails: React.FC<EventDetailsProps> = ({ title, description, thumbnail, category, dateTime, location, promotor, tickets }) => {
  const [view, setView] = useState<"description" | "tickets" | "orderSummary">("description");
  const [orderDetails, setOrderDetails] = useState<null>(null);
  const { date, time } = formatDateTime(dateTime);

  const handleOrder = async (totalPrice: number, selectedTickets: { id: number; quantity: number }[]) => {
    try {
      console.log("Pesan Sekarang ditekan");

      const token = localStorage.getItem("token"); // Get the token from local storage
      if (!token) {
        alert("Please login to proceed with your order.");
        return;
      }

      const decodedToken = jwtDecode<{ id: number }>(token); // Decode the token
      const userId = decodedToken.id; // Get userId from the token
      console.log("UserId from token:", userId);

      const ticketsToOrder = selectedTickets.filter((ticket) => ticket.quantity > 0);
      if (ticketsToOrder.length === 0) {
        alert("You haven't selected any tickets yet");
        return;
      }

      const payload = {
        total_price: ticketsToOrder.reduce((total, ticket) => total + (tickets.find((t) => t.id === ticket.id)?.price || 0) * ticket.quantity, 0),
        final_price: ticketsToOrder.reduce((total, ticket) => total + (tickets.find((t) => t.id === ticket.id)?.price || 0) * ticket.quantity, 0),
        tickets: ticketsToOrder.map((ticket) => ({
          ticketId: ticket.id,
          qty: ticket.quantity,
        })),
      };

      console.log("Ticket order payload", payload);

      const response = await handleOrderSubmit(payload, userId, token);
      console.log("Order result: ", response);

      if (response && response.order) {
        setOrderDetails(response);
        setView("orderSummary");
      }
    } catch (error) {
      console.log("Order Submission Failed: ", error);
    }
    console.log("Total Price:", totalPrice);
    console.log("Selected Tickets:", selectedTickets);
  };

  return (
    <div className="container mx-auto p-6 lg:flex lg:space-x-10 pt-[100px] h-full">
      {/* Left Section */}
      <div className="lg:w-2/3">
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image src={thumbnail} alt={title} fill className="object-cover rounded-lg" priority />
          <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 text-xs font-semibold rounded-lg">{category}</span>
        </div>
        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <div className="flex space-x-3 mb-4">
            <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${view === "description" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-500"}`} onClick={() => setView("description")}>
              <PiTextAlignLeftBold />
              Deskripsi
            </button>
            <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${view === "tickets" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-500"}`} onClick={() => setView("tickets")}>
              <LuTicketCheck />
              Pilih Tiket
            </button>
          </div>

          {view === "description" && <EventDescription title={title} description={description} category={category} />}
          {view === "tickets" && <EventTickets tickets={tickets} onOrder={handleOrder} />}
          {view === "orderSummary" && orderDetails && (
            <div>
              <h2 className="text-2xl font-bold">Order Summary</h2>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/3 bg-white rounded-lg shadow p-6 space-y-4 ">
        <div>
          <h3 className="text-gray-400 text-sm">Event Creator</h3>
          <h2 className="text-lg font-bold">{promotor}</h2>
        </div>
        <div>
          <h3 className="text-gray-400 text-sm">Title</h3>
          <p className="text-gray-900 font-semibold">{title}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt size={20} className="text-blue-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <IoTimeOutline size={20} className="text-blue-500" />
            <span>{time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <IoLocationOutline size={20} className="text-blue-500" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
