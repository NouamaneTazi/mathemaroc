import {
  extendTheme,
  theme as defaultTheme,
  ThemeOverride,
} from "@chakra-ui/react";

export default extendTheme(<ThemeOverride>{
  colors: {
    brand: {
      "50": "#EBF8FF",
      "100": "#BEE3F8",
      "200": "#90CDF4",
      "300": "#63B3ED",
      "400": "#4299E1",
      "500": "#3182CE",
      "600": "#2B6CB0",
      "700": "#2C5282",
      "800": "#2A4365",
      "900": "#1A365D",
    },
  },

  components: {
    Link: {
      variants: {
        "sitemap-link": ({ colorMode }) => ({
          color: colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800",
          fontWeight: "medium",
        }),
      },
    },
    Text: {
      variants: {
        "home-title": {
          as: "h2",
          fontSize: ["3xl", "4xl", "5xl", "6xl"],
          fontWeight: "extrabold",
          letterSpacing: "tighter",
          lineHeight: "none",
        },
        "home-subtitle": ({ colorMode }) => ({
          as: "h3",
          color: colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.600",
          fontSize: ["lg", "xl", "2xl", "3xl"],
          fontWeight: "bold",
          letterSpacing: "tight",
          size: "lg",
        }),
        "sitemap-title": {
          fontSize: "sm",
          fontWeight: "bold",
          letterSpacing: "widest",
          textTransform: "uppercase",
        },
      },
    },
  },

  fonts: {
    body: `'Manrope',${defaultTheme.fonts.body}`,
    heading: `'Manrope',${defaultTheme.fonts.heading}`,
    mono: `'Cousine',${defaultTheme.fonts.mono}`,
  },

  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },

      body: {
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
      },

      "#nprogress": {
        pointerEvents: "none",
      },
      "#nprogress .bar": {
        bgGradient: "linear(to-r, whiteAlpha.400, brand.200)",
        h: "2px",
        left: 0,
        pos: "fixed",
        top: 0,
        w: "full",
        zIndex: 2000,
      },
      ".nprogress-custom-parent": {
        overflow: "hidden",
        position: "absolute",
      },
    },
  },
});
