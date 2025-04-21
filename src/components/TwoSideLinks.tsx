"use client";
import React from "react";
import { Flex, Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { TwoSideLinksProps } from "@/types/types";

const TwoSideLinks: React.FC<TwoSideLinksProps> = ({ links }) => {
  const linkColor = useColorModeValue("teal.500", "gray.100");
  return (
    <Flex
      justify={links.length === 1 ? "flex-end" : "space-between"}
      width="100%"
      flexWrap="wrap"
    >
      {links.map((link, index) => (
        <Link
          key={index}
          as={NextLink}
          href={link.href}
          color={linkColor}
          fontSize={12}
          fontWeight="medium"
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  );
};

export default TwoSideLinks;
