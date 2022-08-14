import * as React from "react";

import { GetStaticPropsContext, NextPage } from "next";

import { Container } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
import { contentRenderer } from "@/utils/renderers";
import i18n from "@/i18n";

// const competitionUrl =
//   "https://raw.githubusercontent.com/NouamaneTazi/mathemaroc/master/markdowns/competition.mdx";

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
