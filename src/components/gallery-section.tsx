import { useTranslation } from "react-i18next";
import BusinessImagePng from "@/assets/business-image.jpg";
import BusinessImageSvg from "@/assets/business-image-vectormint.svg";
import SimpleIconPng from "@/assets/simple-icon.png";
import SimpleIconSvg from "@/assets/simple-icon-vectormint.svg";
import ArtisticImagePng from "@/assets/artistic-image.jpg";
import ArtisticImageSvg from "@/assets/artistic-image-vectormint.svg";

const GallerySection = () => {
  const { t } = useTranslation();

  const filteredItems = [
    {
      id: 1,
      title: `${t("home.gallerySection.cardTitle1")}`,
      beforeImg: BusinessImagePng,
      afterImg: BusinessImageSvg,
      description: `${t("home.gallerySection.cardDescription1")}`,
    },
    {
      id: 2,
      title: `${t("home.gallerySection.cardTitle2")}`,
      beforeImg: SimpleIconPng,
      afterImg: SimpleIconSvg,
      description: `${t("home.gallerySection.cardDescription2")}`,
    },
    {
      id: 3,
      title: `${t("home.gallerySection.cardTitle3")}`,
      beforeImg: ArtisticImagePng,
      afterImg: ArtisticImageSvg,
      description: `${t("home.gallerySection.cardDescription3")}`,
    },
  ];

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.gallerySection.titlePart1")}
            <span className="vector-gradient-text">
              {t("home.gallerySection.titlePart2")}
            </span>
          </h2>
          <p className="text-muted-foreground">
            {t("home.gallerySection.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="vector-card overflow-hidden">
              <div className="relative group">
                <img
                  src={`${item.beforeImg}?w=600&h=400&fit=crop`}
                  alt={`${item.title} antes`}
                  className="w-full h-48 object-contain transition-opacity duration-500 group-hover:opacity-0"
                />
                <img
                  src={`${item.afterImg}?w=600&h=400&fit=crop`}
                  alt={`${item.title} depois`}
                  className="w-full h-48 object-contain absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
