import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { createContext } from "react";

// Create a custom theme
export const ThemeContext = createContext();

export let theme = createTheme({
  palette: {
    primary: {
      main: "#142D6D",  // Royal Blue
      contrastText: "#F6F6F6", // Soft White for contrast
    },
    secondary: {
      main: "#FE6E32", // Vibrant Orange
    },
    text: {
      primary: "#333333", 
      secondary: "#5F5F5F", // Cool Gray for secondary text
    },
    background: {
      default: "#C6D8FE", // Soft White as background
      paper: "linear-gradient(#ffffff 50%, #b6cfe0 50%)", // Pure white for card backgrounds
    },
    error: {
      main: "#C0392B", // Deep Red for urgency or errors
    },
    info: {
      main: "#OA4DF6", // Sky Blue for approachable highlights
    },
  },
  typography: {
    fontFamily: "Montserrat,sans-serif",
    h1: {
      fontSize: "3rem", // Default size
      fontWeight: "bold",
      color: "#1A4C90",
      "@media (max-width:1200px)": { fontSize: "2.5rem" }, // Large screens
      "@media (max-width:900px)": { fontSize: "2rem" }, // Medium screens
      "@media (max-width:600px)": { fontSize: "1.75rem" }, // Small screens
      "@media (max-width:400px)": { fontSize: "1.5rem" }, // Extra small screens
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#1A4C90",
      "@media (max-width:1200px)": { fontSize: "2rem" },
      "@media (max-width:900px)": { fontSize: "1.75rem" },
      "@media (max-width:600px)": { fontSize: "1.5rem" },
      "@media (max-width:400px)": { fontSize: "1.25rem" },
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "900",
      color: "#1A4C90",
      "@media (max-width:1200px)": { fontSize: "1.75rem" },
      "@media (max-width:900px)": { fontSize: "1.5rem" },
      "@media (max-width:600px)": { fontSize: "1.25rem" },
      "@media (max-width:400px)": { fontSize: "1rem" },
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#1A4C90",
      "@media (max-width:1200px)": { fontSize: "1.25rem" },
      "@media (max-width:900px)": { fontSize: "1.1rem" },
      "@media (max-width:600px)": { fontSize: "1rem" },
      "@media (max-width:400px)": { fontSize: "0.875rem" },
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "medium",
      color: "#1A4C90",
      "@media (max-width:1200px)": { fontSize: "1.1rem" },
      "@media (max-width:900px)": { fontSize: "1rem" },
      "@media (max-width:600px)": { fontSize: "0.875rem" },
      "@media (max-width:400px)": { fontSize: "0.75rem" },
    },
    h6: {
      fontSize: "1.15rem",
      fontWeight: "bold",
      color: "#1A4C90",
      "@media (max-width:1200px)": { fontSize: "1rem" },
      "@media (max-width:900px)": { fontSize: "0.9rem" },
      "@media (max-width:600px)": { fontSize: "0.85rem" },
      "@media (max-width:400px)": { fontSize: "0.8rem" },
    },
    body1: {
      fontSize: "1rem",
      color: "#444444",
      fontWeight: 500,
      lineHeight: 1.6,
      "@media (max-width:1200px)": { fontSize: "0.95rem" },
      "@media (max-width:900px)": { fontSize: "0.9rem" },
      "@media (max-width:600px)": { fontSize: "0.85rem" },
      "@media (max-width:400px)": { fontSize: "0.8rem" },
    },
    button: {
      fontWeight: "bold",
      color: "#F4F4F4",
      textTransform: "none",
    },
  },
});

// Enable responsive font sizes
theme = responsiveFontSizes(theme);

// Custom Theme Provider Component
export const ThemeProviderCustom = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};