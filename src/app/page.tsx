"use client";
import MapComponent from "@/components/Map";
import LocationForm from "@/components/location/LocationForm";
import useGeolocation from "@/hooks/useGeolocation";
import useLocationForm from "@/hooks/useLocationForm";
import useLocationActions from "@/hooks/useLocationActions";
import MapFormLayout from "@/components/layout/MapFormLayout";
import { useCallback } from "react";

const Home = () => {
  const { userLocation } = useGeolocation();
  const {
    locationData,
    setLocationData,
    showInfo,
    handleMapClick,
    handleColorChange,
    handleCloseInfoWindow,
    resetForm,
  } = useLocationForm();
  const { handleAddLocation } = useLocationActions();

  const onAddLocation = useCallback(() => {
    handleAddLocation(locationData, resetForm);
  }, [locationData, resetForm, handleAddLocation]);

  return (
    <MapFormLayout
      map={
        <MapComponent
          mode="add"
          center={userLocation}
          locationData={locationData}
          showInfo={showInfo}
          onMapClick={handleMapClick}
          onCloseInfo={handleCloseInfoWindow}
          onSave={onAddLocation}
        />
      }
      form={
        <LocationForm
          locationData={locationData}
          setLocationData={setLocationData}
          handleSaveLocation={onAddLocation}
          handleColorChange={handleColorChange}
          type="add"
        />
      }
    />
  );
};

export default Home;
