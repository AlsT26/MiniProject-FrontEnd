"use client";

import React from "react";
import { formatPrice } from "@/helpers/priceFormatter";
import { formatDateTime } from "@/helpers/formatDateTime";
import { useRouter } from "next/navigation";

interface Ticket {
  ticketTitle: string; // Ticket title
  qty: number; // Quantity of tickets
  event: {
    title: string; // Event title
    dateTime: string; // Event date and time
    location: string; // Event location
  };
}

interface OrderCardProps {
  id: number;
  finalPrice: number;
  status: string;
  tickets: Ticket[];
}

const OrderCard: React.FC<OrderCardProps> = ({ finalPrice, status, tickets, id }) => {
  const router = useRouter();
  return (
    <div
      className="bg-white p-6 shadow-md rounded-lg border border-gray-200"
      //  onClick={() => router.push(`/order/detail/${id}`)}
    >
      <h2 className="text-lg font-bold mb-4">Details:</h2>
      {tickets && tickets.length > 0 ? (
        <ul className="space-y-4">
          {tickets.map((ticket, index) => (
            <li key={index} className="border-b pb-4">
              <h3 className="font-semibold text-gray-700">Event: {ticket.event.title}</h3>
              <p className="text-gray-600 text-sm">Ticket: {ticket.ticketTitle}</p>
              <p className="text-gray-600 text-sm">
                Date: {formatDateTime(ticket.event.dateTime).date}, {formatDateTime(ticket.event.dateTime).time}
              </p>
              <p className="text-gray-600 text-sm">Location: {ticket.event.location}</p>
              <p className="text-gray-600 text-sm">Quantity: {ticket.qty}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No tickets available for this order.</p>
      )}
      <div className="mt-6">
        <h3 className="text-lg font-bold">Final Price: {formatPrice(finalPrice)}</h3>
        <p className={`text-sm font-bold ${status === "Pending" ? "text-orange-500" : status === "Paid" ? "text-green-500" : "text-red-500"}`}>Status: {status}</p>
      </div>
    </div>
  );
};

export default OrderCard;
