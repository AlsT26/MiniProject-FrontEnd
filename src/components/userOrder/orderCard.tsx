import React from "react";
import { formatPrice } from "@/helpers/priceFormatter";
import { formatDateTime } from "@/helpers/formatDateTime";

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
  finalPrice: number; // Final price of the order
  status: string; // Status of the order
  tickets: Ticket[]; // Tickets array
}

const OrderCard: React.FC<OrderCardProps> = ({ finalPrice, status, tickets }) => {
  console.log("Ticket", tickets); // Debugging tickets data
  return (
    <div className="bg-white p-4 shadow rounded-lg border">
      <h2 className="text-xl font-bold mb-2">Event Details:</h2>
      {tickets && tickets.length > 0 ? (
        <ul className="space-y-2">
          {tickets.map((ticket, index) => (
            <li key={index} className="border-b pb-2">
              <h3 className="font-semibold">Event: {ticket.event.title}</h3>
              <p className="text-gray-600 font-bold">{ticket.ticketTitle}</p> {/* Display ticket title */}
              <p className="text-gray-600">Location: {ticket.event.location}</p>
              <p className="text-gray-600">
                Date: {formatDateTime(ticket.event.dateTime).date} {formatDateTime(ticket.event.dateTime).time}
              </p>
              <p className="text-gray-600">Quantity: {ticket.qty}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tickets available for this order.</p>
      )}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Final Price: {formatPrice(finalPrice)}</h3>
        <p className={`text-sm font-bold ${status === "Pending" ? "text-orange-500" : status === "Paid" ? "text-green-500" : "text-red-500"}`}>Status: {status}</p>
      </div>
    </div>
  );
};

export default OrderCard;
