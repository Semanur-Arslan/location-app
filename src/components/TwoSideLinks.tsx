"use client";
import React from "react";
import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { TwoSideLinksProps } from "@/types/types";

export const TwoSideLinks: React.FC<TwoSideLinksProps> = ({ links }) => {
  return (
    <Flex
      mt={4}
      justify={links.length === 1 ? "flex-end" : "space-between"}
      width="100%"
    >
      {links.map((link, index) => (
        <Link
          key={index}
          as={NextLink}
          href={link.href}
          color="teal.600"
          fontSize={12}
          fontWeight="medium"
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  );
};
