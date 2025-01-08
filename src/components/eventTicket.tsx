"use client";

import { formatPrice } from "@/helpers/priceFormatter";
import React, { useState } from "react";

interface Ticket {
  id: number;
  title: string;
  desc: string;
  price: number;
  available: number;
  totalSeats: number;
}

interface EventTicketsProps {
  tickets: Ticket[];
  onOrder: (totalPrice: number, selectedTickets: { id: number; quantity: number }[]) => void;
}

export default function EventTickets({ tickets, onOrder }: EventTicketsProps) {
  const [selectedTickets, setSelectedTickets] = useState<{ id: number; quantity: number }[]>(tickets.map((ticket) => ({ id: ticket.id, quantity: 0 })));

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedTickets((prev) => prev.map((ticket) => (ticket.id === id ? { ...ticket, quantity } : ticket)));
  };

  const totalPrice = selectedTickets.reduce((total, ticket) => {
    const ticketDetails = tickets.find((t) => t.id === ticket.id);
    return total + (ticketDetails ? Number(ticketDetails.price) * ticket.quantity : 0);
  }, 0);

  return (
    <div className="bg-white p-6 shadow rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Pilih Tiket</h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="border p-4 rounded-lg flex justify-between items-center border-3 border-blue-800 border-dashed relative pl-10">
            <div className="border absolute w-10 h-10 rounded-full border-dashed border-blue-800 border-5 left-0 -translate-x-[28px] z-10 border-l-0 border-y-0 bg-white"></div>
            <div className="border absolute w-10 h-10 rounded-full border-dashed border-blue-800 border-5 right-0 translate-x-[28px] z-10 border-r-0 border-y-0 bg-white"></div>
            <div>
              <h3 className="text-lg font-bold">{ticket.title}</h3>
              <p className="text-gray-600">{ticket.desc}</p>
              <p className="text-gray-600">{formatPrice(ticket.price)}</p>
              <p className="text-sm text-gray-500">
                {ticket.available}/{ticket.totalSeats} Tiket Tersedia
              </p>
            </div>
            {ticket.available === 0 ? (
              <span className="text-red-500 font-semibold">Sold Out</span>
            ) : (
              <div className="flex items-center space-x-2 pr-4">
                <button onClick={() => handleQuantityChange(ticket.id, Math.max(0, (selectedTickets.find((t) => t.id === ticket.id)?.quantity || 0) - 1))} className="px-2 py-1 bg-gray-200 rounded">
                  -
                </button>
                <span>{selectedTickets.find((t) => t.id === ticket.id)?.quantity || 0}</span>
                <button onClick={() => handleQuantityChange(ticket.id, Math.min(ticket.available, (selectedTickets.find((t) => t.id === ticket.id)?.quantity || 0) + 1))} className="px-2 py-1 bg-gray-200 rounded">
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <h3 className="text-lg font-bold">Total Harga: {formatPrice(totalPrice)}</h3>
        <button
          onClick={async () => {
            try {
              console.log("Pesan sekarang");
              await onOrder(totalPrice, selectedTickets);
            } catch (error) {
              alert("Failed to process order");
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
}
