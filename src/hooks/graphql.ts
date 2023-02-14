import useSWR from 'swr';
import { apiEmail } from '../lib/axios';

const fetcher = (query: any) => apiEmail.post("/tokentest", { query })
  .then(res => res.data)

export const useQuery = (query: string) => {
  return useSWR(query, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

}

export const useQueryReceived = (query: string) => {
  return useSWR(query, fetcher, {
    // refreshInterval: 15000 // 15 seconds
  })

}