import { useCallback } from 'react';

import { apiCall } from 'utils/utils.api';

import type { DataType, User, UserRelations } from 'types';

export default function useUserSlice() {
  const getById = useCallback(async (userId: number | string) => {
    const { response, error } = await apiCall<DataType<User & UserRelations>, 1>({
      url: `/users/${userId}`,
    });

    return { response, error };
  }, []);

  return { getById };
}
