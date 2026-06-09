import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userPhone = location.state?.phone || '';

  const [activeModal, setActiveModal] = useState(null); // null | SFA category id / shortcut id
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [attendanceLogs, setAttendanceLogs] = useState([
    { date: 'Yesterday', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present' },
    { date: '08 Jun 2026', checkIn: '08:55 AM', checkOut: '06:05 PM', status: 'Present' }
  ]);

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

  const handleLogout = () => {
    navigate('/login');
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
      default: return '';
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen p-4 sm:p-6 relative font-sans w-full pb-16 overflow-y-auto">

      {/* Background decorative grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Main Responsive Wrapper */}
      <div className="max-w-[480px] mx-auto relative z-10 space-y-6">

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
              onClick={handleLogout}
              className="px-3 py-2 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-100 rounded-lg text-xs font-bold text-slate-600 hover:text-rose-600 transition-all duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

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
            <h3 className="text-xs font-extrabold text-black-400 uppercase tracking-wider">SFA Daily Working Summary</h3>
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

        {/* CUSTOMER NETWORK SECTION - distributors, dealer network, direct dealers */}
        <section className="space-y-3 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-extrabold text-black-400 uppercase tracking-wider">Customer Network</h3>
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
            <h3 className="text-xs font-extrabold text-black-400 uppercase tracking-wider">Shortcuts</h3>
            <p className="text-[10px] text-black-400 mt-0.5">Quick shortcuts to execute visit actions</p>
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
