"use client";

import React from "react";
import { formatPrice } from "@/helpers/priceFormatter";

interface OrderSummaryProps {
  order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  return (
    <div className="bg-green-50 p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>Total Price:</strong> {formatPrice(order.total_price)}
      </p>
      <p>
        <strong>Expires At:</strong> {new Date(order.expiredAt).toLocaleString()}
      </p>
      <h3 className="mt-4 font-semibold">Tickets:</h3>
      <ul className="list-disc pl-6">
        {order.details.map((detail) => (
          <li key={detail.id}>
            {detail.qty}x {detail.ticket.title} - {formatPrice(detail.qty * detail.ticket.price)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSummary;
