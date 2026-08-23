import "./MatchJD.css";

import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { matchJobDescription } from "../../services/jobService";
import { toast } from "react-hot-toast";
import { Briefcase, CheckCircle, XCircle } from "lucide-react";

function MatchJD() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!resumeText.trim()) {
      toast.error("Paste your resume text.");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Paste the job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await matchJobDescription(
        resumeText,
        jobDescription
      );

      setResult(response);

      toast.success("Job matching completed!");
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Unable to match job description."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="match-page">

        <h1>Job Description Matching</h1>

        <div className="match-grid">

          <textarea
            placeholder="Paste Resume Text..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />

          <textarea
            placeholder="Paste Job Description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

        </div>

        <button
          className="match-btn"
          onClick={handleMatch}
          disabled={loading}
        >
          <Briefcase size={18} />
          {loading ? "Matching..." : "Match Resume"}
        </button>

        {result && (
          <>
            <div className="score-card">

              <h2>Match Percentage</h2>

              <div className="score-circle">
                {result.match_percentage}%
              </div>

            </div>

            <div className="result-grid">

              <div className="glass-card">

                <h2>
                  <CheckCircle size={20} />
                  Matched Skills
                </h2>

                <div className="skills">

                  {result.matched_skills.length > 0 ? (
                    result.matched_skills.map((skill, index) => (
                      <span key={index} className="matched">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No matching skills found.</p>
                  )}

                </div>

              </div>

              <div className="glass-card">

                <h2>
                  <XCircle size={20} />
                  Missing Skills
                </h2>

                <div className="skills">

                  {result.missing_skills.length > 0 ? (
                    result.missing_skills.map((skill, index) => (
                      <span key={index} className="missing">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No missing skills 🎉</p>
                  )}

                </div>

              </div>

            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MatchJD;