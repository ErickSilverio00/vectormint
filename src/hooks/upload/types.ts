import { SetStateInterface } from "@/interfaces/default";
import { RefObject } from "react";

export interface UploadInterface {
  colorInputRef: RefObject<HTMLInputElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  dragCounter: RefObject<number>;
  fillColor: string;
  setFillColor: SetStateInterface<string>;
  coloredSvg: string | null;
  setColoredSvg: SetStateInterface<string | null>;
  zoomLevel: number;
  setZoomLevel: SetStateInterface<number>;
  isSvg: boolean;
  setIsSvg: SetStateInterface<boolean>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
  resetUploader: () => void;
  applyColorsToSvg: (rawSvg: string, fill: string) => string;
  handleDownload: (typeOfImage: "svg" | "png") => void;
  zoomIn: () => void;
  zoomOut: () => void;
  flipHorizontal: () => void;
}
