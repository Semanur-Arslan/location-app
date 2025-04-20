"use client";

import { Heading, useColorModeValue } from "@chakra-ui/react";

type Props = {
  text: string;
};

export const Title = ({ text }: Props) => {
  const color = useColorModeValue("teal.500", "teal.200");
  return (
    <Heading as="h6" size="md" color={color}>
      {text}
    </Heading>
  );
};
