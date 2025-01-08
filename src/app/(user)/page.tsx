import Wrapper from "@/components/cardWrapper";
import Carousel from "./components/carouselEffect";
import { IoIosArrowForward } from "react-icons/io";

export default function Home() {
  return (
    <div className="pt-[7rem]  bg-slate-100 min-h-[100vh]">
      <div className="mx-[3rem] md:mx-[9rem]">
        <Carousel />
      </div>
      <div className="mx-[3rem] mt-20">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Event Pilihan</h1>
          <div className="flex items-center">
            <button>Semua Events</button>
            <IoIosArrowForward />
          </div>
        </div>

        <div className="h-auto">
          <Wrapper />
        </div>
      </div>
      {/* <img src="https://assets.loket.com/images/ss/1733033671_ExTa9I.jpg" alt="" /> */}
    </div>
  );
}
