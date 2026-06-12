import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon-only.jpeg';

export default function DashboardHome() {
  const { setActiveModal, isClockedIn } = useOutletContext();
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
  const isCheckinAllowed = userInfo.checkin_allowed !== false;

  return (
    <div className="space-y-6">
      {/* WELCOME SECTION - SFA Executive Role */}
      <section 
        onClick={() => navigate('/dashboard/user')}
        className="bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/90 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden animate-fade-in transition-all duration-300 cursor-pointer active:scale-[0.99] group"
      >
        {/* Click indicator arrow */}
        <div className="absolute top-5 right-5 text-slate-500 group-hover:text-brand-300 group-hover:translate-x-0.5 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        <div className="absolute right-0 bottom-0 pointer-events-none translate-x-5 translate-y-5">
          <img src={logo} alt="Water Drop Logo" className="w-48 h-48 object-cover rounded-3xl" style={{ filter: 'invert(1)', opacity: 0.05 }} />
        </div>

        <div className="relative z-10 space-y-1">
          <h2 className="text-lg font-extrabold tracking-tight text-white group-hover:text-brand-300 transition-colors duration-300">Welcome back, Rajesh! 👋</h2>
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
          <h3 className="text-xs font-extrabold text-black-500 uppercase tracking-wider">SFA Daily Working Summary</h3>
          <p className="text-[10px] text-black-400 mt-0.5">Real-time SFA metrics logging</p>
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
          <h3 className="text-xs font-extrabold text-black-500 uppercase tracking-wider">Customer Network</h3>
          <p className="text-[10px] text-black-400 mt-0.5">Manage partner listings and touchpoint records</p>
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
          <h3 className="text-xs font-extrabold text-black-500 uppercase tracking-wider">Shortcuts</h3>
          <p className="text-[10px] text-black-400 mt-0.5">Quick shortcuts to execute visit actions</p>
        </div>

        <div className="grid grid-cols-3 gap-3">

          {/* Shortcut 1: Attendance */}
          <button
            onClick={() => {
              if (!isCheckinAllowed) {
                alert("Check-in is not allowed for your account.");
              } else {
                setActiveModal('attendance');
              }
            }}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Attendance</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">Shift status</span>
          </button>

          {/* Shortcut 2: Follow Up */}
          <button
            onClick={() => setActiveModal('followup')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.502-5.15-3.828-6.652-6.652l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Follow Up</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">Client requests</span>
          </button>

          {/* Shortcut 3: Checkins */}
          <button
            onClick={() => {
              if (!isCheckinAllowed) {
                alert("Check-in is not allowed for your account.");
              } else {
                setActiveModal('checkins');
              }
            }}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Checkins</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">GPS validation</span>
          </button>

          {/* Shortcut 4: Products */}
          <button
            onClick={() => setActiveModal('products')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Products</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">Parts catalog</span>
          </button>

          {/* Shortcut 5: Announcements */}
          <button
            onClick={() => setActiveModal('announcements')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Bulletins</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">SFA bulletins</span>
          </button>

          {/* Shortcut 6: Travel Plan */}
          <button
            onClick={() => setActiveModal('travel')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.446l6-2.7a1 1 0 0 0 .497-.872V5.586a1 1 0 0 0-.578-.906l-6-2.7a1 1 0 0 0-.85 0l-6 2.7a1 1 0 0 0-.578.906v12.348a1 1 0 0 0 .497.872l6 2.7a1 1 0 0 0 .85 0z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Travel Plan</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">Route planner</span>
          </button>

          {/* Shortcut 7: Tasks */}
          <button
            onClick={() => setActiveModal('tasks')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.408c-.09.53-.55.954-1.088.954H5.25A2.25 2.25 0 0 1 3 15V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0 1 1.123-.08" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Tasks</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">Daily assignments</span>
          </button>

          {/* Shortcut 8: Survey */}
          <button
            onClick={() => setActiveModal('survey')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Survey</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">Store feedback</span>
          </button>

          {/* Shortcut 9: Event Plan */}
          <button
            onClick={() => setActiveModal('event')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Event Plan</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">Dealer meets</span>
          </button>

          {/* Shortcut 10: Expenses */}
          <button
            onClick={() => setActiveModal('expenses')}
            className="p-3 bg-white/60 backdrop-blur-xl border border-white hover:border-brand-200 rounded-xl flex flex-col items-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] transition-all duration-300 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125H3.75A1.125 1.125 0 0 1 2.625 18V5.625C2.625 5.004 3.129 4.5 3.75 4.5zM18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block">Expenses</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 leading-tight max-w-[80px]">Log allowance</span>
          </button>

        </div>
      </section>
    </div>
  );
}
