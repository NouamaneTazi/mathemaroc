import * as React from "react";

import { Box, Container, Image } from "@chakra-ui/react";
import { GetStaticPropsContext, NextPage } from "next";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
import { contentRenderer } from "@/utils/renderers";
import i18n from "@/i18n";

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
      <Container as="section" maxW="10xl" pt={[4, 8]} px={[4, 8]}>
      <TableContainer>
        <Table size='sm' variant='simple' dir="ltr">
          <Thead>
          <Tr>
              <Th>Ranking</Th>
              <Th>Last Name</Th>
              <Th>First Name</Th>
              <Th>School </Th>
              <Th>P1</Th>
              <Th>P2</Th>
              <Th>P3</Th>
              <Th>P4</Th>
              <Th>P5</Th>
              <Th>Total</Th>
              <Th>Prizes</Th>
          </Tr>
          </Thead>
          <Tbody>
          <Tr bgColor="gold">
              <Td>1</Td>
              <Td>LEBBAR</Td>
              <Td>Ahmed</Td>
              <Td>UM6P</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>40</Td>
              <Td>First Prize</Td>
          </Tr>
          <Tr bgColor="gold">
              <Td>2</Td>
              <Td>BOULMELF</Td>
              <Td>Youssef</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>5</Td>
              <Td>10</Td>
              <Td>4</Td>
              <Td>10</Td>
              <Td>39</Td>
              <Td>Second Prize</Td>
          </Tr>
          <Tr bgColor="gold">
              <Td>3</Td>
              <Td>OUJAA</Td>
              <Td>Haitam Yassine</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>4</Td>
              <Td>0</Td>
              <Td>34</Td>
              <Td>Third Prize</Td>
          </Tr>
          <Tr bgColor="gold">
              <Td>4</Td>
              <Td>ADRIOUCHE</Td>
              <Td>Hudhaifa</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>2</Td>
              <Td>10</Td>
              <Td>32</Td>
              <Td>Gold Medal</Td>
          </Tr>
          <Tr bgColor="gold">
              <Td>5</Td>
              <Td>BROUK</Td>
              <Td>Amine</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>31</Td>
              <Td>Gold Medal</Td>
          </Tr>
          <Tr bgColor="gold">
              <Td>5</Td>
              <Td>ZENNOU</Td>
              <Td>Mayssa</Td>
              <Td>Reda Slaoui</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>8</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>31</Td>
              <Td>Gold Medal</Td>
          </Tr>
          <Tr bgColor="gold">
              <Td>7</Td>
              <Td>BELJADID</Td>
              <Td>Mohamed Adam</Td>
              <Td>Moulay Youssef</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>30</Td>
              <Td>Gold Medal</Td>
          </Tr>
          <Tr bgColor="gold">
              <Td>7</Td>
              <Td>EL HANI </Td>
              <Td>Mohammed-Rida </Td>
              <Td>UM6P</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>30</Td>
              <Td>Gold Medal</Td>
          </Tr>
          <Tr bgColor="gold">
              <Td>7</Td>
              <Td>KHANNOUCHI</Td>
              <Td>Haitam</Td>
              <Td>Lymed</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>30</Td>
              <Td>Gold Medal</Td>
          </Tr>
          <Tr bgColor="gold">
              <Td>7</Td>
              <Td>RAMLAOUI </Td>
              <Td>Mohamed Taha </Td>
              <Td>Al Zahrawi - Abulcasis</Td>
              <Td>10</Td>
              <Td>9</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>30</Td>
              <Td>Gold Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>11</Td>
              <Td>TAKFA</Td>
              <Td>Anass</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>29</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>12</Td>
              <Td>AIT OMAR</Td>
              <Td>Abdelkarim</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>3</Td>
              <Td>5</Td>
              <Td>28</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>13</Td>
              <Td>ABALIL</Td>
              <Td>Ayoub</Td>
              <Td>Moulay Hassan</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td>25</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>13</Td>
              <Td>EL MAMOUN</Td>
              <Td>Haytam</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>5</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>25</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>13</Td>
              <Td>EL MAZLOUZI</Td>
              <Td>Soufien</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>5</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>25</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>13</Td>
              <Td>ELKIHEL</Td>
              <Td>El Mehdi </Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>25</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>13</Td>
              <Td>ZAKIRA</Td>
              <Td>Abdellatif </Td>
              <Td>UM6P</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>25</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>18</Td>
              <Td>AYMEN</Td>
              <Td>El Ouadrhiri</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>4</Td>
              <Td>0</Td>
              <Td>24</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>19</Td>
              <Td>ABOUNNAIM </Td>
              <Td>El Hassan </Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>23</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="silver">
              <Td>19</Td>
              <Td>SAHRAOUI</Td>
              <Td>Youssef</Td>
              <Td>Lymed</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>2</Td>
              <Td>4</Td>
              <Td>7</Td>
              <Td>23</Td>
              <Td>Silver Medal</Td>
          </Tr>
          <Tr bgColor="orange">
              <Td>21</Td>
              <Td>AIT MANSOUR</Td>
              <Td>Abderrahmane </Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>22</Td>
              <Td>Bronze Medal</Td>
          </Tr>
          <Tr bgColor="orange">
              <Td>21</Td>
              <Td>ASSELLALOU</Td>
              <Td>Mohamed Salim</Td>
              <Td>Al Zahrawi - Abulcasis</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>22</Td>
              <Td>Bronze Medal</Td>
          </Tr>
          <Tr bgColor="orange">
              <Td>21</Td>
              <Td>DROUSSI</Td>
              <Td>Mohamed</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>22</Td>
              <Td>Bronze Medal</Td>
          </Tr>
          <Tr bgColor="orange">
              <Td>22</Td>
              <Td>BENCHEKROUN KRIMI</Td>
              <Td>Yassine</Td>
              <Td>Lymed</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>21</Td>
              <Td>Bronze Medal</Td>
          </Tr>
          <Tr bgColor="orange">
              <Td>22</Td>
              <Td>EL KASIMI</Td>
              <Td>Hiba</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>21</Td>
              <Td>Bronze Medal</Td>
          </Tr>
          <Tr bgColor="orange">
              <Td>22</Td>
              <Td>ELMANSOURI </Td>
              <Td>Mouaad </Td>
              <Td>Lydex</Td>
              <Td>9</Td>
              <Td>10</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>21</Td>
              <Td>Bronze Medal</Td>
          </Tr>
          <Tr bgColor="orange">
              <Td>22</Td>
              <Td>HAKIM</Td>
              <Td>Ali</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>21</Td>
              <Td>Bronze Medal</Td>
          </Tr>
          <Tr bgColor="orange">
              <Td>22</Td>
              <Td>TANANA</Td>
              <Td>Mehdi</Td>
              <Td>Lymed</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>21</Td>
              <Td>Bronze Medal</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>29</Td>
              <Td>BARAKAT</Td>
              <Td>Ayman</Td>
              <Td>Moulay Youssef</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>20</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>29</Td>
              <Td>BEN YAHIA</Td>
              <Td>Wassel</Td>
              <Td>Lymed</Td>
              <Td>10</Td>
              <Td>2</Td>
              <Td>7</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>20</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>29</Td>
              <Td>BENABOUD</Td>
              <Td>Mehdi</Td>
              <Td>Omar Ibn Alkhattab</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>20</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>29</Td>
              <Td>EL HADARI</Td>
              <Td>Marouane</Td>
              <Td>Moulay Youssef</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>20</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>29</Td>
              <Td>ESSAIDI</Td>
              <Td>Youssef</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>7</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>20</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>29</Td>
              <Td>MAJDOUB</Td>
              <Td>Aya</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>20</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>29</Td>
              <Td>MERROUN</Td>
              <Td>Omar</Td>
              <Td>Moulay Hassan</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>20</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>29</Td>
              <Td>OUAISSI</Td>
              <Td>Salma</Td>
              <Td>Reda Slaoui</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>8</Td>
              <Td>20</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>29</Td>
              <Td>TIBATI</Td>
              <Td>Anas</Td>
              <Td>Lymed</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>20</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>38</Td>
              <Td>BOUSSENNA </Td>
              <Td>Mohamed Yassir</Td>
              <Td>Lydex</Td>
              <Td>9</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>19</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>38</Td>
              <Td>EL KALAI</Td>
              <Td>Mohamed Amine</Td>
              <Td>ENSA Rabat</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>19</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>38</Td>
              <Td>KADDOURI</Td>
              <Td>Saif Eddine</Td>
              <Td>Moulay Youssef</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>8</Td>
              <Td>19</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>38</Td>
              <Td>SOULAMI</Td>
              <Td>Anass</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>19</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>42</Td>
              <Td>BOUDERSA</Td>
              <Td>Abdeladim</Td>
              <Td>Omar Ibn Alkhattab</Td>
              <Td>10</Td>
              <Td>5</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>18</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>42</Td>
              <Td>EL HARCHALI</Td>
              <Td>Mohamed</Td>
              <Td>Salmane Al Farissi</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>18</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>44</Td>
              <Td>ABARRAH </Td>
              <Td>Anas</Td>
              <Td>Bab Essahara Guelmim</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>7</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>17</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>44</Td>
              <Td>FAKHREI</Td>
              <Td>Nizar</Td>
              <Td>Omar Ibn Alkhattab</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>17</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>44</Td>
              <Td>MITALANE</Td>
              <Td>Hamza</Td>
              <Td>GSR la résidence</Td>
              <Td>2</Td>
              <Td>10</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>17</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>47</Td>
              <Td>BOUDOUH</Td>
              <Td>Mohamed</Td>
              <Td>Al Zahrawi - Abulcasis</Td>
              <Td>10</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>16</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>48</Td>
              <Td>LAZZOUZI</Td>
              <Td>Youssef</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>15</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr bgColor="teal.200">
              <Td>48</Td>
              <Td>OUHADI</Td>
              <Td>Chaymae</Td>
              <Td>Omar Ibn Alkhattab</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td>15</Td>
              <Td>Honorable Mention</Td>
          </Tr>
          <Tr>
              <Td>50</Td>
              <Td>AGOUZOULE </Td>
              <Td>Yassir </Td>
              <Td>UM6P</Td>
              <Td>2</Td>
              <Td>2</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>14</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>50</Td>
              <Td>KECHNA</Td>
              <Td>Aymane</Td>
              <Td>Omar Ibn Alkhattab</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>14</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>50</Td>
              <Td>MINTOAMA </Td>
              <Td>Mimpaguibe </Td>
              <Td>Ibn Timiya</Td>
              <Td>9</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>14</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>BELEHSEN</Td>
              <Td>Anass</Td>
              <Td>Ibn Timiya</Td>
              <Td>10</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>BOUGHALEB </Td>
              <Td>Yasmine</Td>
              <Td>Ibn Ghazi</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>CHAFI</Td>
              <Td>Aymen</Td>
              <Td>Mohammed V Beni Mellal</Td>
              <Td>7</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>CHAKOUR</Td>
              <Td>Yasser</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>ELHAMDAOUI</Td>
              <Td>Mohammed</Td>
              <Td>Moulay Youssef</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>ELMAHDAOUY</Td>
              <Td>Asmae</Td>
              <Td>Lymed</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>FARAJ</Td>
              <Td>Diaeeddine</Td>
              <Td>Al Bayrouni</Td>
              <Td>10</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>IBN SEDDIK</Td>
              <Td>Youssef</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>LHAWA</Td>
              <Td>Samir</Td>
              <Td>Mohammed VI Kenitra</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>MABCHOUR</Td>
              <Td>Radwa</Td>
              <Td>Ibn Timiya</Td>
              <Td>10</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>51</Td>
              <Td>RAHIM</Td>
              <Td>Marwane </Td>
              <Td>Mohammed V Beni Mellal</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>4</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>13</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>CHAMLALIâ€¬â€</Td>
              <Td>â€ªBilal</Td>
              <Td>Omar Ibn Abdelaziz</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>12</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>ESSEQALLY</Td>
              <Td>Zouhair</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>12</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>GHOSNE</Td>
              <Td>Ahmed Yassine</Td>
              <Td>Pierre de Fermat (Toulouse)</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>12</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>HOUTA</Td>
              <Td>Youssef</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>12</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>ADI</Td>
              <Td>Aya</Td>
              <Td>Université Hassan 2 Casablanca</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>AMSSAOU</Td>
              <Td>Lahoucine</Td>
              <Td>Ibn Timiya</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>BAJJOU</Td>
              <Td>Mahmoud</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>BEN OMAR</Td>
              <Td>Youssef</Td>
              <Td>Moulay Hassan</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>BLGRIM</Td>
              <Td>Oussama</Td>
              <Td>Moulay Abdellah Safi</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>BOUSSAADI</Td>
              <Td>Mohamed Reda</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>CHAGH</Td>
              <Td>Othmane</Td>
              <Td>Ibn Tahir</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>DJAGBARE</Td>
              <Td>Yendougnoime Josias </Td>
              <Td>Université Oujda</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>EL ASRI</Td>
              <Td>Mouad</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>EL BAKKALI</Td>
              <Td>Mohamed</Td>
              <Td>Moulay Youssef</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>EL GHARBAOUI</Td>
              <Td>Basma</Td>
              <Td>Mohammed V Casa</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>EL HABBOULI</Td>
              <Td>Hossam</Td>
              <Td>Mohammed V Casa</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>EL KARKOURI</Td>
              <Td>Mohamed Yahya</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>EL MOUFADI</Td>
              <Td>Mohamed Réda</Td>
              <Td>Moulay Youssef</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>EL MOUNTADAR ALAOUI</Td>
              <Td>Ali</Td>
              <Td>Moulay Driss</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>KAMILI</Td>
              <Td>El Houssine</Td>
              <Td>Errazi</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>LAABADI </Td>
              <Td>Aymane </Td>
              <Td>UM6P</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>OUATTARA</Td>
              <Td>Dalil Osée</Td>
              <Td>Centre CPGE Tétouan</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>64</Td>
              <Td>OULKADI</Td>
              <Td>El Mahdi</Td>
              <Td>Pierre de Fermat (Toulouse)</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>11</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>BAHIR</Td>
              <Td>El Mahdi</Td>
              <Td>Moulay Abdellah Safi</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>BELBYET</Td>
              <Td>Mohamed</Td>
              <Td>Lydex</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>BENJELLOUN</Td>
              <Td>Elghali</Td>
              <Td>UM6P</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>BENLAFQIH</Td>
              <Td>Mohamed Achraf</Td>
              <Td>UM6P</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>CHBIB</Td>
              <Td>Abderrahmane </Td>
              <Td>Moulay Abdellah Safi</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>EL BAHJA</Td>
              <Td>Ayman</Td>
              <Td>Louis Le Grand</Td>
              <Td>4</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>ELHANI </Td>
              <Td>Jawad</Td>
              <Td>Bab Essahara Guelmim</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>EZZHAR ELIDRISSI </Td>
              <Td>Abdelkarim </Td>
              <Td>Lycée Technique Settat</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>HAMMAINI</Td>
              <Td>Anas</Td>
              <Td>Lymed</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>HEBAZ</Td>
              <Td>Raihane</Td>
              <Td>Errazi</Td>
              <Td>9</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>HITAR</Td>
              <Td>Nasr-Allah</Td>
              <Td>Ibn Abdoun Khouribga</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>JABAL</Td>
              <Td>Ayman</Td>
              <Td>Mohammed V Casa</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>LEMHANI</Td>
              <Td>Ilyass</Td>
              <Td>Al Bayrouni</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>RIFI</Td>
              <Td>Aya</Td>
              <Td>Al Khansae</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>SABIR</Td>
              <Td>Anas</Td>
              <Td>Reda Slaoui</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>SEBBAH </Td>
              <Td>Majd</Td>
              <Td>Lydex</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>SOUINYA</Td>
              <Td>Nizar</Td>
              <Td>Moulay Youssef</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>TAGHZOUTI</Td>
              <Td>Aya</Td>
              <Td>Al Cachy</Td>
              <Td>9</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>87</Td>
              <Td>ZAKARIA</Td>
              <Td>Zaanane</Td>
              <Td>Centre CPGE Tétouan</Td>
              <Td>10</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>10</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>106</Td>
              <Td>DADDA</Td>
              <Td>Rajaa</Td>
              <Td>Salmane Al Farissi</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>106</Td>
              <Td>HAKKOU</Td>
              <Td>Aya</Td>
              <Td>Mohammed VI Kenitra</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>106</Td>
              <Td>IMCHTKA</Td>
              <Td>Abdelhak</Td>
              <Td>Université Hassan 2 Casablanca</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>106</Td>
              <Td>MANSOUB</Td>
              <Td>Yahya</Td>
              <Td>Al Khansae</Td>
              <Td>4</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>106</Td>
              <Td>MOUSSA</Td>
              <Td>Mohammed Nour</Td>
              <Td>Mohammed V Casa</Td>
              <Td>7</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>106</Td>
              <Td>NAIT YAZZA</Td>
              <Td>Aya</Td>
              <Td>Centre CPGE Tétouan</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>106</Td>
              <Td>RABII</Td>
              <Td>Oussama</Td>
              <Td>Lydex</Td>
              <Td>9</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>106</Td>
              <Td>SABBAR</Td>
              <Td>Hamza</Td>
              <Td>Université Rabat</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>9</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>114</Td>
              <Td>AIT MOUMAD</Td>
              <Td>Ismail</Td>
              <Td>GSR la résidence</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>8</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>114</Td>
              <Td>CHEMLALI</Td>
              <Td>Manal</Td>
              <Td>Omar Ibn Alkhattab</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>8</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>114</Td>
              <Td>HOUNSAVI</Td>
              <Td>Jules Koffi</Td>
              <Td>FST Marrakech</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>8</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>114</Td>
              <Td>KLILOU</Td>
              <Td>SaÃ¯f-Eddine</Td>
              <Td>FST Marrakech</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>8</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>114</Td>
              <Td>MAHDANE</Td>
              <Td>Amine</Td>
              <Td>Reda Slaoui</Td>
              <Td>8</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>8</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>119</Td>
              <Td>JOUMARI</Td>
              <Td>Ismail</Td>
              <Td>GSR la résidence</Td>
              <Td>7</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>7</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>120</Td>
              <Td>BAJDOURI</Td>
              <Td>Amina</Td>
              <Td>Ibn Ghazi</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>6</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>121</Td>
              <Td>EL FATHI</Td>
              <Td>Maroua</Td>
              <Td>Reda Slaoui</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>121</Td>
              <Td>KHALID</Td>
              <Td>Nihal</Td>
              <Td>Ibn Ghazi</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>121</Td>
              <Td>ZAHIR</Td>
              <Td>Khadija</Td>
              <Td>Lydex</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>121</Td>
              <Td>ZAHRAOUI </Td>
              <Td>Issam </Td>
              <Td>Ibn Timiya</Td>
              <Td>5</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>5</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>125</Td>
              <Td>AGOUMI </Td>
              <Td>Saad</Td>
              <Td>Lydex</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>4</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>125</Td>
              <Td>AKHARAZ </Td>
              <Td>Jihane </Td>
              <Td>Mohammed VI Kenitra</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>4</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>125</Td>
              <Td>ASSIF</Td>
              <Td>Omaima</Td>
              <Td>Université Hassan 2 Casablanca</Td>
              <Td>4</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>4</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>125</Td>
              <Td>SEGBEDJI </Td>
              <Td>Yao Hénoc</Td>
              <Td>Ibn Timiya</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>4</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>4</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>125</Td>
              <Td>SOUADI</Td>
              <Td>NouÃ¢mane</Td>
              <Td>Lydex</Td>
              <Td>4</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>4</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>125</Td>
              <Td>ZEROUAL</Td>
              <Td>Aya</Td>
              <Td>Omar bn lkhattab</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>4</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>4</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>131</Td>
              <Td>HALLAJI</Td>
              <Td>Zakaria</Td>
              <Td>Errazi</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>3</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>131</Td>
              <Td>LAMSAAF</Td>
              <Td>Yassine</Td>
              <Td>FST Marrakech</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>3</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>3</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>133</Td>
              <Td>AIT LHADJ</Td>
              <Td>Soufiane</Td>
              <Td>UM6P</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>2</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>133</Td>
              <Td>ASSERDA</Td>
              <Td>Samy</Td>
              <Td>Moulay Youssef</Td>
              <Td>2</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>2</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>133</Td>
              <Td>ELLAIK</Td>
              <Td>Fadwa</Td>
              <Td>Bab Essahara Guelmim</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>2</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>136</Td>
              <Td>AZOUBI</Td>
              <Td>Othmane</Td>
              <Td>UM6P</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>136</Td>
              <Td>BITAR</Td>
              <Td>Khalil</Td>
              <Td>Omar Ibn Alkhattab</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>136</Td>
              <Td>EL HAJJY </Td>
              <Td>Maryam</Td>
              <Td>Mohammed VI Kenitra</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>136</Td>
              <Td>EL KHARRIM </Td>
              <Td>Mouad</Td>
              <Td>Ibn Timiya</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>136</Td>
              <Td>OIHACHE</Td>
              <Td>Mouhcine</Td>
              <Td>Université Beni Mellal</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>1</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>AIT OUNEJJAR</Td>
              <Td>Ahmed</Td>
              <Td>London Academy Casablanca</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>CHAATOUF</Td>
              <Td>Abdessamad</Td>
              <Td>Omar Ibn Abdelaziz</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>CHOUJAA </Td>
              <Td>Fatima Zahra </Td>
              <Td>FST Settat</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>EL BARKAOUI</Td>
              <Td>Hafsa</Td>
              <Td>Mohammed VI Kenitra</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>ELHAMDANY </Td>
              <Td>Marouane </Td>
              <Td>Université Rabat</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>ELMAKHLOUFI</Td>
              <Td>Soumiya</Td>
              <Td>UM6P</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>ELMOULOUA</Td>
              <Td>Soundousse</Td>
              <Td>FST Marrakech</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>GAROUI</Td>
              <Td>Hatim</Td>
              <Td>Moulay Abdellah Safi</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>HAVAH</Td>
              <Td>Kokou Spenson </Td>
              <Td>Université Marrakech</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>ISSARTI </Td>
              <Td>Elkhalil </Td>
              <Td>Lydex</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>
          <Tr>
              <Td>141</Td>
              <Td>YEFFOU</Td>
              <Td>Jaafar</Td>
              <Td>UM6P</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
          </Tr>

          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
      </Container>
    </>
  );
};

export default CompetitionPage;
