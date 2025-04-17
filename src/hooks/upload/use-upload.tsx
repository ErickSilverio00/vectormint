/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { vectorizeImage } from "@/services/potrace";
import { useUploadStore } from "@/stores/upload-store";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { UploadInterface } from "./types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UploadContext = createContext<UploadInterface>({} as UploadInterface);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    setIsDragging,
    setSelectedImage,
    setIsProcessing,
    setIsComplete,
    svgData,
    setSvgData,
    originalFileName,
    setOriginalFileName,
  } = useUploadStore();

  const colorInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const [fillColor, setFillColor] = useState("#000000");
  const [coloredSvg, setColoredSvg] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isSvg, setIsSvg] = useState(true);

  React.useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current++;

      if (dragCounter.current === 1) {
        setIsDragging(true);
      }
    };

    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current--;

      if (dragCounter.current <= 0) {
        setIsDragging(false);
      }
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setIsDragging(false);

      const file = e.dataTransfer?.files?.[0];
      if (file) processFile(file);
    };

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("drop", onDrop);

    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/png"];
    if (!file.type || !allowedTypes.includes(file.type)) {
      toast.error(t("toasts.invalidTypeImage"));
      return;
    }

    setIsProcessing(true);
    setIsComplete(false);
    setSvgData(null);
    setSelectedImage(URL.createObjectURL(file));
    setOriginalFileName(file.name);

    try {
      const result = await vectorizeImage(file);
      setSvgData(result.svgPath);
      setIsComplete(true);
      navigate("/upload");
    } catch (error) {
      toast.error(`${t("toasts.genericError")} ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const resetUploader = () => {
    setSelectedImage(null);
    setIsComplete(false);
    setSvgData(null);
    setColoredSvg(null);
    setIsSvg(true);
    setFillColor("#000000");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  const handleDownload = async (format: "svg" | "png") => {
    if (!svgData) {
      toast.error(t("toasts.noSvg"));
      return;
    }

    const finalSvg = applyColorsToSvg(svgData, fillColor);
    const cleanName = originalFileName?.replace(/\.[^/.]+$/, "") || "imagem";

    if (format === "svg") {
      const blob = new Blob([finalSvg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cleanName}-vectormint.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === "png") {
      const svgBlob = new Blob([finalSvg], { type: "image/svg+xml" });
      const svgUrl = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          toast.error("Erro ao processar o canvas.");
          return;
        }

        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = pngUrl;
            a.download = `${cleanName}-vectormint.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(pngUrl);
          }
        }, "image/png");

        URL.revokeObjectURL(svgUrl);
      };

      img.onerror = () => {
        toast.error("Erro ao carregar a imagem SVG para converter.");
        URL.revokeObjectURL(svgUrl);
      };

      img.src = svgUrl;
    }
  };

  const applyColorsToSvg = (rawSvg: string, fill: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg, "image/svg+xml");
    const svg = doc.querySelector("svg");

    if (svg) {
      svg.removeAttribute("style");
      const paths = svg.querySelectorAll("path");
      paths.forEach((path) => {
        path.setAttribute("fill", fill);
      });
    }

    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc);
  };

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.1));

  const flipHorizontal = () => {
    if (isSvg) {
      setIsSvg(false);
    } else {
      setIsSvg(true);
    }
  };

  const values = useMemo(
    () => ({
      colorInputRef,
      fileInputRef,
      dragCounter,
      fillColor,
      setFillColor,
      coloredSvg,
      setColoredSvg,
      zoomLevel,
      setZoomLevel,
      isSvg,
      setIsSvg,
      handleFileChange,
      triggerFileInput,
      resetUploader,
      applyColorsToSvg,
      handleDownload,
      zoomIn,
      zoomOut,
      flipHorizontal,
    }),
    [fillColor, coloredSvg, zoomLevel, isSvg]
  );

  return (
    <UploadContext.Provider value={values}>{children}</UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);
