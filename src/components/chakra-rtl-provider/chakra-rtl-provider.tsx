import * as React from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { useRouter } from "next/router";

export function ChakraRTLProvider({ children }) {
  const { locale } = useRouter();
  const direction = locale === "ar" ? "rtl" : "ltr";

  // 👇🏻 Here's the place we add direction to the theme
  const theme = extendTheme({ direction });

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
