"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import { updateLocation } from "@/store/locationSlice";
import { toast } from "react-toastify";
import { ColorResult } from "react-color";
import { LocationData } from "@/types/types";
import { Location } from "@/types/redux";
import { MapComponent } from "@/components/Map";
import { useParams } from "next/navigation";
import { RootState } from "@/types/redux";
import { MapClickEvent } from "@/types/types";
import LocationForm from "@/components/LocationForm";

const EditLocation = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const locations = useSelector((state: RootState) => state.location.locations);

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
        <LocationForm
          locationData={locationData}
          setLocationData={setLocationData}
          handleSaveLocation={handleSaveLocation}
          handleColorChange={handleColorChange}
        />
      </Box>
    </Box>
  );
};

export default EditLocation;
