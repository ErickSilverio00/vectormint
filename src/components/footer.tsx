import { Heart, Github, Twitter, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary/30 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold vector-gradient-text">
              VectorMint
            </span>
            <p className="text-muted-foreground mt-4 mb-4 max-w-md">
              {t("footer.description")}
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{t("footer.shorDescriptionLeft1")}</span>
              <Heart
                size={14}
                className="mx-1 text-vector-purple"
                fill="currentColor"
              />
              <span>{t("footer.shorDescriptionLeft2")}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.title1")}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.optionId1")}
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.optionId2")}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.optionId3")}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.optionId4")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.title2")}</h4>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/ericksilverio00"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://github.com/ErickSilverio00"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ericksilverio"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p>
            {t("footer.copyright1")}{" "}
            <a
              href="https://www.linkedin.com/in/ericksilverio"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Erick Silvério
            </a>
            {t("footer.copyright2")} {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
