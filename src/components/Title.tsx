"use client";

import { Heading, Flex, Button, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TitleProps } from "@/types/types";

const Title: React.FC<TitleProps> = ({ text, links }) => {
  const color = useColorModeValue("teal.500", "teal.200");
  const router = useRouter();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      width="100%"
      gap={4}
    >
      <Heading as="h6" size="md" color={color} textAlign="left">
        {text}
      </Heading>

      {links && links.length > 0 && (
        <Flex
          gap={2}
          flexWrap={{ base: "wrap", sm: "nowrap" }}
          justifyContent={{ base: "flex-start", md: "flex-end" }}
          pe={{ base: "none", sm: "20" }}
        >
          {links.map((link) => (
            <Button
              key={link.href}
              colorScheme={link.color}
              onClick={() => router.push(link.href)}
            >
              {link.label}
            </Button>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Title;
