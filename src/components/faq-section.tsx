import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: `${t("home.faqSection.question1")}`,
      answer: `${t("home.faqSection.answer1")}`,
    },
    {
      question: `${t("home.faqSection.question2")}`,
      answer: `${t("home.faqSection.answer2")}`,
    },
    {
      question: `${t("home.faqSection.question3")}`,
      answer: `${t("home.faqSection.answer3")}`,
    },
    {
      question: `${t("home.faqSection.question4")}`,
      answer: `${t("home.faqSection.answer4")}`,
    },
    {
      question: `${t("home.faqSection.question5")}`,
      answer: `${t("home.faqSection.answer5")}`,
    },
    {
      question: `${t("home.faqSection.question6")}`,
      answer: `${t("home.faqSection.answer6")}`,
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 bg-gradient-to-b from-secondary/30 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.faqSection.titlePart1")}{" "}
            <span className="vector-gradient-text">
              {t("home.faqSection.titlePart2")}
            </span>
          </h2>
          <p className="text-muted-foreground">
            {t("home.faqSection.description")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="vector-card my-3 px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 pr-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
