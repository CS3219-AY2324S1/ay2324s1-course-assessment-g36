import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import RouteGuard from "@/components/RouteGuard/RouteGuard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </ChakraProvider>
  );
}

export default MyApp;
