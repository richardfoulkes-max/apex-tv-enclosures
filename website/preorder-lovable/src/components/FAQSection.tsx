import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What TVs does it work with?",
      answer: "The ATE-75 fits any TV from 70\" to 77\" — Samsung, LG, Sony, TCL, or any other brand. You choose the TV that fits your budget and preferences. When you want to upgrade your TV later, simply swap it out. The enclosure stays.",
    },
    {
      question: "How does it handle the extreme Gulf heat?",
      answer: "We use 3 industrial fans that deliver 3× more cooling than typical enclosures. The system is temperature-controlled: it automatically adjusts fan speed based on internal temperature, keeping your TV within safe operating ranges even when ambient temperatures hit 55°C.",
    },
    {
      question: "Is the deposit fully refundable?",
      answer: "Yes, 100%. If you change your mind for any reason before your unit ships, we'll refund your AED 375 deposit in full. No questions asked.",
    },
    {
      question: "When will it ship?",
      answer: "The first batch of 50 units is scheduled to ship Q2 2026. Pre-order customers get priority placement and founding customer pricing (25% off retail).",
    },
    {
      question: "What does the 5-year warranty cover?",
      answer: "Our warranty covers all enclosure components including the cooling system, seals, hinges, and housing. If anything fails under normal use, we repair or replace it. Note: The warranty covers the enclosure, not the TV you put inside it — that's covered by your TV manufacturer's warranty.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Common Questions
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Everything you need to know.
        </p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 border-none shadow-soft"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
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
