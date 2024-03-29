import * as React from "react";

import i18n from "@/i18n";
import { contentRenderer } from "@/utils/renderers";

import { Box, Container, Image } from "@chakra-ui/react";
import { GetStaticPropsContext, NextPage } from "next";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";

// const competitionUrl =
//   "https://raw.githubusercontent.com/NouamaneTazi/mathemaroc/master/markdowns/competition.mdx";

contentRenderer.img = (props) => {
  const { src } = props;
  if (src === "https://i.imgur.com/HCnUEiO.png" || src === "https://imgur.com/YGuegnk.png") {
    return (
      <Box>
        <Image {...props} margin="auto" maxWidth="90%" />
      </Box>
    );
  } else if (src === "https://i.imgur.com/miI83cm.jpg") {
    return (
      <Box>
        <Image {...props} margin="3em auto auto auto" maxHeight="50em" />
      </Box>
    );
  } else {
    return <Image {...props} margin="auto" maxWidth="50%" />;
  }
};

export async function getStaticProps(args: GetStaticPropsContext) {
  const locale = args.locale as string;
  const content = i18n.competition.page[locale] as string;
  // const content = await fetch(competitionUrl).then((res) => res.text());

  return {
    props: {
      locale,
      content,
    },
  };
}

interface competitionPageProps {
  content: string;
  locale: string;
}

const CompetitionPage: NextPage<competitionPageProps> = (props) => {
  const { locale, content } = props;
  return (
    <>
      <NextSeo title={i18n.competition.title[locale] as string} />
      <Container as="section" maxW="6xl" pt={[4, 8]} px={[4, 8]}>
        <ReactMarkdown children={content} components={contentRenderer} />
      </Container>
    </>
  );
};

export default CompetitionPage;
