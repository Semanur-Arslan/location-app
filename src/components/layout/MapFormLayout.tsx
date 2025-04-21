"use client";
import React from "react";
import { Flex } from "@chakra-ui/react";
import { MapFormLayoutProps } from "@/types/types";

const MapFormLayout: React.FC<MapFormLayoutProps> = ({ map, form }) => {
  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Flex
        flex={{ base: "none", md: 3 }}
        w="100%"
        h={{ base: "50vh", md: "100vh" }}
        minH="350px"
        justifyContent="center"
      >
        {map}
      </Flex>

      <Flex
        flex={{ base: "none", md: 1 }}
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        {form}
      </Flex>
    </Flex>
  );
};

export default MapFormLayout;
