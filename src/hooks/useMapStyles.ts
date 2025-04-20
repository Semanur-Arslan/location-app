import { useColorMode } from "@chakra-ui/react";

export const useMapStyles = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  if (isDarkMode) {
    return [
      { elementType: "geometry", stylers: [{ color: "#2D3748" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#2D3748" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#E2E8F0" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#F6E05E" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#F6E05E" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#2D3748" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#4A5568" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#1A202C" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#1A202C" }],
      },
    ];
  }

  return [];
};
