"use client";

export default function NavbarPromotor() {

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <a href="/">
              <button className="py-[0.5rem] my-[1rem] px-[1rem] bg-gray-200 rounded">
                Back
              </button>
            </a>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex gap-[1rem] text-blue-700 text-xl">
            <div>
              <a href="/promotor/dashboard">Statistic</a>
            </div>
            <div>
              <a href="/promotor/event">Event</a>
            </div>
            <div>
              {/* <a href="#">Setting</a> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
