import { Card, CardContent } from "@/components/ui/card";
import { Download, FileImage, PenTool } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: FileImage,
      title: `${t("home.howItWorksSection.cardTitle1")}`,
      description: `${t("home.howItWorksSection.cardDescription1")}`,
      color: "from-vector-purple to-vector-blue",
    },
    {
      icon: PenTool,
      title: `${t("home.howItWorksSection.cardTitle2")}`,
      description: `${t("home.howItWorksSection.cardDescription2")}`,
      color: "from-vector-blue to-vector-teal",
    },
    {
      icon: Download,
      title: `${t("home.howItWorksSection.cardTitle3")}`,
      description: `${t("home.howItWorksSection.cardDescription3")}`,
      color: "from-vector-teal to-vector-purple",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-white to-secondary/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.howItWorksSection.titlePart1")}{" "}
            <span className="vector-gradient-text">
              {t("home.howItWorksSection.titlePart2")}
            </span>
          </h2>
          <p className="text-muted-foreground">
            {t("home.howItWorksSection.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="vector-card overflow-hidden hover:translate-y-[-5px] transition-transform duration-300"
            >
              <CardContent className="p-6 relative">
                <div
                  className={`mb-5 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>

                <div className="absolute top-6 right-6 text-4xl font-bold text-gray-100">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
