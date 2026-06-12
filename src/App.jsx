import React, { useEffect, useState, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DashboardHome from './pages/DashboardHome';
import UserPage from './pages/UserPage';

import { Capacitor } from '@capacitor/core';
import { App as AppPlugin } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';

function App() {
  const lastBackPressRef = useRef(0);
  const [showExitToast, setShowExitToast] = useState(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // Set status bar text/icons to dark (black) for visibility on light background
      StatusBar.setStyle({ style: Style.Light }).catch(err => console.error(err));

      let listenerHandle = null;
      const listenerPromise = AppPlugin.addListener('backButton', (data) => {
        // Dispatch custom cancelable event on window to allow components to intercept
        const event = new CustomEvent('appBackButton', { 
          cancelable: true,
          detail: data 
        });
        
        const isDefaultPrevented = !window.dispatchEvent(event);
        
        if (!isDefaultPrevented) {
          const hash = window.location.hash.replace(/^#/, '');
          const cleanPath = hash.split('?')[0];
          
          if (cleanPath === '/dashboard') {
            const now = Date.now();
            if (now - lastBackPressRef.current < 2000) {
              AppPlugin.exitApp();
            } else {
              lastBackPressRef.current = now;
              setShowExitToast(true);
              setTimeout(() => {
                setShowExitToast(false);
              }, 2000);
            }
          } else if (cleanPath === '/login' || cleanPath === '/' || !cleanPath) {
            AppPlugin.exitApp();
          } else {
            window.history.back();
          }
        }
      });

      listenerPromise.then(handle => {
        listenerHandle = handle;
      });

      return () => {
        if (listenerHandle) {
          listenerHandle.remove();
        } else {
          listenerPromise.then(handle => handle.remove());
        }
      };
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<DashboardHome />} />
            <Route path="user" element={<UserPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>

      {showExitToast && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-slate-900/95 text-white text-[11px] font-bold py-2 px-3.5 rounded-full shadow-xl border border-slate-800 animate-fade-in whitespace-nowrap">
            Press back again to exit
          </div>
        </div>
      )}
    </>
  );
}

export default App;
