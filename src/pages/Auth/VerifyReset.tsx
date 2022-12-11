import React from 'react';
// import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

// import { Form } from 'components';
import { useAuth } from 'contexts/auth';
// import { validators } from 'utils';

import Verify from './VerifyPage';

export default function VerifyReset() {
  // const [verified, setVerified] = useState<boolean>(false);
  // const [resetData, setResetData] = useState<{ email?: string; otp?: string }>({});

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   watch,
  // } = useForm<{ password: string; passwordMatch?: string }>();
  const navigate = useNavigate();
  const query = useParams();

  // const password = useRef({});
  // password.current = watch('password', '');

  const { verifyResetReq } = useAuth();

  const verify = async ({ email, otp }: { email: string; otp: string }) => {
    const verifyRequest = await verifyResetReq({
      email,
      otp,
    });

    if (verifyRequest) navigate(`/auth/${query.userId}/reset-password/${otp}`);
  };

  // const onSubmit = handleSubmit(async data => {
  //   if (!resetData.email || !resetData.otp || !data.password) return;

  //   const resetAttempt = await reset({
  //     email: resetData.email,
  //     otp: resetData.otp,
  //     password: data.password,
  //   });

  //   if (resetAttempt) navigate('/auth/login');
  // });

  return <Verify callback={verify} type='reset' />;

  // return (
  //   <Form.Base grid={{ cols: 6, gap: { x: 20, y: 20 } }} onSubmit={onSubmit}>
  //     <Form.Group span={{ col: 6 }} sm={{ col: 3 }}>
  //       <Form.Label htmlFor='password'>password</Form.Label>
  //       <Form.Input
  //         type='password'
  //         error={errors.password?.message}
  //         {...register('password', {
  //           required: 'Must include valid password',
  //           minLength: {
  //             value: 8,
  //             message: 'Password must be at least 8 characters long',
  //           },
  //           validate: {
  //             hasUpper: value =>
  //               validators.password.hasUpper.pattern.test(value) ||
  //               validators.password.hasUpper.message,
  //             hasLower: value =>
  //               validators.password.hasLower.pattern.test(value) ||
  //               validators.password.hasLower.message,
  //             hasNumber: value =>
  //               validators.password.hasNumber.pattern.test(value) ||
  //               validators.password.hasNumber.message,
  //             hasSpecial: value =>
  //               validators.password.hasSpecial.pattern.test(value) ||
  //               validators.password.hasSpecial.message,
  //           },
  //         })}
  //       />
  //       <Form.Error errors={errors} name='password' />
  //     </Form.Group>
  //     <Form.Group span={{ col: 6 }} sm={{ col: 3 }}>
  //       <Form.Label htmlFor='passwordMatch'>retype password</Form.Label>
  //       <Form.Input
  //         type='password'
  //         error={errors.passwordMatch?.message}
  //         {...register('passwordMatch', {
  //           required: 'Please confirm your password',
  //           validate: value => value === password.current || 'The passwords do not match',
  //         })}
  //       />
  //       <Form.Error errors={errors} name='passwordMatch' />
  //     </Form.Group>
  //   </Form.Base>
  // );
}
