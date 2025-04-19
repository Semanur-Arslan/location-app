"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/index";
import { CacheProvider } from "@emotion/react";
import { emotionCache } from "@/lib/emotion-cache";
import { Toaster } from "@/components/Toaster";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}
