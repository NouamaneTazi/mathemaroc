import * as React from "react";

import siteConfig from "@/config/site";
import i18n from "@/i18n";
// import { useEmail } from "@/hooks/app";
import routes from "@/routes";

import { Box, Container, HStack, Link, Stack, Text, useColorModeValue, useToken } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const Footer: React.FC = () => {
  const [lightColor, darkColor] = useToken("colors", ["brand.200", "brand.800"]) as [string, string];

  const bgColor = useColorModeValue(lightColor, darkColor);

  // const copyEmail = useEmail();
  const locale = useRouter().locale as string;

  return (
    <Box fontSize={["xs", "sm"]}>
      <Box as="svg" mb={-1} viewBox="0 0 1440 320">
        <path
          d="M0 256l48-26.7C96 203 192 149 288 154.7c96 5.3 192 69.3 288 64C672 213 768 139 864 128s192 43 288 69.3c96 26.7 192 26.7 240 26.7h48v96H0z"
          fill={bgColor}
        />
      </Box>
      <Box bgColor={bgColor} p={[4, 8]}>
        <Container
          d="flex"
          flexDir={{ base: "column-reverse", md: "row" }}
          justifyContent="space-between"
          maxW="6xl"
          textAlign={{ base: "center", md: "initial" }}
        >
          <Box>
            {/* <Text>
              Made with{" "}
              <Link fontWeight="bold" href="https://nextjs.org" isExternal>
                Next.js
              </Link>
              ,{" "}
              <Link fontWeight="bold" href="https://chakra-ui.com" isExternal>
                Chakra UI
              </Link>
              , and{" "}
              <Link fontWeight="bold" href="https://contentful.com" isExternal>
                Contentful
              </Link>
              .
            </Text> */}
            {/* <HStack justify={{ base: "center", md: "flex-start" }} spacing={1}>
              <Text>Business inquiries at</Text>
              <EmailTooltip>
                <Button
                  colorScheme="black"
                  d="inline-block"
                  fontWeight="bold"
                  onClick={copyEmail}
                  size="sm"
                  variant="link"
                >
                  {siteConfig.email}
                </Button>
              </EmailTooltip>
              .
            </HStack> */}
            <Text dir="ltr">
              <NextLink href="/" passHref>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link fontWeight="bold">{siteConfig.title}</Link>
              </NextLink>{" "}
              &copy; {new Date().getFullYear()} .
            </Text>
            {/* <br />
            <Text>
              Powered by{" "}
              <Link
                href="https://vercel.com/?utm_source=surabayajs&utm_campaign=oss"
                isExternal
              >
                <VercelLogo h="auto" maxW={24} />
              </Link>
            </Text> */}
          </Box>

          <HStack align="flex-start" justify="center" pb={12} pt={{ base: 12, md: 0 }} spacing={16}>
            <Stack>
              <Text variant="sitemap-title">{i18n.footer.navigate[locale] ?? ""}</Text>
              {Object.entries(routes(locale)).map(([href, { name }]) => (
                <NextLink key={name} href={href} passHref>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link variant="sitemap-link">{name}</Link>
                </NextLink>
              ))}
            </Stack>
            <Stack>
              <Text variant="sitemap-title"> {i18n.footer.socials[locale] ?? ""}</Text>
              {Object.entries(siteConfig.socials).map(([name, href]) => (
                <Link key={name} href={href} isExternal variant="sitemap-link">
                  {name}
                </Link>
              ))}
            </Stack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
