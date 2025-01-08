"use client";
import Logo from "./logo";
import { useRouter } from "next/navigation";
import { Avatar } from "./avatar";

export default function Navbar() {
  const router = useRouter();

  return (
    <div id="nav" className="w-screen bg-green-900 flex justify-between p-[1rem] shadow-xl opacity-95 fixed z-10">
      <div className="flex items-center">
        <div>
          <Logo></Logo>
        </div>
      </div>
      <div className="flex flex-row gap-[1rem] text-white items-center">
        <div className="hover:scale-[110%] duration-200 hover:text-yellow-300 ">
          <a href="#" className="" onClick={() => router.push("/")}>
            Home
          </a>
        </div>
        <div className="hover:scale-[110%] duration-200 hover:text-yellow-300 ">
          <a href="#" className="" onClick={() => router.push("/order")}>
            Ticket
          </a>
        </div>
        <div className="hover:scale-[110%] duration-200 hover:text-yellow-300 ">
          <a href="#" className="">
            Event
          </a>
        </div>
      </div>

      <div className="text-green-400 pr-[1rem] flex items-center">
        <div>
          <Avatar></Avatar>
        </div>
      </div>
    </div>
  );
}
