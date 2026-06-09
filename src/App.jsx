import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DashboardHome from './pages/DashboardHome';
import UserPage from './pages/UserPage';

function App() {
  useEffect(() => {
    const Capacitor = window.Capacitor;
    if (Capacitor && Capacitor.Plugins && Capacitor.Plugins.App) {
      const AppPlugin = Capacitor.Plugins.App;
      
      const listener = AppPlugin.addListener('backButton', (data) => {
        // Dispatch custom cancelable event on window to allow components to intercept
        const event = new CustomEvent('appBackButton', { 
          cancelable: true,
          detail: data 
        });
        
        const isDefaultPrevented = !window.dispatchEvent(event);
        
        if (!isDefaultPrevented) {
          // If no component intercepted the back event, proceed with default navigation
          if (window.history.length > 1) {
            window.history.back();
          } else {
            AppPlugin.exitApp();
          }
        }
      });

      return () => {
        listener.remove();
      };
    }
  }, []);

  return (
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
  );
}

export default App;
