/* eslint-disable react-hooks/exhaustive-deps */
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpload } from "@/hooks/upload/use-upload";
import { useUploadStore } from "@/stores/upload-store";
import {
  Download,
  FlipHorizontal,
  Minus,
  Palette,
  Plus,
  UploadIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Upload = () => {
  const { t } = useTranslation();
  const { isDragging, selectedImage, svgData } = useUploadStore();
  const {
    colorInputRef,
    fileInputRef,
    fillColor,
    setFillColor,
    coloredSvg,
    setColoredSvg,
    zoomLevel,
    isSvg,
    handleFileChange,
    triggerFileInput,
    resetUploader,
    applyColorsToSvg,
    handleDownload,
    zoomIn,
    zoomOut,
    flipHorizontal,
  } = useUpload();

  useEffect(() => {
    if (svgData) {
      const colored = applyColorsToSvg(svgData, fillColor);
      setColoredSvg(colored);
    }
  }, [svgData, fillColor]);

  return (
    <div className="h-screen flex flex-col relative">
      <Header />

      <main className="flex-1 md:mx-auto pt-4 md:pt-10 p-4">
        {!selectedImage ? (
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 transition-colors cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary"
            }`}
            role="button"
            tabIndex={0}
            onClick={triggerFileInput}
            onKeyDown={(e) => e.key === "Enter" && triggerFileInput()}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <div className="text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("upload.noSvgBlockTitle1")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("upload.noSvgBlockTitle2")}
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileInput();
                }}
                className="vector-button bg-gradient-to-r from-vector-purple to-vector-blue text-white"
              >
                {t("upload.noSvgBlockButton")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden justify-center">
            <div className="flex flex-col md:flex-row gap-4">
              {coloredSvg && (
                <div>
                  <div className="flex md:hidden mb-4 w-full justify-between">
                    <div className="flex md:hidden flex-col gap-2 w-max items-center">
                      <Button
                        variant="outline"
                        className="rounded-10 h-12 w-12"
                        onClick={resetUploader}
                      >
                        <Plus />
                      </Button>
                      <Label className="ml-0 md:ml-1 text-[10px] md:text-sm">
                        {t("upload.button5")}
                      </Label>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="flex md:hidden flex-col gap-2 w-max items-center">
                          <Button
                            variant="outline"
                            className="rounded-10 h-12 w-12 bg-green-500 text-white"
                          >
                            <Download />
                          </Button>
                          <Label className="ml-0 md:ml-1 text-[10px] md:text-sm">
                            {t("upload.button6")}
                          </Label>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleDownload("svg")}>
                          SVG
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload("png")}>
                          PNG
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex flex-col w-full md:w-[50dvw] lg:w-[35dvw] xl:w-[30dvw] h-[calc(100dvh-290px)] md:h-[55dvh] border rounded-3xl overflow-hidden">
                    {isSvg ? (
                      <div
                        className="flex-1 flex justify-center items-center p-2 overflow-auto h-full md:h-max animate-revealRight"
                        style={{
                          backgroundImage: `linear-gradient(45deg, #f8f9f9 25%, transparent 25%), linear-gradient(-45deg, #f8f9f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8f9f9 75%), linear-gradient(-45deg, transparent 75%, #f8f9f9 75%)`,
                          backgroundSize: "20px 20px",
                          backgroundPosition:
                            "0 0, 0 10px, 10px -10px, -10px 0px",
                        }}
                      >
                        <div className="w-full h-full relative overflow-hidden">
                          <div
                            className="inset-0 transition-transform duration-200 ease-in-out h-full"
                            style={{
                              transform: `scale(${zoomLevel})`,
                              transformOrigin: "center",
                            }}
                          >
                            <div
                              className="h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain"
                              dangerouslySetInnerHTML={{ __html: coloredSvg }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="h-full w-full animate-revealLeft"
                        style={{
                          transform: `scale(${zoomLevel})`,
                          transformOrigin: "center",
                        }}
                      >
                        <img
                          src={selectedImage}
                          alt="Imagem carregada"
                          className="object-cover h-full w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex md:flex-col flex-rol gap-4 md:justify-start justify-between w-full">
                <div className="flex md:flex-col flex-row md:justify-start justify-between gap-4 h-full w-full">
                  <div className="flex md:flex-row flex-col items-center gap-2 text-center">
                    <label className="relative">
                      <input
                        ref={colorInputRef}
                        type="color"
                        value={fillColor}
                        onChange={(e) => setFillColor(e.target.value)}
                        className="absolute bottom-0 opacity-0 w-0 h-0"
                      />
                      <div
                        className="p-4 w-max rounded-full border border-gray-200 flex items-center justify-center transition-colors hover:bg-accent/90 active:scale-95 cursor-pointer"
                        onClick={() => colorInputRef.current?.click()}
                      >
                        <Palette size={14.86} />
                      </div>
                    </label>
                    <Label className="ml-0 md:ml-1 text-[10px] md:text-sm">
                      {t("upload.button1")}
                    </Label>
                  </div>
                  <div className="flex md:flex-row flex-col items-center gap-2 text-center">
                    <Button
                      variant="outline"
                      className="rounded-full w-12 h-12"
                      onClick={zoomIn}
                      disabled={zoomLevel >= 2}
                    >
                      <Plus size={20} />
                    </Button>
                    <Label className="ml-0 md:ml-1 text-[10px] md:text-sm">
                      {t("upload.button2")}
                    </Label>
                  </div>
                  <div className="flex md:flex-row flex-col items-center gap-2 text-center">
                    <Button
                      variant="outline"
                      className="rounded-full w-12 h-12"
                      onClick={zoomOut}
                      disabled={zoomLevel <= 0.5}
                    >
                      <Minus size={20} />
                    </Button>
                    <Label className="ml-0 md:ml-1 text-[10px] md:text-sm">
                      {t("upload.button3")}
                    </Label>
                  </div>
                  <div className="flex md:flex-row flex-col items-center gap-2 text-center">
                    <Button
                      variant="outline"
                      className="rounded-full w-12 h-12"
                      onClick={flipHorizontal}
                    >
                      <FlipHorizontal size={20} />
                    </Button>
                    <Label className="ml-0 md:ml-1 text-[10px] md:text-sm">
                      {isSvg
                        ? `${t("upload.button4Opt1")}`
                        : `${t("upload.button4Opt2")}`}
                    </Label>
                  </div>
                </div>
                <div className="hidden md:flex md:flex-row flex-col items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button className="w-auto vector-button bg-green-500 hover:bg-green-600 text-white">
                        <Download />
                        {t("upload.button6")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleDownload("svg")}>
                        SVG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload("png")}>
                        PNG
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="absolute bottom-6 left-8 hidden md:flex">
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              className="rounded-10 h-16 w-16"
              onClick={resetUploader}
            >
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p> {t("upload.button5")}</p>
          </TooltipContent>
        </Tooltip>
      </footer>
    </div>
  );
};

export default Upload;
