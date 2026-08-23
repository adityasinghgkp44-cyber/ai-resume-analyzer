import "./ResumeDetails.css";

import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  FileText,
  BrainCircuit,
  Target,
  ArrowLeft,
} from "lucide-react";

import ExportPDF from "../../components/ExportPDF/ExportPDF";
import ATSGauge from "../../components/ATSGauge/ATSGauge";

function ResumeDetails() {
  const navigate = useNavigate();
  const { state: resume } = useLocation();

  if (!resume) {
    return (
      <DashboardLayout>
        <h2>No Resume Selected</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="resume-details-page"
        id="analysis-report"
      >
        <div className="details-header">
          <div>
            <h1>{resume.resume_name}</h1>
            <p>{resume.role}</p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/history")}
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        <div className="details-grid">

          <div className="glass-card ats-card">

            <h2>
              <Target />
              ATS Score
            </h2>

            <ATSGauge score={resume.ats_score} />

            <h3>{resume.ats_score}%</h3>

          </div>

          <div className="glass-card">

            <h2>
              <FileText />
              Resume Info
            </h2>

            <p>
              <strong>Candidate Type:</strong>{" "}
              {resume.candidate_type}
            </p>

            <p>
              <strong>Role:</strong> {resume.role}
            </p>

            <p>
              <strong>Matched Skills:</strong>{" "}
              {resume.matched_skills?.length || 0}
            </p>

            <p>
              <strong>Missing Skills:</strong>{" "}
              {resume.missing_skills?.length || 0}
            </p>

          </div>

        </div>

        <div className="glass-card">
          <h2>Matched Skills</h2>

          <div className="skills-container">
            {resume.matched_skills?.map((skill, index) => (
              <span
                key={index}
                className="skill-chip"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h2>Missing Skills</h2>

          <div className="skills-container">
            {resume.missing_skills?.map((skill, index) => (
              <span
                key={index}
                className="skill-chip missing"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h2>
            <BrainCircuit />
            Strengths
          </h2>

          <ul>
            {resume.analysis?.strengths?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="glass-card">
          <h2>Weaknesses</h2>

          <ul>
            {resume.analysis?.weaknesses?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="glass-card">
          <h2>Suggestions</h2>

          <ul>
            {resume.analysis?.suggestions?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="glass-card">
          <h2>Interview Questions</h2>

          <ul>
            {resume.analysis?.interview_questions?.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        <div className="action-buttons">

          <ExportPDF targetId="analysis-report" />

          <button
            onClick={() =>
              navigate("/roadmap", {
                state: resume,
              })
            }
          >
            View Roadmap
          </button>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResumeDetails;