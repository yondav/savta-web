import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import ToastProvider from 'contexts/toast';
import { Layout, Home, Auth } from 'pages';
import AuthProvider from 'contexts/firebase/auth';

function App() {
  const location = useLocation();
  return (
    <ToastProvider>
      <AuthProvider>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='auth/' element={<Auth.Layout />}>
              <Route path='signup' element={<Auth.Signup />} />
              <Route path='login' element={<Auth.Login />} />
              <Route path='forgot-password' element={<Auth.ForgotPassword />} />
              <Route path=':userId' element={<Outlet />}>
                <Route path='dashboard' element={<Auth.Dashboard />} />
              </Route>
            </Route>
            <Route path='/:userId' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='*' element={<div>404</div>} />
            </Route>
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
