import { create } from "zustand";

interface UploadStore {
  isDragging: boolean;
  selectedImage: string | null;
  isProcessing: boolean;
  isComplete: boolean;
  svgData: string | null;
  originalFileName: string | null;
  setIsDragging: (drag: boolean) => void;
  setSelectedImage: (image: string | null) => void;
  setIsProcessing: (processing: boolean) => void;
  setIsComplete: (complete: boolean) => void;
  setSvgData: (data: string | null) => void;
  setOriginalFileName: (data: string | null) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  isDragging: false,
  selectedImage: null,
  isProcessing: false,
  isComplete: false,
  svgData: null,
  originalFileName: null,
  setIsDragging: (drag) => set({ isDragging: drag }),
  setSelectedImage: (image) => set({ selectedImage: image }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setIsComplete: (complete) => set({ isComplete: complete }),
  setSvgData: (data) => set({ svgData: data }),
  setOriginalFileName: (data) => set({ originalFileName: data }),
}));
