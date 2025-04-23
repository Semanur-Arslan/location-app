"use client";
import MapComponent from "@/components/Map";
import { useParams, useRouter } from "next/navigation";
import LocationForm from "@/components/location/LocationForm";
import useGeolocation from "@/hooks/useGeolocation";
import useLocationForm from "@/hooks/useLocationForm";
import useLocationActions from "@/hooks/useLocationActions";
import { toast } from "react-toastify";
import MapFormLayout from "@/components/layout/MapFormLayout";
import { useAppSelector } from "@/hooks/useReduxTypes";
import { useCallback } from "react";

const EditLocation = () => {
  const params = useParams();
  const router = useRouter();
  const { userLocation } = useGeolocation();
  const locations = useAppSelector((state) => state.location.locations);
  const locationToEdit = locations.find((loc) => loc.id === params.id);
  const id = params.id as string;
  const {
    locationData,
    setLocationData,
    showInfo,
    handleMapClick,
    handleColorChange,
    handleCloseInfoWindow,
  } = useLocationForm(locationToEdit);
  const { handleEditLocation, handleDeleteLocation } = useLocationActions();

  const onEditLocation = useCallback(() => {
    if (!id) {
      toast.error("Location ID not found.");
      return;
    }
    handleEditLocation(id, locationData);
  }, [id, locationData, handleEditLocation]);

  const onDeleteLocation = useCallback(() => {
    handleDeleteLocation(id, () => router.push(`/list`));
  }, [id, handleDeleteLocation, router]);

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
          onSave={onEditLocation}
        />
      }
      form={
        <LocationForm
          locationData={locationData}
          setLocationData={setLocationData}
          handleSaveLocation={onEditLocation}
          handleColorChange={handleColorChange}
          handleDeleteLocation={onDeleteLocation}
          type="edit"
        />
      }
    />
  );
};

export default EditLocation;
