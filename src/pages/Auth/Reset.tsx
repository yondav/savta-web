import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Form } from 'components';
import { useAuth } from 'contexts/auth';
import { useDataStore } from 'contexts/store';
import { useToast } from 'contexts/toast';
import { validators } from 'utils';

export default function Reset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ password: string; passwordMatch?: string }>();

  const navigate = useNavigate();
  const query = useParams();

  const password = useRef({});
  password.current = watch('password', '');

  const {
    users: { getOne },
  } = useDataStore();
  const { reset } = useAuth();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async data => {
    const { userId, otp } = query;
    if (!userId) return toast('Unable to locate user - no id provided', 'danger');
    if (!otp) return toast('Unable to locate verification code', 'danger');

    const user = await getOne(userId);
    if (!user) return toast('Unable to locate user - invalid id provided', 'danger');

    const resetAttempt = await reset({
      email: user.email,
      otp,
      password: data.password,
    });

    if (resetAttempt) navigate('/auth/login');
  });

  return (
    <Form.Base grid={{ cols: 6, gap: { x: 20, y: 20 } }} onSubmit={onSubmit}>
      <Form.Group span={{ col: 6 }}>
        <Form.Label htmlFor='password'>new password</Form.Label>
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
      <Form.Group span={{ col: 6 }}>
        <Button type='submit'>Verify</Button>
      </Form.Group>
    </Form.Base>
  );
}
