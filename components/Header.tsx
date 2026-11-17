"use client";

import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/70">
      <div className="flex items-center justify-between px-4 md:px-8 h-14 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-indigo-500/30">
            C
          </div>
          <span className="font-semibold text-slate-900 tracking-tight">Caixola</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          <div className="ml-1 w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-2 ring-white shadow-sm" />
        </div>
      </div>
    </header>
  );
}
