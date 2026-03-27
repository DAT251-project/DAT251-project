"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function AdminNavbar() {
  return (
    <aside className="w-60 bg-[#8B2E1A] rounded-r-2xl text-white flex flex-col  justify-between p-6" >
      <div>
        <img
          src="/logo.png"
          alt="Sze Chuan House logo"
          className="w-[150px] mx-auto mb-5 block"
        />

        <nav className="flex flex-col gap-5">
          <button className="tracking-widest font-title flex items-center gap-2 opacity-85 hover:opacity-100">
            Dashboard
          </button>

          <button className="tracking-widest flex items-center gap-2 opacity-85 hover:opacity-100 ">
            Bookings
          </button>
        </nav>
      </div>

    <button className="flex items-center gap-2 opacity-80 hover:opacity-100">
      <ArrowRightOnRectangleIcon className="w-5 h-5" />
      <span>Log ut</span>
    </button>
    </aside>
  );
}