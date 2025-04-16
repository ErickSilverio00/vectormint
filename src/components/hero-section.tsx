import { useUpload } from "@/hooks/upload/use-upload";
import { useUploadStore } from "@/stores/upload-store";
import { ArrowDown, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const HeroSection = () => {
  const { isDragging } = useUploadStore();
  const { fileInputRef, handleFileChange, triggerFileInput } = useUpload();
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-10 md:pt-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-vector-purple/20 via-vector-blue/10 to-vector-teal/5 rounded-b-[50%] opacity-70"></div>
        <div className="dot-pattern absolute inset-0 opacity-[0.15]"></div>
      </div>

      <div className="absolute top-20 right-[10%] w-64 h-64 bg-vector-blue/10 rounded-full filter blur-3xl animate-pulse-soft"></div>
      <div
        className="absolute bottom-20 left-[5%] w-72 h-72 bg-vector-purple/10 rounded-full filter blur-3xl animate-pulse-soft"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t("home.heroSection.titlePart1")}
            <span className="vector-gradient-text mt-2">
              {" "}
              {t("home.heroSection.titlePart2")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            {t("home.heroSection.description")}
          </p>

          <div
            className={`relative border-2 border-dashed rounded-xl p-12 transition-colors cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary"
            }`}
            role="button"
            tabIndex={0}
            onClick={triggerFileInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") triggerFileInput();
            }}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("home.heroSection.blockTitle1")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("home.heroSection.blockTitle2")}
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileInput();
                }}
                className="vector-button bg-gradient-to-r from-vector-purple to-vector-blue text-white"
              >
                {t("home.heroSection.blockButton")}
              </Button>
            </div>
          </div>

          <div className="mt-16 animate-bounce">
            <a
              href="#how-it-works"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <span className="mr-2"> {t("home.heroSection.tip")}</span>
              <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
