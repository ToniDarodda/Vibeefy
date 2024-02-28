import axios, { AxiosInstance } from 'axios';

export const Fetch: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 5000,
  timeoutErrorMessage:
    'Request timeout there is maybe a problem with the server!',
  withCredentials: true,
});
