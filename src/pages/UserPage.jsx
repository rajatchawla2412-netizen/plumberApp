import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainerVariants, fadeUpVariants } from '../animations/variants';

export default function UserPage() {
  const navigate = useNavigate();

  // Mock SFA Target Metrics
  const targets = [
    { label: 'Monthly Value Target', current: 84500, target: 150000, unit: '₹', percent: 56, color: 'from-brand-600 to-brand-500' },
    { label: 'Dealer Visit Count', current: 92, target: 120, unit: '', percent: 76, color: 'from-indigo-600 to-indigo-500' },
    { label: 'New Partner Onboardings', current: 8, target: 10, unit: '', percent: 80, color: 'from-emerald-600 to-emerald-500' }
  ];

  // Leaves Summary
  const leaves = [
    { type: 'Sick Leave', used: 2, limit: 5, bg: 'bg-indigo-50/70 border-indigo-100 text-indigo-600' },
    { type: 'Casual Leave', used: 4, limit: 6, bg: 'bg-amber-50/70 border-amber-100 text-amber-600' },
    { type: 'Earned Leave', used: 1, limit: 4, bg: 'bg-emerald-50/70 border-emerald-100 text-emerald-600' }
  ];

  // Holiday Calendar
  const holidays = [
    { date: '15 Aug 2026', day: 'Saturday', name: 'Independence Day' },
    { date: '02 Oct 2026', day: 'Friday', name: 'Gandhi Jayanti' },
    { date: '08 Nov 2026', day: 'Sunday', name: 'Diwali' },
    { date: '25 Dec 2026', day: 'Friday', name: 'Christmas Day' }
  ];

  const handleApplyLeave = () => {
    const reason = prompt("Enter reason for applying leave:");
    if (reason) {
      alert(`Leave request for "${reason}" has been submitted successfully to your sales manager!`);
    }
  };

  return (
    <motion.div 
      variants={staggerContainerVariants()}
      initial="hidden"
      animate="show"
      className="space-y-6 pt-4 pb-8"
    >
      
      {/* BACK BUTTON & HEADER */}
      <motion.div variants={fadeUpVariants} className="flex items-center space-x-3">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 bg-white/60 hover:bg-white/90 border border-white hover:border-brand-200 rounded-xl text-brand-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none flex items-center justify-center shadow-xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4.5 h-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">SFA Executive Profile</h2>
          <p className="text-[10px] text-slate-400 font-semibold">Rajesh Kumar • Emp ID: SFA-3948</p>
        </div>
      </motion.div>

      {/* SFA PERFORMANCE TARGET CHART CARD */}
      <motion.section variants={fadeUpVariants} className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-5 shadow-xl shadow-slate-200/40 space-y-4">
        <div>
          <h3 className="text-xs font-extrabold text-black-500 uppercase tracking-wider">Target & Performance Log</h3>
          <p className="text-[10px] text-black-400 mt-0.5">Month-to-date sales quotas status</p>
        </div>

        <div className="space-y-4 pt-1">
          {targets.map((tgt, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">{tgt.label}</span>
                <span className="font-bold text-slate-800">
                  {tgt.unit}{tgt.current.toLocaleString()} / {tgt.unit}{tgt.target.toLocaleString()} ({tgt.percent}%)
                </span>
              </div>
              
              {/* Progress Bar Track */}
              <div className="w-full h-3.5 bg-slate-50 border border-slate-200/50 rounded-full overflow-hidden p-[2px] shadow-xs">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${tgt.percent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${tgt.color} shadow-sm`}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* LEAVES STATUS CARD */}
      <motion.section variants={fadeUpVariants} className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-5 shadow-xl shadow-slate-200/40 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xs font-extrabold text-black-500 uppercase tracking-wider">Leave Balance Tracker</h3>
            <p className="text-[10px] text-black-400 mt-0.5">Current year allocation metrics</p>
          </div>
          <button
            onClick={handleApplyLeave}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-[9px] uppercase py-1.5 px-3 rounded-lg shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer focus:outline-none"
          >
            Apply Leave
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {leaves.map((lv, i) => (
            <div key={i} className={`p-3 border rounded-xl flex flex-col items-center text-center shadow-xs ${lv.bg}`}>
              <span className="text-[9px] font-bold uppercase tracking-wider block opacity-70">{lv.type}</span>
              <span className="text-sm font-extrabold mt-1.5 block leading-none">
                {lv.used} / {lv.limit}
              </span>
              <span className="text-[8px] font-medium mt-1 block opacity-60">Days used</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* HOLIDAYS CALENDAR CARD */}
      <motion.section variants={fadeUpVariants} className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-5 shadow-xl shadow-slate-200/40 space-y-4">
        <div>
          <h3 className="text-xs font-extrabold text-black-500 uppercase tracking-wider">SFA Holiday Calendar 2026</h3>
          <p className="text-[10px] text-black-400 mt-0.5">Upcoming scheduled corporate holidays</p>
        </div>

        <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
          {holidays.map((h, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
              <div className="space-y-0.5">
                <span className="font-semibold text-slate-800">{h.name}</span>
                <p className="text-[9px] text-slate-400 font-semibold">{h.day}</p>
              </div>
              <span className="text-[10px] bg-brand-50 text-brand-600 px-2.5 py-0.5 rounded font-bold border border-brand-100 uppercase shrink-0">
                {h.date}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

    </motion.div>
  );
}
