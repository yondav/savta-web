import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Form, Button, Span } from 'components';
import { useAuth } from 'contexts/firebase/auth';
import { validators } from 'utils';

export default function Signup() {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<
    {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    } & { passwordMatch?: string }
  >();
  const navigate = useNavigate();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = handleSubmit(async data => {
    const dataObj = data;
    delete dataObj.passwordMatch;
    await signUp(dataObj);

    navigate('/auth/login');
  });

  return (
    <Form.Base grid={{ cols: 6, gap: { x: 20, y: 20 } }} onSubmit={onSubmit}>
      <Form.Group span={{ col: 6 }} sm={{ col: 4 }}>
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
      <Form.Group span={{ col: 6 }} sm={{ col: 3 }}>
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
      <Form.Group span={{ col: 6 }} sm={{ col: 3 }}>
        <Form.Label htmlFor='passwordMatch'>retype password</Form.Label>
        <Form.Input
          type='password'
          error={errors.passwordMatch?.message}
          {...register('passwordMatch', {
            required: 'Please confirm your password',
            validate: value => value === password.current || 'The passwords do not match',
          })}
        />
        <Form.Error errors={errors} name='passwordMatch' />
      </Form.Group>
      <Form.Group span={{ col: 6 }} sm={{ col: 3 }}>
        <Form.Label htmlFor='firstName'>first name</Form.Label>
        <Form.Input
          error={errors.firstName?.message}
          {...register('firstName', { required: 'Please provide your first name' })}
        />
        <Form.Error errors={errors} name='firstName' />
      </Form.Group>
      <Form.Group span={{ col: 6 }} sm={{ col: 3 }}>
        <Form.Label htmlFor='lastName'>last name</Form.Label>
        <Form.Input
          error={errors.lastName?.message}
          {...register('lastName', { required: 'Please provide your last name' })}
        />
        <Form.Error errors={errors} name='lastName' />
      </Form.Group>
      <Form.Group span={{ col: 6 }}>
        <Button type='submit'>Create Account</Button>
        <Link to='/auth/login' tw='mt-1.5 flex justify-end'>
          <Span weight='semi' tw='text-xs' color='link'>
            Login
          </Span>
        </Link>
      </Form.Group>
    </Form.Base>
  );
}
