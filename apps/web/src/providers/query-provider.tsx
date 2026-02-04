import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient();
function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={query}>{children}</QueryClientProvider>
    </>
  );
}

export default QueryProvider;
