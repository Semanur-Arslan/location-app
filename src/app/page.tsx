"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Flex } from "@chakra-ui/react";
import { addLocation } from "@/store/locationSlice";
import { toast } from "react-toastify";
import { ColorResult } from "react-color";
import { LocationData, MapClickEvent } from "@/types/types";
import { Location } from "@/types/redux";
import { MapComponent } from "@/components/Map";
import LocationForm from "@/components/LocationForm";
import { useValidation } from "@/hooks/useValidation";
import { useGeolocation } from "@/hooks/useGeolocation";

const Home = () => {
  const dispatch = useDispatch();
  const userLocation = useGeolocation();
  const [locationData, setLocationData] = useState<LocationData>({
    lat: null,
    lng: null,
    name: "",
    color: "#ff0000",
  });
  const { errors, validate } = useValidation(locationData);
  const [showInfo, setShowInfo] = useState(false);

  const handleMapClick = (e: MapClickEvent) => {
    const { latLng } = e;
    if (!latLng) return;

    const lat = latLng.lat();
    const lng = latLng.lng();

    setLocationData((prev) => ({
      ...prev,
      lat,
      lng,
    }));

    setShowInfo(true);
  };

  const handleSaveLocation = () => {
    if (!validate()) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
    const { lat, lng, name, color } = locationData;

    if (lat && lng && name && color) {
      const newLocation: Location = {
        id: crypto.randomUUID(),
        name,
        lat,
        lng,
        color,
      };
      toast.success("Location saved successfully!");
      dispatch(addLocation(newLocation));
      setLocationData({
        lat: null,
        lng: null,
        name: "",
        color: "#ff0000",
      });
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setLocationData({
      ...locationData,
      color: color.hex,
    });
  };

  const handleCloseInfoWindow = () => {
    setLocationData({
      ...locationData,
      lat: null,
      lng: null,
    });
    setShowInfo(false);
  };

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Box
        flex={{ base: "none", md: 3 }}
        w="100%"
        h={{ base: "50vh", md: "100vh" }}
        minH="350px"
      >
        <MapComponent
          center={userLocation}
          locationData={locationData}
          showInfo={showInfo}
          onMapClick={handleMapClick}
          onCloseInfo={handleCloseInfoWindow}
          onSave={handleSaveLocation}
        />
      </Box>

      <Box w="100%" maxW="300px" mx="auto" p={4}>
        <LocationForm
          locationData={locationData}
          setLocationData={setLocationData}
          handleSaveLocation={handleSaveLocation}
          handleColorChange={handleColorChange}
          type="add"
        />
      </Box>
    </Flex>
  );
};

export default Home;
