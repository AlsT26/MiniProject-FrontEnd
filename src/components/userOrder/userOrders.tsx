"use client";

import React, { useEffect, useState } from "react"; // Card component for individual orders // The utility function you created
import { useSession } from "@/context/useSession";
import OrderCard from "./orderCard";
import { getOrdersForUser } from "@/app/libs/order";

const UserOrdersPage: React.FC = () => {
  const { user, isAuth } = useSession(); // User session context
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    try {
      if (!user?.id) return; // Ensure user ID is available
      setIsLoading(true);
      const orders = await getOrdersForUser(); // Call your utility function
      console.log("Fetched Orders Data:", orders); // Log the fetched data here
      setOrders(orders || []); // Set orders or an empty array if none exist
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      fetchOrders(); // Fetch orders when the component mounts and user is authenticated
    }
  }, [isAuth, user?.id]);

  if (!isAuth) {
    return <p className="text-center text-red-500 mt-10">Please log in to view your orders.</p>;
  }

  return (
    <div className="container mx-auto p-6 pt-[100px]">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} tickets={order.tickets} finalPrice={order.final_price} status={order.status} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;
