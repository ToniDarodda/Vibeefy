import axios, { AxiosInstance } from 'axios';

export const Fetch: AxiosInstance = axios.create({
  baseURL:
    'https://760f-2603-8000-aaf0-7900-7cec-2d0d-559c-834b.ngrok-free.app',
  timeout: 5000,
  timeoutErrorMessage:
    'Request timeout there is maybe a problem with the server!',
  withCredentials: true,
});

export const FetchScrawler: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 5000,
  timeoutErrorMessage:
    'Request timeout there is maybe a problem with the server!',
  withCredentials: true,
});

export const FetchS3: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 5000,
  timeoutErrorMessage:
    'Request timeout there is maybe a problem with the server!',
  withCredentials: true,
});
