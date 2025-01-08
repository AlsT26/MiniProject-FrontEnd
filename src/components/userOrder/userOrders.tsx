"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/context/useSession";
import OrderCard from "./orderCard";
import { getUserOrdersByStatus } from "@/app/libs/order";

const UserOrdersPage: React.FC = () => {
  const { user, isAuth } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const fetchFilteredOrders = async () => {
    try {
      if (!user?.id) return;
      setIsLoading(true);

      // Use the new libs function for filtering
      const userOrders =
        statusFilter === "All"
          ? await getUserOrdersByStatus("") // Empty string for "All"
          : await getUserOrdersByStatus(statusFilter);

      setOrders(userOrders || []);
    } catch (error) {
      console.error("Error fetching filtered orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      fetchFilteredOrders();
    }
  }, [isAuth, user?.id, statusFilter]);

  if (!isAuth) {
    return <p className="text-center text-red-500 mt-10">Please log in to view your orders.</p>;
  }

  return (
    <div className="container mx-auto p-6 pt-[100px]">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>

      {/* Status Filter */}
      <div className="mb-6 flex justify-center">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 shadow focus:outline-none">
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders available for the selected filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} tickets={order.tickets} finalPrice={order.final_price} status={order.status} id={order.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;
