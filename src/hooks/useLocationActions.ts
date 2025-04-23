import {
  addLocation,
  updateLocation,
  removeLocation,
} from "@/store/locationSlice";
import { Location } from "@/types/redux";
import { toast } from "react-toastify";
import useValidation from "@/hooks/useValidation";
import {
  AddLocationHandler,
  EditLocationHandler,
  DeleteLocationHandler,
} from "@/types/types";
import { useAppDispatch } from "./useReduxTypes";

const useLocationActions = () => {
  const dispatch = useAppDispatch();
  const { validate } = useValidation();

  const handleAddLocation: AddLocationHandler = (locationData, resetForm) => {
    if (!validate(locationData)) return;

    const newLocation: Location = {
      ...locationData,
      id: crypto.randomUUID(),
      lat: locationData.lat!,
      lng: locationData.lng!,
    };

    dispatch(addLocation(newLocation));
    toast.success("Location saved successfully!");
    if (resetForm) resetForm();
  };

  const handleEditLocation: EditLocationHandler = (id, locationData) => {
    if (!validate(locationData)) return;

    const updatedLocation: Location = {
      ...locationData,
      id,
      lat: locationData.lat!,
      lng: locationData.lng!,
    };

    dispatch(updateLocation(updatedLocation));
    toast.success("Location updated successfully!");
  };

  const handleDeleteLocation: DeleteLocationHandler = (id, redirect) => {
    if (!id) {
      toast.error("Location not found.");
      return;
    }
    dispatch(removeLocation(id));
    toast.success("Location deleted successfully!");
    if (redirect) redirect();
  };

  return {
    handleAddLocation,
    handleEditLocation,
    handleDeleteLocation,
  };
};

export default useLocationActions;
