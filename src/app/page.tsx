"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Input, Heading } from "@chakra-ui/react";
import { addLocation } from "@/store/locationSlice";
import { toast } from "react-toastify";
import { ColorResult } from "react-color";
import { LocationData, MapClickEvent } from "@/types/types";
import { Location } from "@/types/redux";
import { ColorPicker } from "@/components/ColorPicker";
import { MapComponent } from "@/components/Map";

const Home = () => {
  const dispatch = useDispatch();
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [locationData, setLocationData] = useState<LocationData>({
    lat: null,
    lng: null,
    name: "",
    color: "#ff0000",
  });
  const [showInfo, setShowInfo] = useState(false);
  const [userLocation, setUserLocation] = useState({
    lat: 41.0082,
    lng: 28.9784,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          setUserLocation({ lat: coords.latitude, lng: coords.longitude }),
        () =>
          toast.info(
            "You can enable location permissions for accurate location information."
          )
      );
    } else {
      toast.error("Geolocation API is not supported.");
    }
  }, []);

  const handleMapClick = (e: MapClickEvent) => {
    const latLng = e.latLng;
    if (!latLng || !locationData.name || !locationData.color) {
      return toast.error("Location name and color information missing");
    }
    setLocationData((prev) => ({
      ...prev,
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    setShowInfo(true);
  };

  const handleSaveLocation = () => {
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
    <Box display="flex">
      <Box flex="3">
        <MapComponent
          center={userLocation}
          locationData={locationData}
          showInfo={showInfo}
          onMapClick={handleMapClick}
          onCloseInfo={handleCloseInfoWindow}
          onSave={handleSaveLocation}
        />
      </Box>

      <Box flex="1" p={4}>
        {!googleMapsApiKey ? (
          <Box mt={4}>
            <p style={{ color: "red" }}>
              Google Maps API key is missing! Please configure the API key.
            </p>
          </Box>
        ) : (
          <>
            <Box
              minHeight="100vh"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap="4"
            >
              <Heading as="h6" size="md" color="teal.500">
                Add Location
              </Heading>

              <Box
                display="flex"
                flexDirection="column"
                gap="4"
                width="100%"
                maxWidth="400px"
              >
                <Input
                  placeholder="Location Name"
                  value={locationData.name}
                  onChange={(e) =>
                    setLocationData({
                      ...locationData,
                      name: e.target.value,
                    })
                  }
                  p={2}
                />

                <Box>
                  <ColorPicker
                    color={locationData.color}
                    onChange={handleColorChange}
                  />
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
