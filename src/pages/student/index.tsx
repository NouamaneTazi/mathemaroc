import * as React from "react";

import { GetStaticPropsContext, NextPage } from "next";

import { Container } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
import { contentRenderer } from "@/utils/renderers";
import i18n from "@/i18n";

// const aboutUrl =
//   "https://raw.githubusercontent.com/NouamaneTazi/mathemaroc/master/markdowns/about.mdx";

export async function getStaticProps(args: GetStaticPropsContext) {
  const locale = args.locale as string;
  const content = i18n.about.page[locale] as string;
  // const content = await fetch(aboutUrl).then((res) => res.text());

  return {
    props: {
      locale,
      content,
    },
  };
}

interface aboutPageProps {
  content: string;
  locale: string;
}

const CodeOfConductPage: NextPage<aboutPageProps> = (props) => {
  const { locale, content } = props;
  return (
    <>
      <NextSeo title={i18n.about.title[locale] as string} />
      <Container as="section" maxW="6xl" pt={[4, 8]} px={[4, 8]}>
        <ReactMarkdown children={content} components={contentRenderer} />
      </Container>
    </>
  );
};

export default CodeOfConductPage;
