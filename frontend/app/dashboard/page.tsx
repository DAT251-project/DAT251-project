"use client";

import { CalendarIcon, PhoneIcon, MagnifyingGlassIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import  AdminNavbar  from "@/app/ui/adminNavbar/AdminNavbar";
import SearchBar from "@/app/ui/searchBar";


export default function DashboardPage() {
  const bookings = [
    {
      email: "hello@hotmail.com",
      phone: "+47 11 22 33 444",
      guests: 5,
      comment: "moren min fyller 80 år, og vi ønsker å ha en liten overraskelse yay ayya ffeiring yay yay",
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
  ];

  return (
    
    <div className="flex min-h-dvh bg-[#f5f3ef]">
    <AdminNavbar/>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl mb-2">Hei, admin</h2>
            <div className="flex items-center gap-3 text-lg">
              <span>Søndag, 22. mars</span>
              <CalendarIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-8">
        
        {/* LEFT: Stats */}
        <div className="flex gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm w-48">
            <p className="text-sm text-gray-500">Antall bookinger</p>
            <p className="text-2xl font-bold">5</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm w-48">
            <p className="text-sm text-gray-500">Antall gjester</p>
            <p className="text-2xl font-bold">15</p>
            </div>
        </div>

        {/* RIGHT: Search */}
        <SearchBar/>

</div>

        {/* Table */}
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
              {bookings.map((b, i) => (
                <tr key={i} className="font-title border-b last:border-none text-sm">
                  <td className="p-8">{b.email}</td>

                  <td>
                    <div className="p-2 flex items-center gap-2">
                        <PhoneIcon className="w-4 h-4 shrink-0" />
                        <span>+47 11 22 33 444</span>
                    </div>
                    </td>

                  <td className="p-9">{b.guests}</td>

                  <td className="max-w-xs whitespace-normal break-words p-5"> {b.comment}</td>
                  
                  <td className="p-5">{b.date}</td>

                  <td className="p-5">{b.time}</td>

                  <td>
                    <span 
                      className={`font-medium ${
                        b.status === "Aktiv"
                          ? "text-green-600"
                          : "text-red-500"
                      } p-5`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td>
                    <EllipsisVerticalIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}