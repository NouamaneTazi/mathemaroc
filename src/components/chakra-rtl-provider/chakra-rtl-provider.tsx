import * as React from "react";

import theme from "@/theme";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function ChakraRTLProvider({ children }) {
  const { locale } = useRouter();
  const direction = locale === "ar" ? "rtl" : "ltr";

  // 👇🏻 Here's the place we add direction to the theme
  const rtlTheme = extendTheme({ direction }, theme);

  return (
    <ChakraProvider resetCSS theme={rtlTheme}>
      {children}
    </ChakraProvider>
  );
}
