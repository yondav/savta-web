import type { DataType } from './types.utility';

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  img?: string;
};

type UserRelations = {
  verified: boolean;
  otp?: DataType<Otp>[];
  posts?: number[];
  likedPosts?: number[];
  comments?: Comment[];
};

type Otp = {
  userId: number;
  type: 'verify' | 'reset';
  otp: string;
  expiration: Date;
};

export type { User, Otp, UserRelations };
