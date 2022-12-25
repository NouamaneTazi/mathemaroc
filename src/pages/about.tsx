import * as React from "react";

import {
  Box,
  Divider,
  Heading,
  Image,
  Text,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react'
import { Container, Wrap } from "@chakra-ui/react";
import { GetStaticPropsContext, NextPage } from "next";

import { MemberCard } from "@/components/members";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
import { contentRenderer } from "@/utils/renderers";
import { description } from "@/config/site";
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
  const member_ = [{name: 'safaa khadim', description:'description description', image: 'https://bit.ly/broken-link'},
  {name: 'safaa khadim', description:'description description', image: 'https://bit.ly/broken-link'},
  {name: 'safaa khadim', description:'description description', image: 'https://bit.ly/broken-link'},
  {name: 'safaa khadim', description:'description description', image: 'https://bit.ly/broken-link'},
  {name: 'safaa khadim', description:'description description', image: 'https://bit.ly/broken-link'}]
  const style_ = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const [bgColorLight, bgColorDark] = useToken("colors", ["white", "gray.700"]) as [string, string];

  const bgColor = useColorModeValue(bgColorLight, bgColorDark);

  
  return (
    <>
      <NextSeo title={i18n.about.title[locale] as string} />
      <Container as="section" maxW="6xl" pt={[4, 8]} px={[4, 8]}>
        <ReactMarkdown children={content} components={contentRenderer} /> 
        <Heading as='h2' size='xl'>
          {i18n.about.motPresident[locale] as string} 
        </Heading> 
        <Divider />
        <br/>
        <Box padding='6' boxShadow='lg'       bgColor={bgColor}
  borderRadius='lg' overflow='hidden'>
          
        <Wrap >
            <Image style={{ width: '18%' }}
              alt="sponsoring"
              objectFit="contain"
              objectPosition="center"
              src="https://i.imgur.com/dGOsEva.png"
            />
            
            <div style={{ width: '10%' }}></div>
            <div style={{ width: '66%' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <br />
              <Text align="justify">
              {i18n.about.motPresidentContent[locale] as string} 
              </Text>
            </div>
         </Wrap>
         <div style={{ width: '18%' ,display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
         <Text fontSize="sm" fontWeight="bold" color='#686c6e'>
              Louafi SQUALLI
          </Text>
        </div>
      </Box>
      <br />
      <br />
        <Heading as='h2' size='xl'>
          {i18n.about.activities[locale] as string} 
        </Heading> 
        <Divider />
      <br />

      <Box padding='6' boxShadow='lg'       bgColor={bgColor}
  borderRadius='lg' overflow='hidden'>          
          <Wrap >
              <Image style={{ width: '30%' }}
                alt="sponsoring"
                objectFit="contain"
                objectPosition="center"
                src="https://upload.wikimedia.org/wikipedia/commons/1/17/IMO_logo.svg"
              />
              
              <div style={{ width: '10%' }}></div>
              <div style={{ width: '50%' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <br />
                <Text align="justify">
                <Text fontSize='2xl'>{i18n.about.formation_olympique_title[locale] as string} </Text>
                  <br />
                {i18n.about.formation_olympique[locale] as string} 
                </Text>
              </div>
           </Wrap>
                  
          <Wrap >         
              <div style={{ width: '50%' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <br />
                <Text align="justify">
                <Text fontSize='2xl'>{i18n.about.initiative_covid_title[locale] as string} </Text>
                <br />
                {i18n.about.initiative_covid[locale] as string} 
                </Text>
              </div>
              <div style={{ width: '10%' }}></div>
              <Image style={{ width: '30%' }}
                alt="sponsoring"
                objectFit="contain"
                objectPosition="center"
                src="https://i.imgur.com/2tTKxYi.png"
              />
              
           </Wrap>
        <br/>
          <Wrap >
              <Image style={{ width: '30%' }}
                alt="sponsoring"
                objectFit="contain"
                objectPosition="center"
                src="https://i.imgur.com/35JJZv9.png"
              />
              
              <div style={{ width: '10%' }}></div>
              <div style={{ width: '50%' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <br />
                <Text align="justify">
                <Text fontSize='2xl'>{i18n.about.journal_title[locale] as string} </Text>
                <br/>
                {i18n.about.journal[locale] as string} 
                </Text>
              </div>
           </Wrap>
        </Box>


      <br />
        <Heading as='h2' size='xl'>
          {i18n.about.members[locale] as string} 
        </Heading> 
        <Divider />
        <br />
        <Wrap>
          {member_.map((element)=>(
            <MemberCard member={element}></MemberCard>
          ))}
          </Wrap>         
      </Container>
      
      
      
    </>
  );
};

export default CodeOfConductPage;
