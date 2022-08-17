import * as React from "react";

import { Box, Divider, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/react";

type RendererRecord = {
  [nodeType: string]: React.ElementType<any>;
};

export const contentRenderer: RendererRecord = {
  // eslint-disable-next-line react/display-name
  blockquote: (props): JSX.Element => (
    <Box borderLeftColor="gray.200" borderLeftWidth={2} color="gray.500" ps={4} py={2} {...props} />
  ),

  // eslint-disable-next-line react/display-name
  li: (props) => {
    return (
      <UnorderedList>
        <ListItem {...props} />
      </UnorderedList>
    );
  },

  // eslint-disable-next-line react/display-name
  h1: (props) => (
    <Box>
      <Heading {...props} as="h1" size="xl" />
      <Divider mb="4" mt="2" />
    </Box>
  ),
  // eslint-disable-next-line react/display-name
  h2: (props) => (
    <Box mb="1" mt="5">
      <Heading {...props} as="h2" size="lg" marginBottom={1} marginTop={10}/>
    </Box>
  ),
  // eslint-disable-next-line react/display-name
  h3: (props) => (
    <Box>
      <Heading {...props} as="h3" size="md" marginBottom={1} marginTop={10}/>
    </Box>
  ),

  // eslint-disable-next-line react/display-name
  h4: (props) => (
    <Box>
      <Heading {...props} as="h4" size="sm" marginBottom={1} marginTop={10}/>
    </Box>
  ),

  // eslint-disable-next-line react/display-name
  a: (props) => <Link {...props} color="brand" isExternal />,
};
