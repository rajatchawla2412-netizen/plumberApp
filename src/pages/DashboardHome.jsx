import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function DashboardHome() {
  const { setActiveModal, isClockedIn } = useOutletContext();

  return (
    <div className="space-y-6">
      {/* WELCOME SECTION - SFA Executive Role */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden animate-fade-in">
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-5 translate-y-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-48 h-48">
            <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.625c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.75v-5.625zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.625c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z" />
          </svg>
        </div>
        
        <div className="relative z-10 space-y-1">
          <h2 className="text-lg font-extrabold tracking-tight text-white">Welcome back, Rajesh! 👋</h2>
          <p className="text-xs text-slate-400 font-medium">Sales Executive • SFA Network</p>
          <div className="pt-4 flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wide text-brand-300 uppercase">Tuesday, 09 Jun 2026 • 8 visits scheduled</span>
          </div>
        </div>
      </section>

      {/* SFA WORKING SUMMARY SECTION */}
      <section className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-5 shadow-xl shadow-slate-200/40 space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="text-center sm:text-left">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">SFA Daily Working Summary</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Real-time SFA metrics logging</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Stat 1: Shift Attendance */}
          <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl flex flex-col items-center text-center shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 mb-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Attendance</span>
            <span className={`text-xs font-bold mt-1.5 block leading-none ${isClockedIn ? 'text-emerald-600' : 'text-slate-500'}`}>
              {isClockedIn ? 'Active' : 'Logged Out'}
            </span>
          </div>

          {/* Stat 2: Client Visits */}
          <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl flex flex-col items-center text-center shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0z" />
              </svg>
            </div>
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Client Visits</span>
            <span className="text-xs font-bold text-slate-700 mt-1.5 block leading-none">5 / 8 Completed</span>
          </div>

          {/* Stat 3: Orders Booked */}
          <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl flex flex-col items-center text-center shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" />
              </svg>
            </div>
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Orders Collected</span>
            <span className="text-xs font-bold text-slate-700 mt-1.5 block leading-none">12 Orders Booked</span>
          </div>

          {/* Stat 4: Value Booked */}
          <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl flex flex-col items-center text-center shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mb-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 1.5H9m12-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Value Booked</span>
            <span className="text-xs font-bold text-slate-700 mt-1.5 block leading-none">₹84,500.00</span>
          </div>

        </div>
      </section>

      {/* CUSTOMER NETWORK SECTION */}
      <section className="space-y-3 animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <div className="text-center sm:text-left">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Customer Network</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Manage partner listings and touchpoint records</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          
          {/* Category 1: Distributors */}
          <button 
            onClick={() => setActiveModal('distributors')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shadow-xs mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21h10.5" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Distributors</span>
            <span className="text-[9px] text-slate-400 mt-1 font-bold">12 Active</span>
          </button>

          {/* Category 2: Dealer Network */}
          <button 
            onClick={() => setActiveModal('dealers')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-xs mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.015a2.993 2.993 0 0 0 2.25 1.015c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h.008v.008H6.75V18zm0-3h.008v.008H6.75V15zm0-3h.008v.008H6.75V12zm3 6h.008v.008H9.75V18zm0-3h.008v.008H9.75V15zm0-3h.008v.008H9.75V12z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Dealers</span>
            <span className="text-[9px] text-slate-400 mt-1 font-bold">84 Outlets</span>
          </button>

          {/* Category 3: Direct Dealer */}
          <button 
            onClick={() => setActiveModal('direct_dealers')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-xs mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.75-2.985m-.001-3.484a3 3 0 1 0-5.496-1.5 3.52 3.52 0 1 0 5.496 1.5zM6 18.72a9.094 9.094 0 0 1-3.741-.479 3 3 0 0 1 4.682-2.72m-.94 3.198-.002.031c0 .225.012.447.037.666A11.944 11.944 0 0 0 12 21c2.17 0 4.207-.576 5.963-1.584A6.062 6.062 0 0 0 18 18.722m-12 0a5.97 5.97 0 0 1 .75-2.985m-.001-3.484a3 3 0 1 1 5.496-1.5 3.52 3.52 0 1 1-5.496 1.5z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Direct</span>
            <span className="text-[9px] text-slate-400 mt-1 font-bold">25 Partners</span>
          </button>

        </div>
      </section>

      {/* SFA SHORTCUTS GRID */}
      <section className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="text-center sm:text-left">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Shortcuts</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Quick shortcuts to execute visit actions</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          
          {/* Shortcut 1: Attendance */}
          <button 
            onClick={() => setActiveModal('attendance')}
            className="p-5 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <span className="text-xs font-extrabold text-slate-800 tracking-tight block">Attendance</span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 leading-normal max-w-[120px]">Check-in shift status</span>
          </button>

          {/* Shortcut 2: Follow Up */}
          <button 
            onClick={() => setActiveModal('followup')}
            className="p-5 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.502-5.15-3.828-6.652-6.652l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
              </svg>
            </div>
            <span className="text-xs font-extrabold text-slate-800 tracking-tight block">Follow Up</span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 leading-normal max-w-[120px]">Confirm client requests</span>
          </button>

          {/* Shortcut 3: Checkins */}
          <button 
            onClick={() => setActiveModal('checkins')}
            className="p-5 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0z" />
              </svg>
            </div>
            <span className="text-xs font-extrabold text-slate-800 tracking-tight block">Checkins</span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 leading-normal max-w-[120px]">GPS client site verification</span>
          </button>

          {/* Shortcut 4: Products */}
          <button 
            onClick={() => setActiveModal('products')}
            className="p-5 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <span className="text-xs font-extrabold text-slate-800 tracking-tight block">Products</span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 leading-normal max-w-[120px]">Plumbing catalog & supplies</span>
          </button>

          {/* Shortcut 5: Announcements */}
          <button 
            onClick={() => setActiveModal('announcements')}
            className="p-5 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            </div>
            <span className="text-xs font-extrabold text-slate-800 tracking-tight block">Announcements</span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 leading-normal max-w-[120px]">Internal SFA bulletins</span>
          </button>

          {/* Shortcut 6: Travel Plan */}
          <button 
            onClick={() => setActiveModal('travel')}
            className="p-5 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.446l6-2.7a1 1 0 0 0 .497-.872V5.586a1 1 0 0 0-.578-.906l-6-2.7a1 1 0 0 0-.85 0l-6 2.7a1 1 0 0 0-.578.906v12.348a1 1 0 0 0 .497.872l6 2.7a1 1 0 0 0 .85 0z" />
              </svg>
            </div>
            <span className="text-xs font-extrabold text-slate-800 tracking-tight block">Travel Plan</span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 leading-normal max-w-[120px]">GPS visit route optimizer</span>
          </button>

        </div>
      </section>
    </div>
  );
}
