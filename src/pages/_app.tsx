import { Provider } from "@/components/ui/provider";
import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import type { AppProps } from "next/app";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return <Provider>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </Provider>;

}