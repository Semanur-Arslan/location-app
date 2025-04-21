"use client";

import { Heading, useColorModeValue } from "@chakra-ui/react";

const Title: React.FC<{ text: string }> = ({ text }) => {
  const color = useColorModeValue("teal.500", "teal.200");
  return (
    <Heading as="h6" size="md" color={color} textAlign="left">
      {text}
    </Heading>
  );
};

export default Title;
