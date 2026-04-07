"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
        <div className="flex items-center gap-2 bg-white px-3 py-3 rounded-2xl border border-gray-200 w-fit">
            <input
            placeholder="Søk"
            className="outline-none bg-transparent text-sm"
            />
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
        </div>
  );
}