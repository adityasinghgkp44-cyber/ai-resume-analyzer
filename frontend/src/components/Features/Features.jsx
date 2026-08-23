import "./Features.css";
import { motion } from "framer-motion";
import {
  ScanSearch,
  FileCheck,
  BrainCircuit,
  Briefcase,
  GraduationCap,
  MessageCircleCode,
} from "lucide-react";

const features = [
  {
    icon: <ScanSearch size={38} />,
    title: "ATS Score",
    text: "Calculate an ATS score to understand how well your resume is optimized for applicant tracking systems.",
  },
  {
    icon: <FileCheck size={38} />,
    title: "Resume Analysis",
    text: "Receive AI-powered feedback on strengths, weaknesses, formatting, and missing information.",
  },
  {
    icon: <Briefcase size={38} />,
    title: "Job Matching",
    text: "Compare your resume with any job description and identify missing skills instantly.",
  },
  {
    icon: <BrainCircuit size={38} />,
    title: "Interview Questions",
    text: "Generate personalized technical and HR interview questions based on your resume.",
  },
  {
    icon: <GraduationCap size={38} />,
    title: "Learning Roadmap",
    text: "Receive a personalized roadmap with projects and courses to improve missing skills.",
  },
  {
    icon: <MessageCircleCode size={38} />,
    title: "Career Guidance",
    text: "Get AI-powered recommendations to improve your chances of landing your dream job.",
  },
];

function Features() {
  return (
    <section className="features-section" id="features">

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Powerful Features
      </motion.h2>

      <motion.p
        className="features-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Everything you need to build a stronger resume and prepare for your career.
      </motion.p>

      <div className="feature-grid">

        {features.map((feature, index) => (
          <motion.div
            className="feature-card"
            key={index}
            whileHover={{
              y: -12,
              scale: 1.03,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.text}</p>
          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default Features;