"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@chakra-ui/react";
import { addLocation } from "@/store/locationSlice";
import { toast } from "react-toastify";
import { ColorResult } from "react-color";
import { LocationData, MapClickEvent, LatLngLiteral } from "@/types/types";
import { Location } from "@/types/redux";
import { MapComponent } from "@/components/Map";
import LocationForm from "@/components/LocationForm";

const Home = () => {
  const dispatch = useDispatch();
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [locationData, setLocationData] = useState<LocationData>({
    lat: null,
    lng: null,
    name: "",
    color: "#ff0000",
  });
  const [userLocation, setUserLocation] = useState<LatLngLiteral>({
    lat: 41.0082,
    lng: 28.9784,
  });
  const [showInfo, setShowInfo] = useState(false);

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
    if (!latLng)
      return toast.error("Location information could not be obtained");
    if (!locationData.name) return toast.error("Name is required.");
    if (!locationData.color) return toast.error("Color is required.");
    setLocationData((prev) => ({
      ...prev,
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    setShowInfo(true);
  };

  const handleSaveLocation = () => {
    const { lat, lng, name, color } = locationData;
    if (!name) {
      return toast.error("Location name is required.");
    }
    if (!color) {
      return toast.error("Location color is required.");
    }
    if (!lat || !lng) {
      return toast.error("Location must be selected on the map.");
    }

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
          <LocationForm
            locationData={locationData}
            setLocationData={setLocationData}
            handleSaveLocation={handleSaveLocation}
            handleColorChange={handleColorChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;
