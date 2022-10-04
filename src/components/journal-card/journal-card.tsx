import * as React from "react";

import i18n from "@/i18n";

// import { RecentJournalMetadataFragment } from "@/gener:ated/graphql";
import {
  Button,
  Flex,
  FlexProps,
  Heading,
  HStack,
  Icon,
  Img,
  Stack,
  Text,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";

interface JournalCardProps extends FlexProps {
  journal: any;
}

export const JournalCard: React.FC<JournalCardProps> = (props) => {
  const { journal, ...rest } = props;

  if (!journal.poster) {
    // throw new Error(`Journal ${journal.filename as string} has no poster`);
    journal.poster = {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png",
    };
  }

  const router = useRouter();
  const locale = router.locale as string;

  const [bgColorLight, bgColorDark] = useToken("colors", ["white", "gray.700"]) as [string, string];

  const bgColor = useColorModeValue(bgColorLight, bgColorDark);

  return (
    <Flex
      bgColor={bgColor}
      borderRadius="md"
      boxShadow="base"
      flexDir={{ base: "column", md: "row" }}
      maxW={{ base: "sm", md: "full" }}
      overflow="auto"
      w="full"
      {...rest}
    >
      <Img
        alt={journal.filename as string}
        h="20"
        maxH="xs"
        maxW={{ md: "sm" }}
        objectFit="contain"
        objectPosition="center"
        src={journal.poster.url as string}
      />

      <Stack pl={3} pr={3} pt={3} w="full">
        <Heading as="h3" size="md">
          {journal.filename}
        </Heading>

        {/* <AvatarGroup size="sm">
          {journal.sessionsCollection?.items.map((s) => (
            <Avatar key={s?.sys.id} name={s?.speaker?.name as string} src={s?.speaker?.avatar?.url as string} />
          ))}
        </AvatarGroup> */}

        <Text fontSize="sm" fontWeight="bold">
          {format(new Date(journal?.publishDate as string), "PP")}
        </Text>

        {/* <Divider /> */}

        {/* <Text flexGrow={1} fontSize="sm">
          {journal.description}
        </Text> */}
      </Stack>

      <HStack justify="center">
        <Button
          as="a"
          h="full"
          href={journal.file.url as string}
          isTruncated
          p={3}
          rightIcon={<Icon as={FaArrowRight} />}
          size="lg"
          target="_blank"
          variant="ghost"
          // minH={{ base: "3", md: "full" }}
          w="full"
        >
          {i18n["view-pdf"][locale]}
        </Button>
      </HStack>
    </Flex>
  );
};
