"use client";
import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Change Theme"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      position="absolute"
      top="20px"
      right="20px"
      borderRadius="full"
      size="lg"
      zIndex="10"
      _hover={{ backgroundColor: "gray.200" }}
    />
  );
};

export default ThemeToggleButton;
