"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";
import MapComponent from "@/components/Map";
import { useParams, useRouter } from "next/navigation";
import LocationForm from "@/components/location/LocationForm";
import useGeolocation from "@/hooks/useGeolocation";
import useLocationForm from "@/hooks/useLocationForm";
import useLocationActions from "@/hooks/useLocationActions";
import { toast } from "react-toastify";
import MapFormLayout from "@/components/layout/MapFormLayout";

const EditLocation = () => {
  const params = useParams();
  const router = useRouter();
  const userLocation = useGeolocation();
  const locations = useSelector((state: RootState) => state.location.locations);
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

  const onEditLocation = () => {
    if (!id) {
      toast.error("Location ID not found.");
      return;
    }
    handleEditLocation(id, locationData);
  };

  const onDeleteLocation = () => {
    handleDeleteLocation(id, () => router.push(`/list`));
  };

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
