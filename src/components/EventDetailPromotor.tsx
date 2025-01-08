"use client";
import { formatPrice } from "@/helpers/priceFormatter";
import { formatDateTime } from "@/helpers/formatDateTime";

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

const EventDetails: React.FC<EventDetailsProps> = ({ title, dateTime, tickets }) => {
  const { date } = formatDateTime(dateTime);

  return (
    <div className="p-[1rem] flex flex-col gap-[1rem]">
      {/* Back Button */}
      <div>
        <a href="/promotor/event" className="border-2 border-black py-[0.5rem] px-[1rem] rounded-xl">
          Back
        </a>
      </div>

      {/* Event Title and Date */}
      <div className="text-xl font-bold">{title}</div>
      <div className="text-gray-600">{date}</div>

      {/* New Ticket Button */}
      <div>
        <button className="px-2 py-1 bg-green-200 rounded">New Ticket</button>
      </div>

      {/* Tickets List */}
      <div>
        {tickets.map((ticket) => (
          <div key={ticket.id} className="border p-4 rounded-lg flex justify-between items-center border-3 border-blue-800 border-dashed relative pl-10">
            {/* Decorative Circles */}
            <div className="border absolute w-10 h-10 rounded-full border-dashed border-blue-800 border-5 left-0 -translate-x-[28px] z-10 border-l-0 border-y-0 bg-white"></div>
            <div className="border absolute w-10 h-10 rounded-full border-dashed border-blue-800 border-5 right-0 translate-x-[28px] z-10 border-r-0 border-y-0 bg-white"></div>

            {/* Ticket Details */}
            <div>
              <h3 className="text-lg font-bold">{ticket.title}</h3>
              <p className="text-gray-600">{ticket.desc}</p>
              <p className="text-gray-600">{formatPrice(ticket.price)}</p>
              <p className="text-sm text-gray-500">
                {ticket.available}/{ticket.totalSeats} Tickets Available
              </p>
            </div>

            {/* Ticket Actions */}
            {ticket.available === 0 ? (
              <span className="text-red-500 font-semibold">Sold Out</span>
            ) : (
              <div className="flex items-center space-x-2 pr-4">
                <button className="px-2 py-1 bg-gray-200 rounded">Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
