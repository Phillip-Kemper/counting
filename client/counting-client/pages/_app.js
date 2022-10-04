/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
import { ThemeProvider } from "@mui/material";
import { THEME } from "../resources/theme";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={THEME}>
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            background: ${THEME.palette.background}};
          }
        `}
      </style>
    </ThemeProvider>
  );
}

export default MyApp;
