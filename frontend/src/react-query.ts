import { QueryClient } from "@tanstack/react-query";

// Create a React Query Client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 2,
      // How long data is cached (default: 5 minutes)
      //   cacheTime: 1000 * 60 * 5,
      // The time between retries in case of failure (default: 3 retries)
      retry: 1,
      // How long to wait before a query is considered stale (default: 0 ms)
      staleTime: 1000 * 60 * 2,
      // Refetch queries automatically on window focus (default: true)
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
