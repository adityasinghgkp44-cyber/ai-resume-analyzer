import "./Footer.css";

import {
  BrainCircuit,
  Mail,
  ArrowRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer" id="contact">

      <div className="footer-container">

        <div className="footer-about">

          <div className="footer-logo">
            <BrainCircuit size={36} />
            <span>AI Resume Analyzer</span>
          </div>

          <p>
            Your personal AI career coach.
            Analyze resumes, improve ATS score,
            match jobs, prepare interviews,
            and build a learning roadmap.
          </p>

          <div className="social-icons">
            <a href="mailto:your@email.com">
              <Mail size={22} />
            </a>
          </div>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#faq">FAQ</a>

        </div>

        <div className="footer-links">

          <h3>Resources</h3>

          <a href="#">Documentation</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Support</a>

        </div>

        <div className="newsletter">

          <h3>Stay Updated</h3>

          <p>
            Get the latest AI career tips directly in your inbox.
          </p>

          <div className="newsletter-box">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>
              <ArrowRight size={20} />
            </button>

          </div>

        </div>

      </div>

      <div className="copyright">
        © 2026 AI Resume Analyzer. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;