import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userPhone] = useState(location.state?.phone || '');

  const [activeModal, setActiveModal] = useState(null); // null | SFA category id / shortcut id
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [attendanceLogs, setAttendanceLogs] = useState([
    { date: 'Yesterday', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present' },
    { date: '08 Jun 2026', checkIn: '08:55 AM', checkOut: '06:05 PM', status: 'Present' }
  ]);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Pull-to-refresh states
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const startY = useRef(0);
  const containerRef = useRef(null);
  const isAtTop = useRef(false);

  // Monitor activeModal to apply/remove body scroll lock
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  // Handle Capacitor native hardware back button presses
  useEffect(() => {
    let listenerPromise = null;

    if (Capacitor.isNativePlatform()) {
      listenerPromise = App.addListener('backButton', (data) => {
        if (activeModal) {
          setActiveModal(null);
        } else if (showLogoutConfirm) {
          setShowLogoutConfirm(false);
        } else if (location.pathname === '/dashboard/user') {
          navigate('/dashboard');
        } else {
          App.exitApp();
        }
      });
    }

    return () => {
      if (listenerPromise) {
        listenerPromise.then(handle => handle.remove());
      }
    };
  }, [activeModal, showLogoutConfirm, location.pathname, navigate]);

  const handleTouchStart = (e) => {
    if (isRefreshing || activeModal) return;
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      isAtTop.current = true;
      startY.current = e.touches[0].pageY;
    } else {
      isAtTop.current = false;
    }
  };

  const handleTouchMove = (e) => {
    if (!isAtTop.current || isRefreshing || activeModal) return;
    const currentY = e.touches[0].pageY;
    const diffY = currentY - startY.current;

    if (diffY > 0) {
      setIsPulling(true);
      // High resistance: scale diffY by 0.3
      const distance = Math.min(100, diffY * 0.3);
      setPullDistance(distance);
      
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isAtTop.current || isRefreshing || activeModal) return;
    
    // High distance threshold to trigger sync: 90px
    if (pullDistance >= 90) {
      setIsRefreshing(true);
      setPullDistance(70); // Hold it translated down during sync
      
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        setIsPulling(false);
      }, 1500);
    } else {
      setPullDistance(0);
      setIsPulling(false);
    }
    isAtTop.current = false;
  };

  // Interactive Task List State
  const [tasksList, setTasksList] = useState([
    { id: 1, text: 'Collect signed dealer agreement from Sai Plumbing House', done: false },
    { id: 2, text: 'Resolve pending parts return dispute at Garg Sanitation', done: true },
    { id: 3, text: 'Deliver the Sapphire premium catalog to Apex Distributors', done: false },
    { id: 4, text: 'Submit the weekend dealer meet report to the sales manager', done: false }
  ]);

  const toggleTask = (id) => {
    setTasksList(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Interactive Survey Feedback Form State
  const [surveyFeedback, setSurveyFeedback] = useState({
    dealerName: '',
    satisfaction: '5',
    remarks: ''
  });

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    alert(`SFA Survey submitted successfully for dealer: ${surveyFeedback.dealerName}`);
    setSurveyFeedback({ dealerName: '', satisfaction: '5', remarks: '' });
    setActiveModal(null);
  };

  // Static Event Plan
  const eventsList = [
    { id: 1, title: 'North India SFA Dealer Conclave', date: '12 Jun 2026', time: '11:00 AM', location: 'Hotel Radisson Blue, Noida', attendees: '45 Dealers mapped' },
    { id: 2, title: 'Sapphire Range Product Training', date: '15 Jun 2026', time: '02:30 PM', location: 'Apex Distributors Hub', attendees: '15 sales reps' },
    { id: 3, title: 'Sanitation Expo & Vendor Showcase', date: '20 Jun 2026', time: '10:00 AM', location: 'Pragati Maidan, Delhi', attendees: 'Open Exhibition' }
  ];

  // Interactive Expenses State
  const [expensesList, setExpensesList] = useState([
    { id: 1, date: 'Today', category: 'Fuel / Travel', amount: '₹450.00', status: 'Approved' },
    { id: 2, date: 'Yesterday', category: 'Dealer Lunch', amount: '₹1,200.00', status: 'Pending' },
    { id: 3, date: '08 Jun 2026', category: 'Stationery / Prints', amount: '₹150.00', status: 'Approved' }
  ]);
  const [newExpense, setNewExpense] = useState({ category: 'Travel Allowance', amount: '' });
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.amount) return;
    setExpensesList([
      { id: Date.now(), date: 'Today', category: newExpense.category, amount: `₹${parseFloat(newExpense.amount).toFixed(2)}`, status: 'Pending' },
      ...expensesList
    ]);
    setNewExpense({ category: 'Travel Allowance', amount: '' });
    alert('Expense logged on SFA tracker! Approval pending.');
  };

  // SFA Auth Guard
  useEffect(() => {
    if (!userPhone) {
      navigate('/login', { replace: true });
    }
  }, [userPhone, navigate]);

  // Format phone number for display (+91 98765-43210)
  const formatPhoneDisplay = (num) => {
    if (!num) return '';
    if (num.length < 5) return `+91 ${num}`;
    return `+91 ${num.slice(0, 5)}-${num.slice(5)}`;
  };



  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    setIsLoggingOut(true);
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  // Mock Data for Customer Network
  const distributorsList = [
    { id: 1, name: 'Apex Distributors', city: 'Delhi NCR', contact: 'Aman Verma', phone: '9876543001', code: 'DIS-091' },
    { id: 2, name: 'Sunrise Trade Link', city: 'Mumbai', contact: 'Ramesh Patel', phone: '9876543002', code: 'DIS-092' },
    { id: 3, name: 'Krishna Sanitation', city: 'Bangalore', contact: 'K. Srinivasan', phone: '9876543003', code: 'DIS-093' }
  ];

  const dealerNetworkList = [
    { id: 1, name: 'Garg Sanitation & Tiles', city: 'Noida', mapping: 'Apex Distributors', phone: '9876543011', code: 'DLR-501' },
    { id: 2, name: 'Metro Bath & Hardware', city: 'Gurgaon', mapping: 'Apex Distributors', phone: '9876543012', code: 'DLR-502' },
    { id: 3, name: 'Sai Plumbing House', city: 'Pune', mapping: 'Sunrise Trade Link', phone: '9876543013', code: 'DLR-503' }
  ];

  const directDealersList = [
    { id: 1, name: 'Modern Builders & Hardware', city: 'Hyderabad', contact: 'M. Reddy', phone: '9876543021', code: 'DDR-101' },
    { id: 2, name: 'Royal Plumbing Depot', city: 'Chennai', contact: 'S. Kumar', phone: '9876543022', code: 'DDR-102' }
  ];

  // Mock Data for shortcuts
  const followUps = [
    { id: 1, name: 'Apex Distributors (Delhi)', task: 'Confirm stock delivery of PVC fittings', time: '02:30 PM', phone: '9876543001' },
    { id: 2, name: 'Garg Sanitation (Noida)', task: 'Collect payment checkout details', time: '04:15 PM', phone: '9876543011' },
    { id: 3, name: 'Modern Builders (Hyd)', task: 'Pitch new Sapphire range catalog', time: '06:00 PM', phone: '9876543021' }
  ];

  const recentCheckins = [
    { time: '11:15 AM', location: 'Garg Sanitation, Noida Sector 45', client: 'Lalit Garg' },
    { time: '09:45 AM', location: 'Apex Distributors, Delhi Okhla', client: 'Aman Verma' }
  ];

  const productsList = [
    { id: 1, name: 'High-Density PVC Pipe 1/2"', stock: 120, category: 'Pipes' },
    { id: 2, name: 'Brass Ball Valve 15mm', stock: 85, category: 'Valves' },
    { id: 3, name: 'Teflon Sealing Tape', stock: 500, category: 'Consumables' },
    { id: 4, name: 'Designer Faucet - Pillar Cock', stock: 40, category: 'Faucets' }
  ];

  const announcements = [
    { id: 1, date: 'Today', title: 'Q2 Performance Bonus Incentive', content: 'Supercharge your dealer network! Collect SFA orders exceeding ₹5,00,000 this month to qualify for the 5% travel bonus voucher.' },
    { id: 2, date: '07 Jun', title: 'SFA App V2 Release Notes', content: 'V2 coordinates real-time visit tracking. Check-in directly from the dealer store locations to authenticate site logs.' }
  ];

  const travelStops = [
    { stop: 1, time: '09:30 AM', task: 'Check-in: Apex Distributors', dist: 'Start' },
    { stop: 2, time: '11:00 AM', task: 'Visit: Garg Sanitation Store', dist: '14.2 km away' },
    { stop: 3, time: '02:30 PM', task: 'Visit: Metro Bath Gurgaon', dist: '18.4 km away' },
    { stop: 4, time: '04:15 PM', task: 'Visit: Sai Plumbing Depot', dist: '12.1 km away' }
  ];

  const handleClockToggle = () => {
    if (!isClockedIn) {
      setIsClockedIn(true);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setAttendanceLogs([
        { date: 'Today', checkIn: timeStr, checkOut: '--', status: 'Active' },
        ...attendanceLogs
      ]);
    } else {
      setIsClockedIn(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setAttendanceLogs(prev => {
        const copy = [...prev];
        if (copy[0] && copy[0].date === 'Today') {
          copy[0].checkOut = timeStr;
          copy[0].status = 'Present';
        }
        return copy;
      });
    }
  };

  // Render Modal overlays depending on active category
  const renderModalContent = () => {
    switch (activeModal) {
      // CUSTOMER NETWORK MODALS
      case 'distributors':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Directory of registered wholesale distributors.</p>
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {distributorsList.map((dist) => (
                <div key={dist.id} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-800">{dist.name}</span>
                      <span className="text-[9px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold">{dist.code}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">City: {dist.city} | Contact: {dist.contact}</p>
                    <p className="text-[10px] text-slate-400">Mob: {dist.phone}</p>
                  </div>
                  <a
                    href={`tel:${dist.phone}`}
                    className="p-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-600 border border-brand-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dealers':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Retail dealers in the sales network linked to distributors.</p>
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {dealerNetworkList.map((dlr) => (
                <div key={dlr.id} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-800">{dlr.name}</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold">{dlr.code}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">City: {dlr.city} | Mapping: {dlr.mapping}</p>
                    <p className="text-[10px] text-slate-400">Mob: {dlr.phone}</p>
                  </div>
                  <a
                    href={`tel:${dlr.phone}`}
                    className="p-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-600 border border-brand-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case 'direct_dealers':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Retail partners buying direct from corporate factory outlets.</p>
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {directDealersList.map((ddr) => (
                <div key={ddr.id} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-800">{ddr.name}</span>
                      <span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-bold">{ddr.code}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">City: {ddr.city} | Contact: {ddr.contact}</p>
                    <p className="text-[10px] text-slate-400">Mob: {ddr.phone}</p>
                  </div>
                  <a
                    href={`tel:${ddr.phone}`}
                    className="p-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-600 border border-brand-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      // SHORTCUT MODALS
      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="text-center bg-slate-50 border border-slate-100 rounded-xl p-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">Shift Check-in Status</span>
              <div className="flex items-center justify-center space-x-2">
                <span className={`w-3.5 h-3.5 rounded-full ${isClockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                <span className="text-lg font-bold text-slate-800">{isClockedIn ? 'Shift Logged (Active)' : 'Shift Logged Out'}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Log attendance to initiate daily customer visit routing logs.</p>

              <button
                onClick={handleClockToggle}
                className={`mt-4 px-6 py-2.5 rounded-lg text-xs font-bold text-white shadow-md transition-all duration-300 ${isClockedIn
                  ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/10'
                  : 'bg-brand-600 hover:bg-brand-500 shadow-brand-500/20'
                  }`}
              >
                {isClockedIn ? 'Check Out SFA Shift' : 'Check In SFA Shift'}
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Attendance History</h4>
              <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
                {attendanceLogs.map((log, index) => (
                  <div key={index} className="flex justify-between items-center text-xs p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                    <div>
                      <div className="font-semibold text-slate-800">{log.date}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">In: {log.checkIn} | Out: {log.checkOut}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${log.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-slate-50 text-slate-500 border border-slate-100'
                      }`}>{log.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'followup':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Actions needed with clients/outlets today.</p>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {followUps.map((client) => (
                <div key={client.id} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-slate-800">{client.name}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{client.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{client.task}</p>
                    <p className="text-[10px] text-slate-400">Mob: {client.phone}</p>
                  </div>
                  <a
                    href={`tel:${client.phone}`}
                    className="p-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-600 border border-brand-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case 'checkins':
        return (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500">Log customer location presence on SFA system.</p>
              <button
                onClick={() => alert('GPS Location logged successfully for dealer store visit!')}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-2 px-3.5 rounded-lg shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
              >
                Log Store Visit
              </button>
            </div>

            {/* Map Frame */}
            <div className="h-28 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#0f52ba_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="z-10 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-brand-500 border-2 border-white flex items-center justify-center animate-bounce shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-700 bg-white/95 px-2 py-0.5 rounded shadow mt-1 border border-slate-100">Dealer store GPS tracked</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">Recent Checked-in Visits</h4>
              <div className="space-y-2">
                {recentCheckins.map((check, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm flex items-start space-x-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">{check.client}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{check.location} • {check.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search plumbing products catalog..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/10"
              />
            </div>

            <div className="space-y-2.5 max-h-[240px] overflow-y-auto pr-1">
              {productsList.map((prod) => (
                <div key={prod.id} className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{prod.name}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide inline-block mt-1">{prod.category}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold block ${prod.stock < 100 ? 'text-amber-600' : 'text-slate-500'}`}>{prod.stock} units available</span>
                    <button
                      onClick={() => alert(`SFA request triggered for parts supply: ${prod.name}`)}
                      className="text-[10px] text-brand-600 hover:text-brand-500 font-bold focus:outline-none mt-1 hover:underline cursor-pointer"
                    >
                      Book Supply order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'announcements':
        return (
          <div className="space-y-4">
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {announcements.map((item) => (
                <div key={item.id} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-2">
                    <h5 className="text-xs font-bold text-slate-800">{item.title}</h5>
                    <span className="text-[9px] bg-brand-50 text-brand-600 px-2 py-0.5 rounded font-bold border border-brand-100">{item.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'travel':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Your optimized store-visit routes plan for today.</p>
            <div className="relative border-l border-slate-200 pl-4 ml-2.5 py-1.5 space-y-5">
              {travelStops.map((stop) => (
                <div key={stop.stop} className="relative">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[21.5px] top-0.5 w-3.5 h-3.5 rounded-full bg-brand-500 border-2 border-white flex items-center justify-center shadow-sm">
                    <span className="text-[7px] text-white font-bold leading-none">{stop.stop}</span>
                  </span>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-slate-800">{stop.task}</span>
                      <span className="text-[9px] text-slate-400">{stop.time}</span>
                    </div>
                    <p className="text-[10px] text-brand-600 font-medium mt-0.5">{stop.dist}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert('Opening directions route map...')}
              className="w-full mt-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Open Google Maps SFA Navigation Route</span>
            </button>
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Track and update your daily SFA client assignments.</p>
            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {tasksList.map((t) => (
                <label 
                  key={t.id} 
                  className={`p-3 bg-white border rounded-xl shadow-sm flex items-start space-x-3 cursor-pointer transition-all duration-200 ${
                    t.done ? 'border-slate-100 opacity-60' : 'border-slate-200 hover:border-brand-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTask(t.id)}
                    className="w-4.5 h-4.5 text-brand-600 border-slate-300 rounded focus:ring-brand-500/20 mt-0.5 cursor-pointer focus:outline-none"
                  />
                  <div className="flex-1">
                    <span className={`text-xs font-semibold block leading-tight ${t.done ? 'line-through text-slate-400 font-medium' : 'text-slate-800'}`}>
                      {t.text}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            <div className="bg-slate-50 p-3.5 border border-slate-100 rounded-xl flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Progress: {tasksList.filter(t => t.done).length} / {tasksList.length} done
              </span>
              <span className="text-[10px] bg-brand-50 text-brand-600 px-2 py-0.5 rounded font-bold border border-brand-100 uppercase">
                Daily Assignment
              </span>
            </div>
          </div>
        );

      case 'survey':
        return (
          <form onSubmit={handleSurveySubmit} className="space-y-4">
            <p className="text-xs text-slate-500">Submit local store stock and satisfaction feedback to HQ.</p>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Select Mapped Partner</label>
              <select
                required
                value={surveyFeedback.dealerName}
                onChange={(e) => setSurveyFeedback({ ...surveyFeedback, dealerName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/10 cursor-pointer"
              >
                <option value="">-- Choose Distributor/Dealer --</option>
                <option value="Apex Distributors">Apex Distributors</option>
                <option value="Garg Sanitation">Garg Sanitation & Tiles</option>
                <option value="Metro Bath & Hardware">Metro Bath & Hardware</option>
                <option value="Sai Plumbing House">Sai Plumbing House</option>
                <option value="Modern Builders">Modern Builders & Hardware</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Stock Level Satisfaction</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={surveyFeedback.satisfaction}
                  onChange={(e) => setSurveyFeedback({ ...surveyFeedback, satisfaction: e.target.value })}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <span className="text-xs font-bold text-slate-700 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded min-w-[32px] text-center">
                  {surveyFeedback.satisfaction}/10
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Remarks & Market Competitor Notes</label>
              <textarea
                rows="3"
                required
                placeholder="Enter stock deficits, competitor pricing, or remarks..."
                value={surveyFeedback.remarks}
                onChange={(e) => setSurveyFeedback({ ...surveyFeedback, remarks: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/10 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer focus:outline-none"
            >
              Submit Market Feedback Survey
            </button>
          </form>
        );

      case 'event':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Upcoming promotional meet plans and conclaves.</p>
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {eventsList.map((ev) => (
                <div key={ev.id} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-800 leading-tight block max-w-[200px]">{ev.title}</span>
                    <span className="text-[9px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-bold border border-indigo-100 shrink-0">
                      {ev.date}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 space-y-0.5">
                    <p>🕒 Time: {ev.time}</p>
                    <p>📍 Location: {ev.location}</p>
                    <p className="text-brand-600 font-semibold mt-1">👥 Target: {ev.attendees}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'expenses':
        return (
          <div className="space-y-5">
            {/* Logging Form */}
            <form onSubmit={handleAddExpense} className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3.5">
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Log Daily Allowance Claim</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/10 cursor-pointer"
                  >
                    <option value="Travel Allowance">Travel Allowance</option>
                    <option value="Food & Meal">Food & Meal</option>
                    <option value="Client Lodging">Client Lodging</option>
                    <option value="Stationery / Courier">Stationery / Courier</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Enter amount"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-2 px-4 rounded-lg shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer focus:outline-none"
              >
                Log SFA Expense Claim
              </button>
            </form>

            {/* Expenses List */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">Recent Claim Status</h4>
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {expensesList.map((exp) => (
                  <div key={exp.id} className="flex justify-between items-center text-xs p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                    <div>
                      <div className="font-semibold text-slate-800">{exp.category}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{exp.date}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-800 block">{exp.amount}</span>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold mt-1 uppercase ${
                        exp.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {exp.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      // customer networks
      case 'distributors': return 'Wholesale Distributors';
      case 'dealers': return 'Dealers Network';
      case 'direct_dealers': return 'Direct Dealers';
      // SFA actions
      case 'attendance': return 'SFA Shift Check-in';
      case 'followup': return 'SFA Follow-Up Actions';
      case 'checkins': return 'Store GPS Check-ins';
      case 'products': return 'Plumbing Parts & Products Catalog';
      case 'announcements': return 'SFA Bulletins & announcements';
      case 'travel': return 'Today\'s Routing Travel Plan';
      case 'tasks': return 'Daily SFA Task Assignments';
      case 'survey': return 'SFA Market Survey Form';
      case 'event': return 'SFA Dealer Event Calendar';
      case 'expenses': return 'SFA Travel & Daily Allowances';
      default: return '';
    }
  };

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`bg-slate-50 text-slate-800 min-h-screen p-4 sm:p-6 relative font-sans w-full pb-16 transition-all duration-300 ${
        activeModal ? 'overflow-hidden' : 'overflow-y-auto'
      }`}
    >

      {/* Background decorative grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Syncing/Refreshing Indicator Overlay */}
      <div 
        className="absolute left-0 right-0 flex justify-center pointer-events-none transition-all duration-300"
        style={{
          top: isRefreshing ? '24px' : `${pullDistance - 50}px`,
          opacity: isPulling || isRefreshing ? 1 : 0,
          zIndex: 40
        }}
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-full py-2 px-4 shadow-lg flex items-center space-x-2.5">
          {isRefreshing ? (
            <>
              {/* Sapphire animated spinner */}
              <svg className="animate-spin h-4 w-4 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-[10px] font-extrabold tracking-wider text-slate-700 uppercase">Syncing SFA Data...</span>
            </>
          ) : (
            <>
              {/* Pulling progression icon/arrow */}
              <svg 
                className="h-4 w-4 text-brand-500 transition-transform duration-200" 
                style={{ transform: `rotate(${pullDistance * 3.6}deg)` }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <span className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
                {pullDistance >= 90 ? 'Release to Sync' : 'Pull down to Sync'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Responsive Wrapper */}
      <div 
        className="max-w-[480px] mx-auto relative z-10 space-y-6"
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isPulling ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >

        {/* HEADER BAR */}
        <header className="flex justify-between items-center bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-4 shadow-sm animate-fade-in-down">
          <div className="flex items-center space-x-2.5">
            <div className="w-8.5 h-8.5 rounded-lg bg-brand-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4.5 w-4.5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.625c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.75v-5.625zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.625c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">Plumber SFA</span>
              <span className="text-[10px] text-slate-400 font-semibold">{formatPhoneDisplay(userPhone)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert('Notifications: Daily visits route synchronized.')}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg relative text-slate-500 focus:outline-none transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
            </button>

            <button
              onClick={handleLogoutClick}
              className="px-3 py-2 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-100 rounded-lg text-xs font-bold text-slate-600 hover:text-rose-600 transition-all duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* OUTLET AND SHELL CONTENT SCREEN */}
        <Outlet context={{ setActiveModal, isClockedIn }} />

      </div>

      {/* DETAILED MODAL DRAWER OVERLAY */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          {/* Modal Backdrop click */}
          <div className="absolute inset-0" onClick={() => setActiveModal(null)}></div>

          {/* Bottom Sheet Card */}
          <div className="w-full max-w-[480px] bg-white rounded-t-3xl p-6 shadow-2xl relative z-10 border-t border-slate-100 flex flex-col max-h-[90vh] overflow-hidden translate-y-0 transition-transform duration-300">

            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5 shrink-0">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{getModalTitle()}</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto pb-4 shrink-1">
              {renderModalContent()}
            </div>

          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in">
          {/* Backdrop click to close */}
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setShowLogoutConfirm(false)}></div>
          
          {/* Modal card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xl max-w-[340px] w-full text-center space-y-4 relative z-10 animate-fade-in">
            <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-slate-800">Confirm Logout</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Are you sure you want to end your current SFA session? Any unsaved check-in tracking logs will be finalized.</p>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow-md shadow-rose-500/10 transition-colors focus:outline-none cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Session Syncing Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-7 w-7 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.625c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.75v-5.625zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.625c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z" />
            </svg>
          </div>
          <div className="text-center space-y-1.5 animate-pulse">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Ending SFA Session</h3>
            <p className="text-[10px] text-slate-400 font-semibold">Syncing final visit records...</p>
          </div>
        </div>
      )}

      {/* Layered Minimalist SVG Wave Pattern in the background */}
      <div className="fixed bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[180px]">
          <path
            d="M0,60 C300,20 600,100 900,40 C1050,10 1150,30 1200,40 L1200,120 L0,120 Z"
            className="fill-brand-500/10"
          ></path>
          <path
            d="M0,40 C300,90 600,30 900,70 C1050,90 1150,70 1200,60 L1200,120 L0,120 Z"
            className="fill-brand-300/8"
          ></path>
        </svg>
      </div>

    </div>
  );
}
