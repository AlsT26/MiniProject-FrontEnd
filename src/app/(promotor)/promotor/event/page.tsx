"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import adminGuard from "@/hoc/adminGuard";
import { IEvent } from "@/types/event";
import { useRouter } from "next/navigation";
import NavbarPromotor from "@/components/NavbarPromotor";
import { jwtDecode } from "jwt-decode";
const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
// Define a type for the decoded user
interface DecodedUser {
  id: number;
  email: string;
  role: string;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedUser, setDecodedUser] = useState<DecodedUser | null>(null); // Use DecodedUser type
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", ""],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 5000, 2400, 3400, 0],
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

  if (!events) {
    return (
      <div className="w-screen h-[100vh] bg-white">
        <NavbarPromotor />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8 rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-800">My Event</h2>
              <div className="mt-4 min-h-[400px]">Not available</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-screen h-[100vh] bg-white">
      <NavbarPromotor />
      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-800">My Event</h2>
            <div className="py-[1rem]">
              <button className="px-2 py-1 bg-green-400 rounded text-white" onClick={() => router.push("/promotorManagement")}>
                New Event
              </button>
            </div>
            <div className="mt-4 min-h-[400px]">
              {isLoading ? (
                <p>Loading...</p>
              ) : events.length > 0 ? (
                <div>
                  {events
                    .filter((event) => decodedUser && event.promotorId === decodedUser.id)
                    .map((event) => (
                      <div key={event.id} className="p-4 border-b flex justify-between">
                        <h3 className="text-lg font-bold">{event.title}</h3>
                        <a
                          className="px-[1rem]
                        py-[0.5rem] rounded-xl bg-blue-400 text-white"
                          href={"/promotor/event/" + event.slug}
                        >
                          Detail
                        </a>
                      </div>
                    ))}
                </div>
              ) : (
                <p>No events found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default adminGuard(Dashboard, ["Promotor"]);
