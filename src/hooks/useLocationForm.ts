import { useState, useEffect } from "react";
import { LocationData, MapClickEvent } from "@/types/types";
import { ColorResult } from "react-color";

const useLocationForm = (initialData?: LocationData) => {
  const defaultData: LocationData = {
    lat: null,
    lng: null,
    name: "",
    color: "#ff0000",
  };

  const [locationData, setLocationData] = useState<LocationData>(
    initialData || defaultData
  );
  const [showInfo, setShowInfo] = useState<boolean>(
    !!(initialData?.lat && initialData?.lng)
  );

  useEffect(() => {
    if (initialData) {
      setLocationData(initialData);
      if (initialData.lat !== null && initialData.lng !== null) {
        setShowInfo(true);
      }
    }
  }, [initialData]);

  const handleMapClick = (e: MapClickEvent) => {
    const latLng = e.latLng;
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

  const handleColorChange = (color: ColorResult) => {
    setLocationData((prev) => ({
      ...prev,
      color: color.hex,
    }));
  };

  const handleCloseInfoWindow = () => {
    setLocationData((prev) => ({
      ...prev,
      lat: null,
      lng: null,
    }));
    setShowInfo(false);
  };

  const resetForm = () => {
    setLocationData(defaultData);
    setShowInfo(false);
  };

  return {
    locationData,
    setLocationData,
    showInfo,
    handleMapClick,
    handleColorChange,
    handleCloseInfoWindow,
    resetForm,
  };
};

export default useLocationForm;
