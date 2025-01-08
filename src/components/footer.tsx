import Logo from "./logo";

export default function Footer() {
  return (
    <div className="w-screen bg-green-950 flex justify-between p-[3rem] shadow-xl gap-[3rem]">
      
      <div className="flex gap-[3rem]">
      <div className="text-white flex flex-col ml-[1rem]">
        <div className="mb-[1rem] font-bold ">Tentang Tikethub</div>
        <div className="text-yellow-200"><a href="/faq" >FAQ</a></div>
        <div className="text-yellow-200"><a href="/Karir">Karir</a></div>
        <div className="text-yellow-200"><a href="/Blog">Blog</a></div>
      </div>
      <div className="text-white flex flex-col ml-[1rem]">
        <div className="mb-[1rem] font-bold ">Navigasi</div>
        <div className="text-yellow-200"><a href="/faq">Home</a></div>
        <div className="text-yellow-200"><a href="/Karir">Event</a></div>
      </div>
      </div>
      <div className="text-white flex flex-col ml-[1rem]">
        <Logo/>
      </div>
    </div>
  );
}
