import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { extendTheme } from "@chakra-ui/react";

// 2. Rozszerzanie motywu
const theme = extendTheme({
  fonts: {
    heading: "'Hind Madurai', sans-serif",
    body: "'Hind Madurai', sans-serif",
    // Możesz dodać więcej niestandardowych czcionek, jeśli potrzebujesz
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
