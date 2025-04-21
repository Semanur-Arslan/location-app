import { useState } from "react";
import { LocationData, ValidationErrors } from "@/types/types";
import { toast } from "react-toastify";

const useValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (locationData: LocationData): boolean => {
    const validationErrors: ValidationErrors = {};

    if (!locationData.name?.trim() || !locationData.color) {
      validationErrors.fields = "Location name and color are required.";
    }

    if (!locationData.lat || !locationData.lng) {
      validationErrors.location = "Location must be selected on the map.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach((error) => {
        toast.error(error);
      });
    }

    return Object.keys(validationErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidation;
