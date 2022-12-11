import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import { useToast } from 'contexts/toast';
import useUserSlice from 'contexts/store/userSlice';
import { apiCall } from 'utils/utils.api';

import type { ReactNode } from 'react';
import type { DataType, Otp, User, UserRelations } from 'types';
import { toTitleCase } from 'utils/utils.textFormat';

interface AuthContextState {
  loading: boolean;
  error?: string;
  cookie?: string;
  user?: DataType<User & UserRelations>;
  logout(): Promise<void>;
  forgotPassword(data: { email: string }): Promise<void>;
  login(data: { email: string; password: string }): Promise<boolean>;
  signup(data: User): Promise<void>;
  reset(data: { email: string; otp: string; password: string }): Promise<boolean>;
  updateUser(
    userId: number,
    data: Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'img'>>
  ): Promise<boolean>;
  verifyEmail(data: { email: string; otp: string }): Promise<void>;
  verifyResetReq(data: { email: string; otp: string }): Promise<boolean>;
  verifiable(
    userId: string | number,
    type: 'verify' | 'reset'
  ): Promise<{
    value: boolean;
    message: string;
    user?: DataType<User & UserRelations>;
    otp?: DataType<Otp>;
  }>;
}

const INITIAL_STATE = {
  loading: false,
  error: undefined,
  cookie: undefined,
  user: undefined,
  forgotPassword: async () => undefined,
  login: async () => false,
  reset: async () => false,
  signup: async () => undefined,
  updateUser: async () => false,
  verifiable: async () => ({ value: false, message: 'initial' }),
  verifyEmail: async () => undefined,
  verifyResetReq: async () => false,
  logout: async () => undefined,
};

