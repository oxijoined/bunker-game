import { extendTheme, ThemeConfig, ThemeOverride } from "@chakra-ui/react";

// Theme Configuration
const config: ThemeConfig = {
  initialColorMode: "dark", // Set the initial color mode (light or dark)
  useSystemColorMode: false, // Whether to use system color settings
};

// Extension of the Chakra UI base theme
const customTheme: ThemeOverride = {
  colors: {
    primary: "#3182CE", // Example of a primary color
    secondary: "#2D3748", // Example of a secondary color
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  components: {
    // Here you can override styles for Chakra UI components
    Button: {
      baseStyle: {
        fontWeight: "bold", // Example of button styling
      },
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
        },
      },
      variants: {
        solid: {
          bg: "primary",
          color: "white",
          _hover: {
            bg: "secondary",
          },
        },
      },
    },
  },
};

// Combine configuration and custom theme
const theme = extendTheme({ config, ...customTheme });

export default theme;