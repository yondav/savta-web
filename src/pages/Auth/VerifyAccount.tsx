import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/auth';

import Verify from './VerifyPage';

export default function VerifyAccount() {
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  const onSubmit = async ({ email, otp }: { email: string; otp: string }) => {
    await verifyEmail({
      email,
      otp,
    });

    navigate('/auth/login');
  };

  return <Verify callback={onSubmit} type='verify' />;
}
