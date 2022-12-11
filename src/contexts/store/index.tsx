import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { ReactNode } from 'react';
import type { DataType, User, UserRelations } from 'types';

import useUserSlice from './userSlice';

interface DataStoreContextState {
  users: {
    loading: boolean;
    error?: unknown;
    data: DataType<User & UserRelations>[];
    getOne(userId: number | string): Promise<DataType<User & UserRelations> | undefined>;
  };
}

const INITIAL_STATE = {
  users: {
    loading: false,
    error: undefined,
    data: [],
    getOne: async () => undefined,
  },
};

const DataStore = createContext<DataStoreContextState>(INITIAL_STATE);

export default function DataStoreProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<{ users: boolean }>({ users: false });
  const [errors, setErrors] = useState<{ users: unknown }>({ users: undefined });
  const [data, setData] = useState<{ users: DataType<User & UserRelations>[] }>({
    users: [],
  });

  const { getById } = useUserSlice();

  const getOne = useCallback(
    async (userId: number | string) => {
      setLoading(prev => ({ ...prev, users: true }));

      const { response, error } = await getById(userId);

      setLoading(prev => ({ ...prev, users: false }));
      setErrors(prev => ({ ...prev, users: error }));

      return response?.data.data;
    },
    [getById]
  );

  const value = useMemo(
    () => ({
      users: {
        loading: loading.users,
        error: errors.users,
        data: data.users,
        getOne,
      },
    }),
    [loading, errors, data, getOne]
  );

  return <DataStore.Provider value={value}>{children}</DataStore.Provider>;
}

export function useDataStore() {
  return useContext(DataStore);
}
