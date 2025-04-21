"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/index";
import { CacheProvider } from "@emotion/react";
import { emotionCache } from "@/lib/emotion-cache";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "@/lib/theme";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer />
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={theme}>
          <ThemeToggleButton />
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
