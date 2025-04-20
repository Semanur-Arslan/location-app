import { useState } from "react";
import { LocationData } from "@/types/types";
import { ValidationErrors } from "@/types/types";

export const useValidation = (locationData: LocationData) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (): boolean => {
    const validationErrors: ValidationErrors = {};

    if (!locationData.name?.trim() || !locationData.color) {
      validationErrors.fields = "Location name and color are required.";
    }

    if (!locationData.lat || !locationData.lng) {
      validationErrors.location = "Location must be selected on the map.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  return { errors, validate };
};
