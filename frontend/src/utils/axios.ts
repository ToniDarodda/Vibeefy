import axios, { AxiosInstance } from 'axios';

export const Fetch: AxiosInstance = axios.create({
  baseURL: 'https://api.vibeefy.net', // User Backend
  timeout: 5000,
  timeoutErrorMessage:
    'Request timeout there is maybe a problem with the server!',
  withCredentials: true,
});

export const FetchScrawler: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3003', // Python Backend
  timeout: 5000,
  timeoutErrorMessage:
    'Request timeout there is maybe a problem with the server!',
  withCredentials: true,
});

export const FetchS3: AxiosInstance = axios.create({
  baseURL: 'https://api.vibeefy.net', // S3 Backend
  timeout: 5000,
  timeoutErrorMessage:
    'Request timeout there is maybe a problem with the server!',
  withCredentials: true,
});
