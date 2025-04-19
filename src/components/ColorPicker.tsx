"use client";

import dynamic from "next/dynamic";
import { ColorPickerProps } from "@/types/types";

const ChromePicker = dynamic(
  () => import("react-color/lib/components/chrome/Chrome"),
  {
    ssr: false,
  }
);

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <ChromePicker
      color={color}
      onChange={onChange}
      styles={{ default: { picker: { width: "100%" } } }}
    />
  );
};
