import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      grey: {
        100: "#d4d0e1",
        200: "#a9a0c3",
        300: "#7e71a5",
        400: "#534187",
        500: "#281269",
        600: "#200e54",
        700: "#180b3f",
        800: "#10072a",
        900: "#080415"
      },
      black: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000"
      },
      primary: {
        100: "#e5d8ff",
          200: "#cbb0ff",
          300: "#b089ff",
          400: "#9661ff",
          500: "#7c3aff",
          600: "#632ecc",
          700: "#4a2399",
          800: "#321766",
          900: "#190c33"

          
      },
      greenAccent: {
        100: "#feefd9",
        200: "#fde0b3",
        300: "#fcd08d",
        400: "#fbc167",
        500: "#fab141",
        600: "#c88e34",
        700: "#966a27",
        800: "#64471a",
        900: "#32230d"
      },
      redAccent: {
        100: "#d4d0e1",
        200: "#a9a0c3",
        300: "#7e71a5",
        400: "#534187",
        500: "#281269",
        600: "#200e54",
        700: "#180b3f",
        800: "#10072a",
        900: "#080415"
      },
      blueAccent: {
        100: "#e1e2fe",
        200: "#c3c6fd",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
      },
    }
    : {
      grey: {

        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
      },
      primary: {
        100: "#e8dcff",
        200: "#d1baff",
        300: "#ba97ff",
        400: "#a375ff",
        500: "#8c52ff",
        600: "#7042cc",
        700: "#543199",
        800: "#382166",
        900: "#1c1033"
      },
      greenAccent: {
        100: "#feefd9",
        200: "#fde0b3",
        300: "#fcd08d",
        400: "#fbc167",
        500: "#fab141",
        600: "#c88e34",
        700: "#966a27",
        800: "#64471a",
        900: "#32230d"
      },
      redAccent: {
        100: "#d4d0e1",
        200: "#a9a0c3",
        300: "#7e71a5",
        400: "#534187",
        500: "#281269",
        600: "#200e54",
        700: "#180b3f",
        800: "#10072a",
        900: "#080415"
      },
      blueAccent: {
        100: "#e1e2fe",
        200: "#c3c6fd",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
      },
    }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[500],
          },
        }
        : {
          // palette values for light mode
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#8c52ff",
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
