import "./Hero.css";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, FileText, BarChart3, Brain } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-left">

        <motion.span
          className="badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🚀 AI Powered Career Assistant
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Build a Resume That
          <span> Gets You Hired.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Analyze resumes, calculate ATS scores, match job descriptions,
          generate interview questions, and receive personalized learning
          roadmaps—all powered by AI.
        </motion.p>

        <div className="hero-buttons">

          <Link to="/register">
            <button className="primary-btn">
              Get Started
              <ArrowRight size={18} />
            </button>
          </Link>

          <button className="secondary-btn">
            <PlayCircle size={18} />
            Watch Demo
          </button>

        </div>

      </div>

      <motion.div
        className="hero-right"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >

        <div className="glass-card card1">
          <FileText size={28} />
          <h3>Resume Analysis</h3>
          <p>AI checks your resume instantly.</p>
        </div>

        <div className="glass-card card2">
          <BarChart3 size={28} />
          <h3>ATS Score</h3>
          <h2>92%</h2>
        </div>

        <div className="glass-card card3">
          <Brain size={28} />
          <h3>AI Roadmap</h3>
          <p>Personalized learning path.</p>
        </div>

      </motion.div>

    </section>
  );
}

export default Hero;