import * as React from "react";

import siteConfig from "@/config/site";
import i18n from "@/i18n";

import { Button, Container, Divider, Heading, Icon, Image, Text, useBreakpointValue, Wrap } from "@chakra-ui/react";
import { GetStaticPropsContext, NextPage } from "next";
import { NextSeo } from "next-seo";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IconType } from "react-icons/lib";

const HOME_SOCIAL_BUTTONS: [string, string, IconType, string][] = [
  ["Facebook", siteConfig.socials.Facebook, FaFacebook, "facebook"],
  ["Instagram", siteConfig.socials.Instagram, FaInstagram, "pink"],
];

export async function getStaticProps(args: GetStaticPropsContext) {
  const locale = args.locale as string;
  const content = i18n.about.page[locale] as string;
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

const CodeOfContactPage: NextPage<aboutPageProps> = (props) => {
  const { locale } = props;
  const style_ = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const buttonSize = useBreakpointValue(["sm", "md", "lg"]);
  return (
    <>
      <NextSeo title={i18n.contact.title[locale] as string} />
      <Container as="section" maxW="6xl" pt={[4, 8]} px={[4, 8]}>
        <Heading as="h2" size="xl">
          {i18n.contact.sponsor[locale] as string}
        </Heading>
        <Divider />
        <br />
        <div style={style_}>
          <Image
            alt="sponsoring"
            objectFit="contain"
            objectPosition="center"
            src={i18n.contact.image[locale] as string}
          />
        </div>
        <br />
        <Heading as="h2" size="xl">
          {i18n.contact.confiance[locale] as string}
        </Heading>
        <Divider />
        <br />
        <div style={style_}>
          <Wrap>
            <Image
              alt="sponsoring"
              objectFit="contain"
              objectPosition="center"
              src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Logo_Royal_Air_Maroc.svg"
              style={{ width: 400, height: 400 }}
            />
            <div style={{ width: 100, height: 100 }} />
            <Image
              alt="sponsoring"
              objectFit="contain"
              objectPosition="center"
              src="https://upload.wikimedia.org/wikipedia/fr/0/0b/Men_2021.PNG"
              style={{ width: 400, height: 400 }}
            />
          </Wrap>
        </div>
        <Heading as="h2" size="xl">
          {i18n.contact.title[locale] as string}
        </Heading>
        <Divider />
        <br />
        <Text>{i18n.contact.contact[locale] as string} </Text>
        <br />
        <div style={style_}>
          <Wrap>
            <div>
              <div style={style_}>
                <Image
                  alt="sponsoring"
                  objectFit="contain"
                  objectPosition="center"
                  src="https://i.imgur.com/QmyTX3O.png"
                  style={{ width: 400, height: 400 }}
                />
              </div>
              <div style={style_}> Marouane IBN BRAHIM</div>
              <div style={style_}> Vice-Trésorier</div>
              <div style={style_}> marouane.ibnbrahim@gmail.com</div>
            </div>
            <div style={{ width: 100, height: 100 }} />
            <div>
              <div style={style_}>
                <Image
                  alt="sponsoring"
                  objectFit="contain"
                  objectPosition="center"
                  src="https://i.imgur.com/5QKKSOL.png"
                  style={{ width: 400, height: 400 }}
                />
              </div>
              <div style={style_}>Ayoub MIGUIL</div>
              <div style={style_}>Trésorier</div>
              <div style={style_}>miguilayoub@gmail.com</div>
            </div>
          </Wrap>
        </div>
        <br />
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* <Grid
              gap={{ base: 3, lg: 6 }}
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
              width={{ base: "100%", lg: "60%" }}
            > */}
          {HOME_SOCIAL_BUTTONS.map(([name, href, AsIcon, colorScheme]) => (
            <>
              <Button
                key={name}
                as="a"
                colorScheme={colorScheme}
                href={href}
                leftIcon={<Icon as={AsIcon} boxSize={[4, 5, 6]} />}
                size={buttonSize}
                target="_blank"
              >
                {name}
              </Button>
              <div style={{ width: 10, height: 10 }} />
            </>
          ))}
          {/* </Grid> */}
        </div>
      </Container>
    </>
  );
};

export default CodeOfContactPage;
