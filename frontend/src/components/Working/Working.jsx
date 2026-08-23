import "./Working.css";
import { motion } from "framer-motion";
import {
  Upload,
  BrainCircuit,
  FileSearch,
  BarChart3,
  GraduationCap,
  Briefcase
} from "lucide-react";

const steps = [
  {
    icon: <Upload size={34} />,
    title: "Upload Resume",
    desc: "Upload your PDF or DOC resume securely."
  },
  {
    icon: <BrainCircuit size={34} />,
    title: "AI Resume Analysis",
    desc: "AI identifies strengths, weaknesses and important skills."
  },
  {
    icon: <BarChart3 size={34} />,
    title: "ATS Score",
    desc: "Check how ATS-friendly your resume is."
  },
  {
    icon: <FileSearch size={34} />,
    title: "Job Matching",
    desc: "Compare your resume with any job description."
  },
  {
    icon: <GraduationCap size={34} />,
    title: "Learning Roadmap",
    desc: "Get personalized projects and learning resources."
  },
  {
    icon: <Briefcase size={34} />,
    title: "Interview Preparation",
    desc: "Practice AI-generated interview questions."
  }
];

function Working() {
  return (
    <section className="how-section" id="how">

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        How It Works
      </motion.h2>

      <p className="how-subtitle">
        Six simple steps to improve your resume and prepare for your dream job.
      </p>

      <div className="timeline">

        {steps.map((step, index) => (

          <motion.div
            className="timeline-card"
            key={index}
            whileHover={{
              scale: 1.04,
              y: -10
            }}
          >

            <div className="timeline-icon">
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.desc}</p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default Working;
