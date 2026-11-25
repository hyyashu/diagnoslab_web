import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

export interface CreateApiClientOptions {
  baseURL?: string;
  getAuthToken?: () => string | null | undefined;
}

export function createApiClient(options: CreateApiClientOptions = {}): AxiosInstance {
  const instance = axios.create({
    baseURL: options.baseURL ?? 'https://api.diagnoslab.in',
    headers: { 'Content-Type': 'application/json' },
  });
  if (options.getAuthToken) {
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = options.getAuthToken!();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
  return instance;
}
