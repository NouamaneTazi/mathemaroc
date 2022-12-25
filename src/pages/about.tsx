import * as React from "react";

import { MemberCard } from "@/components/members";
// import { description } from "@/config/site";
import i18n from "@/i18n";
import cms from "@/lib/cms";
import { contentRenderer } from "@/utils/renderers";

import { Box, Container, Divider, Heading, Image, Text, useColorModeValue, useToken, Wrap } from "@chakra-ui/react";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";

// const aboutUrl =
//   "https://raw.githubusercontent.com/NouamaneTazi/mathemaroc/master/markdowns/about.mdx";

export async function getStaticProps(args: GetStaticPropsContext) {
  const locale = args.locale as string;
  const content = i18n.about.page[locale] as string;

  const data = await cms().membersPageQuery({
    locale: i18n["i18n-code"][locale],
  });

  return {
    props: {
      content,
      locale,
      members: data.memberCollection?.items,
    },
    revalidate: 60,
  };
}

const AboutPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { content, members, locale } = props;
  const [bgColorLight, bgColorDark] = useToken("colors", ["white", "gray.700"]) as [string, string];

  const bgColor = useColorModeValue(bgColorLight, bgColorDark);

  return (
    <>
      <NextSeo title={i18n.about.title[locale] as string} />
      <Container as="section" maxW="6xl" pt={[4, 8]} px={[4, 8]}>
        <ReactMarkdown children={content} components={contentRenderer} />
        <Heading as="h2" size="xl">
          {i18n.about.motPresident[locale] as string}
        </Heading>
        <Divider />
        <br />
        <Box bgColor={bgColor} borderRadius="lg" boxShadow="lg" overflow="hidden" padding="6">
          <Wrap>
            <Image
              alt="sponsoring"
              objectFit="contain"
              objectPosition="center"
              src="https://i.imgur.com/dGOsEva.png"
              style={{ width: "18%" }}
            />

            <div style={{ width: "10%" }} />
            <div style={{ width: "66%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <br />
              <Text align="justify">{i18n.about.motPresidentContent[locale] as string}</Text>
            </div>
          </Wrap>
          <div style={{ width: "18%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Text color="#686c6e" fontSize="sm" fontWeight="bold">
              Louafi SQUALLI
            </Text>
          </div>
        </Box>
        <br />
        <br />
        <Heading as="h2" size="xl">
          {i18n.about.activities[locale] as string}
        </Heading>
        <Divider />
        <br />

        <Box bgColor={bgColor} borderRadius="lg" boxShadow="lg" overflow="hidden" padding="6">
          <Wrap>
            <Image
              alt="sponsoring"
              objectFit="contain"
              objectPosition="center"
              src="https://upload.wikimedia.org/wikipedia/commons/1/17/IMO_logo.svg"
              style={{ width: "30%" }}
            />

            <div style={{ width: "10%" }} />
            <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <br />
              <Text align="justify">
                <Text fontSize="2xl">{i18n.about.formation_olympique_title[locale] as string} </Text>
                <br />
                {i18n.about.formation_olympique[locale] as string}
              </Text>
            </div>
          </Wrap>

          <Wrap>
            <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <br />
              <Text align="justify">
                <Text fontSize="2xl">{i18n.about.initiative_covid_title[locale] as string} </Text>
                <br />
                {i18n.about.initiative_covid[locale] as string}
              </Text>
            </div>
            <div style={{ width: "10%" }} />
            <Image
              alt="sponsoring"
              objectFit="contain"
              objectPosition="center"
              src="https://i.imgur.com/2tTKxYi.png"
              style={{ width: "30%" }}
            />
          </Wrap>
          <br />
          <Wrap>
            <Image
              alt="sponsoring"
              objectFit="contain"
              objectPosition="center"
              src="https://i.imgur.com/35JJZv9.png"
              style={{ width: "30%" }}
            />

            <div style={{ width: "10%" }} />
            <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <br />
              <Text align="justify">
                <Text fontSize="2xl">{i18n.about.journal_title[locale] as string} </Text>
                <br />
                {i18n.about.journal[locale] as string}
              </Text>
            </div>
          </Wrap>
        </Box>

        <br />
        <Heading as="h2" size="xl">
          {i18n.about.members[locale] as string}
        </Heading>
        <Divider />
        <br />
        <Wrap justify="center" spacing={[4, 4]}>
          {members?.map((member) => member && <MemberCard member={member} />)}
        </Wrap>
      </Container>
    </>
  );
};

export default AboutPage;
