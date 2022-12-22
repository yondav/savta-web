import React, { createRef, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Form, Container, Cell, Span, Uploader } from 'components';
import { useAuth } from 'contexts/auth';
import { validators } from 'utils';

import type { DataType, User, UserRelations } from 'types';

export default function Write({ user }: { user: DataType<User & UserRelations> }) {
  const imageRef = createRef<HTMLInputElement>();
  const [img, setImg] = useState<string | undefined>(user.img);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; firstName: string; lastName: string }>();
  const navigate = useNavigate();

  const { updateUser } = useAuth();

  const uploadAssignment = useCallback((image: string) => {
    setImg(image);
  }, []);

  useEffect(() => console.log({ img }), [img]);

  const onSubmit = handleSubmit(async data => {
    const dataObj: typeof data & { img?: string } = { ...data, img };
    const update = await updateUser(user.id, dataObj);

    if (update) navigate(`/auth/${user.id}/dashboard`);
  });

  return (
    <Form.Base grid={{ cols: 6, gap: { x: 20, y: 20 } }} onSubmit={onSubmit}>
      <Container
        as={Cell}
        span={{ col: 6 }}
        flex={{
          column: false,
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: { y: 5 },
        }}
      >
        <Link to='/auth/forgot-password'>
          <Span color='link'>Change Password</Span>
        </Link>
        <Span>&#8226;</Span>
        <Span as='button' type='submit' color='link'>
          Save
        </Span>
      </Container>
      <Form.Group span={{ col: 6 }} sm={{ col: 3 }} md={{ col: 2 }}>
        <Container tw='max-w-[300px] w-full'>
          <Form.Label htmlFor='img'>profile image</Form.Label>
          <Uploader.Single
            ref={imageRef}
            assignment={uploadAssignment}
            currImg={{ src: user.img, alt: `${user.firstName} ${user.lastName}` }}
          />
        </Container>
      </Form.Group>
      <Form.Group span={{ col: 6 }} sm={{ col: 3 }} md={{ col: 4 }}>
        <Container grid={{ cols: 2, gap: { x: 20, y: 20 } }}>
          <Form.Group span={{ col: 2 }}>
            <Form.Label htmlFor='email'>email</Form.Label>
            <Form.Input
              defaultValue={user.email}
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
          <Form.Group span={{ col: 2 }} lg={{ col: 1 }}>
            <Form.Label htmlFor='firstName'>first name</Form.Label>
            <Form.Input
              defaultValue={user.firstName}
              error={errors.firstName?.message}
              {...register('firstName', { required: 'Please provide your first name' })}
            />
            <Form.Error errors={errors} name='firstName' />
          </Form.Group>
          <Form.Group span={{ col: 2 }} lg={{ col: 1 }}>
            <Form.Label htmlFor='lastName'>last name</Form.Label>
            <Form.Input
              defaultValue={user.lastName}
              error={errors.lastName?.message}
              {...register('lastName', { required: 'Please provide your last name' })}
            />
            <Form.Error errors={errors} name='lastName' />
          </Form.Group>
        </Container>
      </Form.Group>
    </Form.Base>
  );
}
