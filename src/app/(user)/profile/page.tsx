"use client";

import { useSession } from "@/context/useSession";
import Image from "next/image";
import authGuard from "@/hoc/authGuard";
function Home() {
  const { user} = useSession();
  return (
    <div className="pt-[7rem]  h-[100vh] bg-slate-100">
      <div className="flex flex-col items-center justify-center">
        <div className="w-[9rem] h-[9rem] relative">
          <Image
            className="rounded-full object-cover"
            src={user?.avatar || ""}
            alt="gak ada"
            fill
            priority
          />
        </div>
        <div className="text-[2rem]">{user?.username}</div>
      </div>
    </div>
  );
}
export default authGuard(Home);