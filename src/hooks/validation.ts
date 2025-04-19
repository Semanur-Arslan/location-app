import { useState } from "react";
import { LocationData } from "@/types/types";
import { ValidationErrors } from "@/types/types";

export const useLocationValidation = (locationData: LocationData) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (): boolean => {
    const validationErrors: ValidationErrors = {};

    if (!locationData.name) {
      validationErrors.name = "Location name is required.";
    }

    if (!locationData.color) {
      validationErrors.color = "Location color is required.";
    }

    if (locationData.lat === null || locationData.lng === null) {
      validationErrors.location = "Location must be selected on the map.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return { errors, validate };
};
