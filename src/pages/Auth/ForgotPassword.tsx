import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Form } from 'components';
import { useAuth } from 'contexts/auth';
import { validators } from 'utils';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = handleSubmit(async data => {
    await forgotPassword(data);
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
      </Form.Group>
    </Form.Base>
  );
}
