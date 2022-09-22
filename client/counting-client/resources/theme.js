import { createTheme } from "@mui/material/styles";

export const RED = "#DB271B";

export const THEME = createTheme({
  typography: {
    fontFamily: `"Acme", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    allVariants: {
      color: RED,
    },
  },

  palette: {
    background: "#BFCAEE",
    //backgroundColor: "#BFCAEE",
  },
});
