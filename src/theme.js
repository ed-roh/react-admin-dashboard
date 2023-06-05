import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export

// primary: {
//     100: "#d7e2e3",
//     200: "#afc6c8",
//     300: "#86a9ac",
//     400: "#5e8d91",
//     500: "#367075",
//     600: "#2b5a5e",
//     700: "#204346",
//     800: "#162d2f",
//     900: "#0b1617"
// },

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? //  {
      //     grey: {
      //       100: "#e0e0e0",
      //       200: "#c2c2c2",
      //       300: "#a3a3a3",
      //       400: "#858585",
      //       500: "#666666",
      //       600: "#525252",
      //       700: "#3d3d3d",
      //       800: "#292929",
      //       900: "#141414",
      //     },
      //     primary: {
      //       100: "#d0d1d5",
      //       200: "#a1a4ab",
      //       300: "#727681",
      //       400: "#1F2A40",
      //       500: "#367075",
      //       600: "#101624",
      //       700: "#0c101b",
      //       800: "#080b12",
      //       900: "#040509",
      //     },
      //     greenAccent: {
      //       100: "#dbf5ee",
      //       200: "#b7ebde",
      //       300: "#94e2cd",
      //       400: "#70d8bd",
      //       500: "#4cceac",
      //       600: "#3da58a",
      //       700: "#2e7c67",
      //       800: "#1e5245",
      //       900: "#0f2922",
      //     },
      //     redAccent: {
      //       100: "#f8dcdb",
      //       200: "#f1b9b7",
      //       300: "#e99592",
      //       400: "#e2726e",
      //       500: "#db4f4a",
      //       600: "#af3f3b",
      //       700: "#832f2c",
      //       800: "#58201e",
      //       900: "#2c100f",
      //     },
      //     blueAccent: {
      //       100: "#e1e2fe",
      //       200: "#c3c6fd",
      //       300: "#a4a9fc",
      //       400: "#868dfb",
      //       500: "#6870fa",
      //       600: "#535ac8",
      //       700: "#3e4396",
      //       800: "#2a2d64",
      //       900: "#151632",
      //     },
      //   }

      {
        grey: {
          100: "#d8dbdd",
          200: "#b0b6bb",
          300: "#899299",
          400: "#616d77",
          500: "#3a4955",
          600: "#2e3a44",
          700: "#232c33",
          800: "#171d22",
          900: "#0c0f11",
        },
        primary: {
          100: "#ccd6de",
          200: "#99aebd",
          300: "#66859b",
          400: "#335d7a",
          500: "#003459",
          600: "#002a47",
          700: "#001f35",
          800: "#001524",
          900: "#000a12",
        },
        greenAccent: {
          100: "#e8eee4",
          200: "#d0ddc9",
          300: "#b9ccaf",
          400: "#a1bb94",
          500: "#8aaa79",
          600: "#6e8861",
          700: "#536649",
          800: "#374430",
          900: "#1c2218",
        },
        redAccent: {
          100: "#f8f9fd",
          200: "#f0f2fc",
          300: "#e9ecfa",
          400: "#e1e5f9",
          500: "#dadff7",
          600: "#aeb2c6",
          700: "#838694",
          800: "#575963",
          900: "#2c2d31",
        },
        blueAccent: {
          100: "#f0f0f3",
          200: "#e1e0e7",
          300: "#d3d1da",
          400: "#c4c1ce",
          500: "#b5b2c2",
          600: "#918e9b",
          700: "#6d6b74",
          800: "#48474e",
          900: "#242427",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#e6e3e1",
          200: "#cdc8c3",
          300: "#b5aca5",
          400: "#9c9187",
          500: "#837569",
          600: "#695e54",
          700: "#4f463f",
          800: "#342f2a",
          900: "#1a1715",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },

        blueAccent: {
          100: "#cce5ed",
          200: "#99cbdc",
          300: "#66b2ca",
          400: "#3398b9",
          500: "#007ea7",
          600: "#006586",
          700: "#004c64",
          800: "#003243",
          900: "#001921",
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
              default: "#fcfcfc",
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
  toggleColorMode: () => {},
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
