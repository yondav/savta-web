import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button, Cell, Container, Form, H2, P } from 'components';
import { useAuth } from 'contexts/auth';

import type { ChangeEvent, FormEvent } from 'react';
import type { DataType, Otp, User, UserRelations } from 'types';

export default function Verify({
  callback,
  type,
}: {
  callback(data: { email: string; otp: string }): Promise<void>;
  type: 'verify' | 'reset';
}) {
  const [user, setUser] = useState<DataType<User & UserRelations>>();
  const [otp, setOtp] = useState<DataType<Otp>>();
  const [otpChars, setOtpChars] = useState<string[]>([]);
  const [isVerifiable, setIsVerifiable] = useState<{ value: boolean; message: string }>({
    value: false,
    message: 'initial',
  });

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<{
    [index: string]: string;
  }>();

  const query = useParams();
  const { verifiable } = useAuth();

  useEffect(() => {
    const confirmVerifiable = async () => {
      if (!query.userId) return;

      const res = await verifiable(query.userId, type);

      setUser(res.user);
      setOtp(res.otp);
      setOtpChars(res.otp?.otp ? res.otp.otp.split('') : []);
      setIsVerifiable({ value: res.value, message: res.message });
    };

    confirmVerifiable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.userId]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      const [fieldIndex] = name.split('-');

      const index = Number(fieldIndex);

      // Check if no of char in field == maxlength
      if (value.length === 1) {
        // It should not be last input field
        if (index < otpChars.length - 1) {
          // Get the next input field using it's name
          const nextField = `${index + 1}-${otpChars[index + 1]}`;

          // If found, focus the next field
          if (nextField !== null) {
            setFocus(nextField);
          }
        }
      }
    },
    [otpChars, setFocus]
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(async data => {
      await callback({
        email: user?.email as string,
        otp: Object.values(data).join(''),
      });
    })(e).catch(err => console.error({ err }));
  };

  if (!isVerifiable.value || !otp || !user)
    return (
      <Container grid={{ cols: 6, gap: { x: 6 } }}>
        <Cell span={{ col: 6 }}>
          <H2 weight='semi' color='danger'>
            Verification Error
          </H2>
        </Cell>
        <Cell span={{ col: 6 }}>
          <P>
            Unable to verify account. {isVerifiable.message} Please reply to the
            verification email you received.
          </P>
        </Cell>
      </Container>
    );

  return (
    <Form.Base grid={{ cols: 6, gap: { x: 20, y: 20 } }} onSubmit={onSubmit}>
      <Form.Group span={{ col: 6 }}>
        <Form.Label htmlFor='otp'>one time password</Form.Label>
        <Container flex={{ gap: { y: 5 } }} tw='p-0'>
          {otp.otp.split('').map((char, i) => (
            <Form.Input
              key={`${char}-${Math.random()}`}
              error={errors[`${i}-${char}`]?.message}
              tw='max-w-[50px]'
              {...register(`${i}-${char}`, {
                required: 'All characters are required',
                validate: {
                  match: value => value === char,
                },
                onChange: handleChange,
              })}
            />
          ))}
        </Container>
      </Form.Group>
      <Form.Group span={{ col: 6 }}>
        <Button type='submit'>Verify</Button>
      </Form.Group>
    </Form.Base>
  );
}
