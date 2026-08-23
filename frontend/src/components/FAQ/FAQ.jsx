import "./FAQ.css";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How does the AI Resume Analyzer work?",
    answer:
      "Upload your resume and our AI analyzes it for ATS compatibility, strengths, weaknesses, missing skills, and provides personalized suggestions."
  },
  {
    question: "Can I match my resume with any job description?",
    answer:
      "Yes. Simply paste the job description, and the system compares it with your resume to identify matching and missing skills."
  },
  {
    question: "Is my resume stored securely?",
    answer:
      "Yes. Your resume is securely stored, and only you can access your uploaded history after logging in."
  },
  {
    question: "Does it generate interview questions?",
    answer:
      "Yes. Based on your resume and target role, the AI generates technical and HR interview questions."
  },
  {
    question: "Can beginners use this platform?",
    answer:
      "Absolutely. The platform is designed for students, freshers, and experienced professionals alike."
  }
];

function FAQ() {
  const [active, setActive] = useState(null);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <h2>Frequently Asked Questions</h2>

      <p className="faq-subtitle">
        Everything you need to know about the AI Resume Analyzer.
      </p>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            className={`faq-item ${active === index ? "active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <ChevronDown
                className={active === index ? "rotate" : ""}
              />
            </div>

            {active === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;