import axios from 'axios';

import type { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import type { ApiResponse } from 'types';

// const API: AxiosInstance = axios.create({ baseURL: process.env.API_ORIGIN });

// API.defaults.headers['Content-Type'] = 'application/json';
// API.defaults.method = 'GET';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Access-Control-Allow-Credentials'] = true;
axios.defaults.method = 'GET';
axios.defaults.baseURL = process.env.API_ORIGIN;
axios.defaults.withCredentials = true;

async function apiCall<T, C extends number | void = void>(
  config: AxiosRequestConfig
): Promise<{
  response?: AxiosResponse<
    C extends void ? ApiResponse<T[]> : ApiResponse<T>,
    AxiosRequestConfig
  >;
  error?: AxiosError<{ message: string }>;
}> {
  try {
    const result = await axios.request(config);

    return { response: result };
  } catch (err) {
    return { error: err as AxiosError<{ message: string }> };
  }
}

export { apiCall };

// export default API;
