"use client";

import { Heading } from "@chakra-ui/react";

type Props = {
  text: string;
};

export const Title = ({ text }: Props) => {
  return (
    <Heading as="h6" size="md" color="teal.500">
      {text}
    </Heading>
  );
};
