"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Box } from "@chakra-ui/react";
import { updateLocation, removeLocation } from "@/store/locationSlice";
import { toast } from "react-toastify";
import { ColorResult } from "react-color";
import { LocationData, MapClickEvent } from "@/types/types";
import { Location, RootState } from "@/types/redux";
import { MapComponent } from "@/components/Map";
import { useParams, useRouter } from "next/navigation";
import LocationForm from "@/components/LocationForm";
import { useValidation } from "@/hooks/useValidation";
import { useGeolocation } from "@/hooks/useGeolocation";

const EditLocation = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const userLocation = useGeolocation();
  const locations = useSelector((state: RootState) => state.location.locations);

  const [locationData, setLocationData] = useState<LocationData>({
    lat: null,
    lng: null,
    name: "",
    color: "#ff0000",
  });
  const { errors, validate } = useValidation(locationData);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (params.id) {
      const location = locations.find((loc) => loc.id === params.id);
      if (location) {
        setLocationData({
          name: location.name,
          lat: location.lat,
          lng: location.lng,
          color: location.color,
        });
        setShowInfo(true);
      }
    }
  }, [params.id, locations]);

  const handleMapClick = (e: MapClickEvent) => {
    const latLng = e.latLng;
    if (!latLng) return;
    setLocationData((prev) => ({
      ...prev,
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    setShowInfo(true);
  };

  const handleSaveLocation = () => {
    const { lat, lng, name, color } = locationData;
    if (!validate()) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
    if (lat && lng && name && color) {
      const updatedLocation: Location = {
        id: params.id as string,
        name,
        lat,
        lng,
        color,
      };
      toast.success("Location updated successfully!");
      dispatch(updateLocation(updatedLocation));
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

  const handleDeleteLocation = () => {
    if (params.id) {
      const id = params.id.toString();
      dispatch(removeLocation(id));
      toast.success("Location deleted successfully!");
      router.push(`/list`);
    } else {
      toast.error("Location not found.");
    }
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
          center={
            locationData.lat && locationData.lng
              ? { lat: locationData.lat, lng: locationData.lng }
              : userLocation
          }
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
          handleDeleteLocation={handleDeleteLocation}
          type="edit"
        />
      </Box>
    </Flex>
  );
};

export default EditLocation;
