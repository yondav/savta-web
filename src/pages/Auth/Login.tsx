import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, Container, Form, Span } from 'components';
import { useAuth } from 'contexts/firebase/auth';
import { validators } from 'utils';

export default function Login() {
  const { signIn, authenticated } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const onSubmit = handleSubmit(async data => {
    await signIn(data);
  });

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

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
        <Form.Label htmlFor='password'>password</Form.Label>
        <Form.Input
          type='password'
          error={errors.password?.message}
          {...register('password', {
            required: 'Must include valid password',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            validate: {
              hasUpper: value =>
                validators.password.hasUpper.pattern.test(value) ||
                validators.password.hasUpper.message,
              hasLower: value =>
                validators.password.hasLower.pattern.test(value) ||
                validators.password.hasLower.message,
              hasNumber: value =>
                validators.password.hasNumber.pattern.test(value) ||
                validators.password.hasNumber.message,
              hasSpecial: value =>
                validators.password.hasSpecial.pattern.test(value) ||
                validators.password.hasSpecial.message,
            },
          })}
        />
        <Form.Error errors={errors} name='password' />
      </Form.Group>
      <Form.Group span={{ col: 6 }}>
        <Button type='submit'>Login</Button>
        <Container
          flex={{ justifyContent: 'flex-end', alignItems: 'center', gap: { y: 5 } }}
        >
          <Link to='/auth/signup'>
            <Span weight='semi' tw='text-xs' color='link'>
              Create account
            </Span>
          </Link>
          <Span>&#8226;</Span>
          <Link to='/auth/forgot-password'>
            <Span weight='semi' tw='text-xs' color='link'>
              Forgot password
            </Span>
          </Link>
        </Container>
      </Form.Group>
    </Form.Base>
  );
}
