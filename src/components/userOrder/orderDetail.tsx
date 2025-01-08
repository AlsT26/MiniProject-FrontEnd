"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getOrderById } from "@/app/libs/order";
import { formatPrice } from "@/helpers/priceFormatter";
import { formatDateTime } from "@/helpers/formatDateTime";

interface Ticket {
  ticketTitle: string;
  qty: number;
  event: {
    title: string;
    dateTime: string;
    location: string;
  };
}

interface Order {
  id: number;
  finalPrice: number;
  status: string;
  tickets: Ticket[];
}

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const fetchedOrder = await getOrderById(Number(id)); // Fetch order by ID
        setOrder(fetchedOrder);
      } catch (error) {
        console.error("Error fetching order details:", error);
        router.push("/404"); // Redirect to 404 if order not found
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id, router]);

  if (isLoading) {
    return <p className="text-center text-gray-600 mt-10">Loading order details...</p>;
  }

  if (!order) {
    return <p className="text-center text-red-500 mt-10">Order not found.</p>;
  }

  return (
    <div className="container mx-auto p-6 pt-[100px]">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Details</h1>
      <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
        <h2 className="text-lg font-bold mb-4">Details:</h2>
        {order.tickets && order.tickets.length > 0 ? (
          <ul className="space-y-4">
            {order.tickets.map((ticket, index) => (
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
          <h3 className="text-lg font-bold">Final Price: {formatPrice(order.finalPrice)}</h3>
          <p className={`text-sm font-bold ${order.status === "Pending" ? "text-orange-500" : order.status === "Paid" ? "text-green-500" : "text-red-500"}`}>Status: {order.status}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
