import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainerVariants, fadeUpVariants } from '../animations/variants';

export default function NotificationsPage() {
  const navigate = useNavigate();
  // Fetch shared notifications from LandingPage Outlet context
  const { notifications, setNotifications } = useOutletContext();

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <motion.div 
      variants={staggerContainerVariants()}
      initial="hidden"
      animate="show"
      className="space-y-6 pt-4 pb-8"
    >

      {/* BACK BUTTON & HEADER */}
      <motion.div variants={fadeUpVariants} className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-white/60 hover:bg-white/90 border border-white hover:border-brand-200 rounded-xl text-brand-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none flex items-center justify-center shadow-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">SFA Notifications</h2>
            <p className="text-[10px] text-slate-400 font-semibold">Swipe left to dismiss alerts</p>
          </div>
        </div>

        {/* Action buttons */}
        {notifications.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={handleMarkAllRead}
              className="text-[9px] font-bold text-brand-600 bg-white/80 border border-white hover:border-brand-100 hover:bg-white px-2 py-1.5 rounded-lg shadow-xs transition-all duration-200 cursor-pointer"
            >
              Mark Read
            </button>
            <button
              onClick={handleClearAll}
              className="text-[9px] font-bold text-rose-600 bg-rose-50/50 border border-rose-100/50 hover:bg-rose-50 px-2 py-1.5 rounded-lg shadow-xs transition-all duration-200 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </motion.div>

      {/* NOTIFICATIONS LIST CONTAINER */}
      <motion.div variants={fadeUpVariants} className="space-y-4">
        <AnimatePresence initial={false}>
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className="relative overflow-hidden rounded-xl bg-rose-500 shadow-sm"
              >
                {/* Red delete backdrop covering full area underneath */}
                <div className="absolute inset-0 flex items-center justify-end pr-5 text-white bg-rose-500 pointer-events-none">
                  <div className="flex flex-col items-center space-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="text-[7px] font-bold uppercase tracking-wider">Dismiss</span>
                  </div>
                </div>

                {/* Dragging white card - relative to define outer height dynamically */}
                <motion.div
                  drag="x"
                  dragDirectionLock
                  dragSnapToOrigin={true}
                  dragConstraints={{ left: -140, right: 0 }}
                  dragElastic={{ left: 0.15, right: 0 }}
                  onDragEnd={(event, info) => {
                    // If user swiped more than 90px to the left, dismiss
                    if (info.offset.x < -90) {
                      handleDismiss(n.id);
                    }
                  }}
                  whileDrag={{ scale: 0.99, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                  className={`relative w-full bg-white border rounded-xl p-4 flex justify-between items-center transition-colors duration-200 select-none z-10 ${
                    n.read ? 'border-slate-100' : 'border-indigo-100'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${n.read ? 'bg-transparent' : 'bg-brand-500'}`}></span>
                      <span className={`text-xs font-bold leading-none ${n.read ? 'text-slate-600' : 'text-slate-800'}`}>
                        {n.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium pl-3.5 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1 shrink-0">
                    <span className="text-[8px] text-slate-400 shrink-0 font-semibold">{n.time}</span>
                    {!n.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                        }}
                        className="text-[8px] font-extrabold text-brand-600 hover:text-brand-500 bg-brand-50/50 hover:bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100/50 uppercase tracking-wide focus:outline-none cursor-pointer"
                      >
                        Read
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 bg-white/40 backdrop-blur-xl border border-white rounded-xl p-6 shadow-sm space-y-3"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-extrabold text-slate-800">All Caught Up!</h3>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">No new inbox notifications at the moment.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
}
