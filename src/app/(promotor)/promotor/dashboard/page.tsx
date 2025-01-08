"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import NavbarPromotor from "@/components/NavbarPromotor";
import React, { useEffect, useState } from "react";
import adminGuard from "@/hoc/adminGuard";
import { IEvent, ITicket } from "@/types/event";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface DecodedUser {
  id: number;
  email: string;
  role: string;
}
const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
const Dashboard = () => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedUser, setDecodedUser] = useState<DecodedUser | null>(null);
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [tickets, setTickets] = useState<ITicket[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales",
        data: [3,0,0,0,0,0,0,0,0,0,0,0],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log(token);
    if (storedToken) {
      try {
        // Decode the JWT and cast to DecodedUser type
        const user = jwtDecode<DecodedUser>(storedToken);
        setDecodedUser(user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch(`${base_url}/event/show&promotorId=0`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);
  if (isLoading || !decodedUser) {
    return (
      <div className="w-screen h-[100vh] flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div className="w-screen h-[100vh] bg-white">
      <NavbarPromotor></NavbarPromotor>
      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-medium text-gray-500">
                Event created
              </h2>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {
                  events.filter((event) => event.promotorId === decodedUser.id)
                    .length
                }
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-medium text-gray-500">Ticket Sold</h2>
              <p className="mt-2 text-2xl font-bold text-gray-900">
              3
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-medium text-gray-500">
                Total Revenue
              </h2>
              <p className="mt-2 text-2xl font-bold text-gray-900">IDR 3.000.000</p>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-800">
              Sales Statistics
            </h2>
            <div className="mt-4 min-h-[400px]">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default adminGuard(Dashboard);
