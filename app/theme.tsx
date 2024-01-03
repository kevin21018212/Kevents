import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ba3c42",
      dark: "#99222a",
      light: "#d7565a",
    },
    secondary: {
      main: "#0093e2",
      light: "#008cdf",
    },
    text: {
      primary: "#12281c",
      secondary: "#183a2a",
    },
    background: {
      default: "#d3d2ce",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          border: 0,
          borderRadius: 3,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          color: "white",
          height: 48,
          padding: "0 30px",
        },
      },
    },
  },
});
