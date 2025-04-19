"use client";

import dynamic from "next/dynamic";
import { ColorResult } from "react-color";

const ChromePicker = dynamic(
  () => import("react-color/lib/components/chrome/Chrome"),
  {
    ssr: false,
  }
);

type Props = {
  color: string;
  onChange: (color: ColorResult) => void;
};

export const ColorPicker = ({ color, onChange }: Props) => {
  return (
    <ChromePicker
      color={color}
      onChange={onChange}
      styles={{ default: { picker: { width: "100%" } } }}
    />
  );
};
