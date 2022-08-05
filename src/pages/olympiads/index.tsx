import * as React from "react";

import { Button, Container, Heading, Icon, Image, Text, VStack } from "@chakra-ui/react";

import { FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";
import { NextPage } from "next";
import i18n from "@/i18n";
import { useRouter } from "next/router";

const NotFoundPage: NextPage = () => {
  const router = useRouter();

  const locale = router.locale as string;

  return (
    <Container as="section" maxW="6xl" p={[4, 8]}>
      <VStack spacing={[2, 4]} textAlign="center">
        <Image
          alt="404"
          borderRadius="md"
          boxShadow="xl"
          maxW="sm"
          mb={[4, 8]}
          src="https://giffiles.alphacoders.com/158/158667.gif"
          w="full"
        />

        <Heading>{i18n["under-construction-title"][locale]}</Heading>

        <Text>{i18n["under-construction-subtitle"][locale]}</Text>

        <NextLink href="/" passHref>
          <Button as="a" colorScheme="brand" rightIcon={<Icon as={FaArrowRight} />}>
            {i18n["404-button"][locale]}
          </Button>
        </NextLink>
      </VStack>
    </Container>
  );
};

export default NotFoundPage;