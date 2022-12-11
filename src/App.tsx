import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import ToastProvider from 'contexts/toast';
import { Layout, Home, Auth } from 'pages';
import AuthProvider from 'contexts/auth';
import DataStoreProvider from 'contexts/store';

// cookbook-auth
function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <DataStoreProvider>
          <Routes>
            <Route path='auth/' element={<Auth.Layout />}>
              <Route path='signup' element={<Auth.Signup />} />
              <Route path='login' element={<Auth.Login />} />
              <Route path='forgot-password' element={<Auth.ForgotPassword />} />
              <Route path=':userId' element={<Outlet />}>
                <Route path='verify-account' element={<Auth.VerifyAccount />} />
                <Route path='verify-reset' element={<Auth.VerifyReset />} />
                <Route path='reset-password/:otp' element={<Auth.Reset />} />
                <Route path='dashboard' element={<Auth.Dashboard />} />
              </Route>
            </Route>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='*' element={<div>404</div>} />
            </Route>
          </Routes>
        </DataStoreProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
