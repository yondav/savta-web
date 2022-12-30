import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Form, Span } from 'components';
import { useAuth } from 'contexts/firebase/auth';
import { validators } from 'utils';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async data => {
    await resetPassword(data);
    navigate('/auth/login');
  });

  return (
    <Form.Base grid={{ cols: 6, gap: { x: 20, y: 20 } }} onSubmit={onSubmit}>
      <Form.Group span={{ col: 6 }}>
        <Form.Label htmlFor='email'>email</Form.Label>
        <Form.Input
          error={errors.email?.message}
          {...register('email', {
            required: 'Valid Email is required',
            pattern: {
              value: validators.email.pattern,
              message: validators.email.message,
            },
          })}
        />
        <Form.Error errors={errors} name='email' />
      </Form.Group>
      <Form.Group span={{ col: 6 }}>
        <Button type='submit'>Request reset</Button>
        <Link to='/auth/login' tw='mt-1.5 flex justify-end'>
          <Span weight='semi' tw='text-xs' color='link'>
            Login
          </Span>
        </Link>
      </Form.Group>
    </Form.Base>
  );
}
