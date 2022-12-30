import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useMemo,
  useCallback,
} from 'react';

import type { ReactNode } from 'react';

import type { User } from 'types/types.user';
import { useToast } from 'contexts/toast';
import FirebaseAuthTasks from './tasks/auth';

interface AuthContextState {
  loading: boolean;
  user?: User;
  authenticated: boolean;
  resetPassword(data: { email: string }): Promise<void>;
  signIn(data: { email: string; password: string }): Promise<void>;
  signOut(): Promise<void>;
  signUp(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<void>;
  updateUser(data: { data: Partial<User> }): Promise<void>;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // const navigate = useNavigate();
  const { toast } = useToast();

  const Auth = useMemo(() => new FirebaseAuthTasks({ coll: 'users' }), []);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const checkAuth = async () => {
        setLoading(true);

        try {
          const currUser = await Auth.checkAuth();
          if (currUser) {
            setUser(currUser);
            setAuthenticated(true);
          }
        } catch (err) {
          setAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }

    return () => {
      ignore = true;
    };
  }, [Auth]);

  const resetPassword: AuthContextState['resetPassword'] = useCallback(
    async payload => {
      setLoading(true);

      const { message, error } = await Auth.resetPassword(payload);

      toast(message, error ? 'danger' : 'primary');

      setLoading(false);
    },
    [Auth, toast]
  );

  const signIn: AuthContextState['signIn'] = useCallback(
    async payload => {
      setLoading(true);

      const { data, message, error } = await Auth.signIn(payload);

      toast(message, error ? 'danger' : 'primary');

      if (data) {
        setUser(data);
        setAuthenticated(true);
      }

      setLoading(false);
    },
    [Auth, toast]
  );

  const signOut: AuthContextState['signOut'] = useCallback(async () => {
    setLoading(true);

    const { message, error } = await Auth.signOut();

    toast(message, error ? 'danger' : 'primary');

    if (!error) {
      setUser(undefined);
      setAuthenticated(false);
    }

    setLoading(false);
  }, [Auth, toast]);

  const signUp: AuthContextState['signUp'] = useCallback(
    async payload => {
      setLoading(true);

      const { message, error } = await Auth.signUp(payload);

      toast(message, error ? 'danger' : 'primary');

      setLoading(false);
    },
    [Auth, toast]
  );

  const updateUser: AuthContextState['updateUser'] = useCallback(
    async payload => {
      setLoading(true);

      const { message, error, data } = await Auth.updateUser(payload);

      toast(message, error ? 'danger' : 'primary');

      if (data) setUser(data);
      setLoading(false);
    },
    [Auth, toast]
  );

  const values = useMemo(
    () => ({
      authenticated,
      loading,
      user,
      resetPassword,
      signIn,
      signOut,
      signUp,
      updateUser,
    }),
    [authenticated, loading, user, resetPassword, signIn, signOut, signUp, updateUser]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
