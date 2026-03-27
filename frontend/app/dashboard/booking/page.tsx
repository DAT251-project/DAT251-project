"use client";

import {
  CalendarIcon,
  EllipsisVerticalIcon,
  PhoneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import AdminNavbar from "@/app/ui/adminNavbar/AdminNavbar";
import SearchBar from "@/app/ui/searchBar";

export default function DashboardBookingsPage() {
  const bookings = [
    {
      email: "hello@hotmail.com",
      phone: "+47 11 22 33 444",
      guests: 5,
      comment:
        "moren min fyller 80 år, og vi ønsker å ha en liten overraskelse",
      date: "22.03.2026",
      time: "14:00-16:00",
      status: "Aktiv",
    },
    {
      email: "hello@gmail.com",
      phone: "+47 12 28 33 444",
      guests: 2,
      comment: "",
      date: "22.03.2026",
      time: "15:00-17:00",
      status: "Aktiv",
    },
    {
      email: "test@hotmail.com",
      phone: "+47 10 22 33 444",
      guests: 3,
      comment: "har svert alvorlig nøtteallergi",
      date: "22.03.2026",
      time: "19:30-21:30",
      status: "Kansellert",
    },
    {
      email: "bobby@hotmail.com",
      phone: "+47 10 22 33 444",
      guests: 3,
      comment: "",
      date: "22.03.2026",
      time: "19:30-21:30",
      status: "Aktiv",
    },
    {
      email: "bill@hotmail.com",
      phone: "+47 10 22 33 484",
      guests: 3,
      comment: "",
      date: "23.03.2026",
      time: "13:30-15:30",
      status: "Aktiv",
    },
    {
      email: "bob@hotmail.com",
      phone: "+47 10 22 99 444",
      guests: 5,
      comment: "",
      date: "23.03.2026",
      time: "14:00-16:00",
      status: "Aktiv",
    },
  ];

  return (
    <div className="flex min-h-dvh bg-[#f5f3ef]">
      <AdminNavbar />

      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="tracking-wider font-title text-3xl ">Historikk</h1>

          <div className="flex items-center gap-4">
            <button className="font-title flex items-center gap-3 rounded-2xl bg-[#c9a46d] px-5 py-3 text-sm font-medium text-black hover:opacity-90 transition">
              <span>Dato</span>
              <CalendarIcon className="h-5 w-5" />
            </button>
            
            <SearchBar />
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="border-b border-neutral-200 text-sm font-medium text-neutral-800">
                <th className="px-6 py-5 w-[15%]">Email</th>
                <th className="px-6 py-5 w-[18%]">Telefonnummer</th>
                <th className="px-4 py-5 w-[8%]">Antall</th>
                <th className="px-6 py-5 w-[20%]">Kommentar</th>
                <th className="px-4 py-5 w-[10%]">Dato</th>
                <th className="px-4 py-5 w-[12%]">Tid</th>
                <th className="px-4 py-5 w-[10%]">Status</th>
                <th className="w-[5%]"></th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-200 last:border-none text-sm"
                >
                  <td className="px-6 py-8">{booking.email}</td>

                  <td className="px-6 py-8">
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="h-5 w-5 shrink-0" />
                      <span>{booking.phone}</span>
                    </div>
                  </td>

                  <td className="px-4 py-8">{booking.guests}</td>

                  <td className="px-6 py-8 max-w-xs">
                    <p
                      className="line-clamp-3 whitespace-normal break-words"
                      title={booking.comment}
                    >
                      {booking.comment}
                    </p>
                  </td>

                  <td className="px-4 py-8">{booking.date}</td>

                  <td className="px-4 py-8">{booking.time}</td>

                  <td className="px-4 py-8">
                    <span
                      className={`font-medium ${
                        booking.status === "Aktiv"
                          ? "text-[#76A84D]"
                          : "text-[#C54B31]"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="px-4 py-8">
                    <button className="text-neutral-400 hover:text-neutral-600 transition">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-neutral-700">
          <p>Viser 6 - 20 resultater</p>

          <div className="flex items-center gap-3">
            <button className="tracking-wider font-title flex items-center gap-2 rounded-full border border-neutral-500 px-5 py-2 text-neutral-500 hover:bg-neutral-100 transition">
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Forrige</span>
            </button>

            <button className="tracking-wider font-title flex items-center gap-2 rounded-full border border-neutral-500 px-5 py-2 text-neutral-700 hover:bg-neutral-100 transition">
              <span>Neste</span>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