const AuthContext = createContext<AuthContextState>(INITIAL_STATE);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [flow, setFlow] = useState<{
    loading: boolean;
    errors?: string;
    cookie?: string;
    user?: DataType<User & UserRelations>;
  }>({ loading: false });

  const { toast } = useToast();
  const { getById } = useUserSlice();

  const checkCookie = useCallback(() => {
    setFlow(prev => ({ ...prev, cookie: Cookies.get('cookbook-auth') }));
  }, []);

  const forgotPassword = useCallback(
    async (data: { email: string }) => {
      setFlow(prev => ({ ...prev, loading: true }));
      const { response, error } = await apiCall({ url: 'forgot', method: 'POST', data });
      setFlow(prev => ({
        ...prev,
        errors: error?.response?.data.message,
        loading: false,
      }));

      if (response?.data) toast(response.data.message);
    },
    [toast]
  );

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      setFlow(prev => ({ ...prev, loading: true }));
      const { response, error } = await apiCall<DataType<User & UserRelations>, 1>({
        url: 'login',
        method: 'POST',
        data,
        withCredentials: true,
      });
      setFlow(prev => ({
        ...prev,
        errors: error?.response?.data.message,
        user: response?.data.data,
        loading: false,
      }));
      checkCookie();

      return !error;
    },

    [checkCookie]
  );

  const logout = useCallback(async () => {
    const { response, error } = await apiCall({
      url: 'logout',
      method: 'POST',
      withCredentials: true,
      headers: { Authorization: `Bearer ${flow.cookie}` },
    });
    setFlow(prev => ({ ...prev, errors: error?.response?.data.message }));

    if (response?.data) Cookies.remove('cookbook-auth');

    checkCookie();
  }, [checkCookie, flow.cookie]);

  const reset = useCallback(
    async (data: { email: string; otp: string; password: string }) => {
      setFlow(prev => ({ ...prev, loading: true }));
      const { response, error } = await apiCall({ url: 'reset', method: 'POST', data });

      setFlow(prev => ({
        ...prev,
        errors: error?.response?.data.message,
        loading: false,
      }));

      if (response?.data) toast(response.data.message);

      return !error;
    },
    [toast]
  );

  const signup = useCallback(
    async (data: Omit<User, 'verified' | 'createdAt' | 'updatedAt'>) => {
      setFlow(prev => ({ ...prev, loading: true }));
      const { response, error } = await apiCall<DataType<User>, 1>({
        url: 'signup',
        method: 'POST',
        data,
      });
      setFlow(prev => ({
        ...prev,
        errors: error?.response?.data.message,
        loading: false,
      }));

      if (response?.data) toast(response.data.message);
    },
    [toast]
  );

  const updateUser = useCallback(
    async (
      userId: number,
      data: Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'img'>>
    ) => {
      setFlow(prev => ({ ...prev, loading: true }));
      const { response, error } = await apiCall<DataType<User & UserRelations>, 1>({
        url: `users/${userId}`,
        method: 'PUT',
        data,
        withCredentials: true,
        headers: { Authorization: `Bearer ${flow.cookie}` },
      });
      setFlow(prev => ({
        ...prev,
        loading: false,
        errors: error?.response?.data.message,
        user: response?.data.data,
      }));

      if (response?.data) toast(response.data.message);

      return !error;
    },
    [flow.cookie, toast]
  );

  const verifiable = useCallback(
    async (userId: string | number, type: 'verify' | 'reset') => {
      const { response, error } = await getById(userId);
      setFlow(prev => ({
        ...prev,
        errors: error?.response?.data.message,
      }));

      const userById = response?.data.data;
      const otp = response?.data.data.otp?.sort((a, b) => a.id - b.id)[
        response.data.data.otp.length - 1
      ];

      if (!userById) return { value: false, message: 'Unable to find valid user.' };
      if (!otp) return { value: false, message: 'Unable to fine one time password.' };
      if (otp.type !== type)
        return {
          value: false,
          message: 'Verification code provided is meant for password reset.',
        };
      if (new Date(otp.expiration).getTime() < new Date().getTime())
        return { value: false, message: 'Verification is expired.' };

      return { value: true, message: 'verifiable', user: userById, otp };
    },
    [getById]
  );

  const verifyEmail = useCallback(
    async (data: { email: string; otp: string }) => {
      setFlow(prev => ({ ...prev, loading: true }));
      const { response, error } = await apiCall({ url: 'verify', method: 'POST', data });
      setFlow(prev => ({
        ...prev,
        errors: error?.response?.data.message,
        loading: false,
      }));
      if (response && response.data.message.includes('successfully verified')) {
        toast(response.data.message);
      }
    },
    [toast]
  );

  const verifyResetReq = useCallback(
    async (data: { email: string; otp: string }) => {
      setFlow(prev => ({ ...prev, loading: true }));
      const { response, error } = await apiCall({
        url: 'verify-reset',
        method: 'POST',
        data,
      });
      setFlow(prev => ({
        ...prev,
        errors: error?.response?.data.message,
        loading: false,
      }));
      if (response && response.data.message.includes('successfully verified')) {
        toast(response.data.message);
      }
      return !error;
    },
    [toast]
  );

  useEffect(() => {
    if (!flow.user) checkCookie();
    if (!flow.cookie) setFlow(prev => ({ ...prev, user: undefined }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow.cookie]);

  useEffect(() => {
    if (flow.cookie && flow.user && !flow.errors)
      toast(`Welcome back, ${toTitleCase(flow.user.firstName)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow.cookie, flow.errors, flow.user]);

  useEffect(() => {
    if (flow.errors) {
      toast(flow.errors, 'danger');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow.errors]);

  useEffect(() => {
    const getUser = async () => {
      if (!flow.cookie || flow.user) return;

      const decoded: { id: number; exp: number; iat: number } = jwtDecode(flow.cookie);
      if (new Date(decoded.exp).getTime() < new Date().getTime() / 1000)
        Cookies.remove('cookbook-auth');

      if (decoded.id) {
        const { response, error } = await getById(decoded.id);
        setFlow(prev => ({
          ...prev,
          errors: error ? 'Unable to find user' : undefined,
          user: response?.data.data,
        }));
      }
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow.cookie, flow.user]);

  const value: AuthContextState = useMemo(
    () => ({
      loading: flow.loading,
      error: flow.errors,
      cookie: flow.cookie,
      user: flow.user,
      forgotPassword,
      login,
      logout,
      reset,
      signup,
      updateUser,
      verifiable,
      verifyEmail,
      verifyResetReq,
    }),
    [
      flow.cookie,
      flow.errors,
      flow.loading,
      flow.user,
      forgotPassword,
      login,
      logout,
      reset,
      signup,
      updateUser,
      verifiable,
      verifyEmail,
      verifyResetReq,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
