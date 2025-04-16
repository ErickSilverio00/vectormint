import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const languageOptions = [
    {
      value: "pt",
      label: "Português",
      flag: "https://flagicons.lipis.dev/flags/4x3/br.svg",
    },
    {
      value: "en",
      label: "English",
      flag: "https://flagicons.lipis.dev/flags/4x3/us.svg",
    },
    {
      value: "es",
      label: "Español",
      flag: "https://flagicons.lipis.dev/flags/4x3/es.svg",
    },
  ];

  const renderLanguageLabel = (value: string) => {
    const lang = languageOptions.find((l) => l.value === value);
    return lang ? (
      <div className="flex items-center space-x-2">
        <img src={lang.flag} alt={lang.label} className="w-5 h-5" />
        <span>{lang.label}</span>
      </div>
    ) : (
      value
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold vector-gradient-text">
              VectorMint
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="/#how-it-works"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            {t("header.option1")}
          </a>
          <a
            href="/#gallery"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            {t("header.option2")}
          </a>
          <a
            href="/#faq"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            {t("header.option3")}
          </a>

          <Select
            value={i18n.language}
            onValueChange={(val) => changeLanguage(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Idioma">
                {renderLanguageLabel(i18n.language)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <div className="flex items-center space-x-2">
                    <img src={lang.flag} alt={lang.label} className="w-5 h-5" />
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </nav>

        <button
          className="md:hidden p-2 rounded-md"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            <a
              href="/#how-it-works"
              className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.option1")}
            </a>
            <a
              href="/#gallery"
              className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.option2")}
            </a>
            <a
              href="/#faq"
              className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.option3")}
            </a>

            <Select
              value={i18n.language}
              onValueChange={(val) => changeLanguage(val)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Idioma">
                  {renderLanguageLabel(i18n.language)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center space-x-2">
                      <img
                        src={lang.flag}
                        alt={lang.label}
                        className="w-5 h-5"
                      />
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
