import { useUploadStore } from "@/stores/upload-store";
import { useTranslation } from "react-i18next";

export default function HoldingImage() {
  const { isDragging } = useUploadStore();
  const { t } = useTranslation();

  if (!isDragging) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-r from-vector-purple/70 to-vector-blue/70 flex items-center justify-center">
      <div className="absolute top-10 left-10 w-12 h-12 border-t-8 border-l-8 border-white rounded-tl-xl" />
      <div className="absolute top-10 right-10 w-12 h-12 border-t-8 border-r-8 border-white rounded-tr-xl" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b-8 border-l-8 border-white rounded-bl-xl" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b-8 border-r-8 border-white rounded-br-xl" />

      <div className="px-6 py-4 rounded-xl">
        <p className="text-6xl font-bold text-center text-white">
          {t("holdImage.description")}
        </p>
      </div>
    </div>
  );
}
