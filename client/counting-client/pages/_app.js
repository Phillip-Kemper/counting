import { ThemeProvider } from "@mui/material";
import { THEME } from "../resources/theme";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={THEME}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
