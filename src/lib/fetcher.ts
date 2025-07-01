import { apiClient } from './api-client';

type FetchParams = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  params?: Record<string, any>;
};

export async function fetcher<T>({ url, method = 'GET', data, params }: FetchParams): Promise<T> {
  const response = await apiClient.request<T>({
    url,
    method,
    data,
    params,
  });

  return response.data;
}
