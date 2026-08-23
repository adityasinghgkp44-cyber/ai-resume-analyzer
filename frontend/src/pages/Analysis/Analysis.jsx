import "./Analysis.css";

import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

function Analysis() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <DashboardLayout>
        <div className="analysis-empty">
          <h2>No analysis available.</h2>

          <button
            className="analysis-btn"
            onClick={() => navigate("/upload")}
          >
            Upload Resume
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="analysis-page">

        <h1>Resume Analysis Report</h1>

        {/* ATS */}

        <div className="analysis-card ats-card">

          <h2>ATS Score</h2>

          <div className="ats-score">
            {state.ats_score}%
          </div>

        </div>

        {/* Skills */}

        <div className="analysis-grid">

          <div className="analysis-card">

            <h2>Matched Skills</h2>

            <div className="skills-container">

              {state.matched_skills?.length > 0 ? (
                state.matched_skills.map((skill, index) => (
                  <span
                    className="skill matched"
                    key={index}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No matched skills found.</p>
              )}

            </div>

          </div>

          <div className="analysis-card">

            <h2>Missing Skills</h2>

            <div className="skills-container">

              {state.missing_skills?.length > 0 ? (
                state.missing_skills.map((skill, index) => (
                  <span
                    className="skill missing"
                    key={index}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No missing skills 🎉</p>
              )}

            </div>

          </div>

        </div>

        {/* Strengths */}

        <div className="analysis-card">

          <h2>Strengths</h2>

          {state.analysis?.strengths?.map((item, index) => (

            <div
              className="analysis-item strength"
              key={index}
            >
              ✔ {item}
            </div>

          ))}

        </div>

        {/* Weaknesses */}

        <div className="analysis-card">

          <h2>Weaknesses</h2>

          {state.analysis?.weaknesses?.map((item, index) => (

            <div
              className="analysis-item weakness"
              key={index}
            >
              ✖ {item}
            </div>

          ))}

        </div>

        {/* Suggestions */}

        <div className="analysis-card">

          <h2>Suggestions</h2>

          {state.analysis?.suggestions?.map((item, index) => (

            <div
              className="analysis-item suggestion"
              key={index}
            >
              💡 {item}
            </div>

          ))}

        </div>

        {/* Interview */}

        <div className="analysis-card">

          <h2>Interview Questions</h2>

          {state.analysis?.interview_questions?.map(
            (item, index) => (

              <div
                className="question-card"
                key={index}
              >

                <div className="question-number">
                  Q{index + 1}
                </div>

                <p>{item}</p>

              </div>

            )
          )}

        </div>

        {/* Roadmap */}

        <div className="analysis-card">

          <h2>Learning Roadmap</h2>

          {state.roadmap?.map((item, index) => (

            <div
              className="roadmap-card"
              key={index}
            >

              <h3>{item.skill}</h3>

              <div className="roadmap-stage">

                <h4>Beginner</h4>

                <p>
                  <strong>Duration:</strong>{" "}
                  {item.beginner?.days} Days
                </p>

                <p>
                  <strong>Topics:</strong>{" "}
                  {item.beginner?.topics?.join(", ")}
                </p>

                <p>
                  <strong>Course:</strong>{" "}
                  {item.beginner?.courses?.join(", ")}
                </p>

                <p>
                  <strong>Project:</strong>{" "}
                  {item.beginner?.project}
                </p>

              </div>

              <div className="roadmap-stage">

                <h4>Intermediate</h4>

                <p>
                  <strong>Duration:</strong>{" "}
                  {item.intermediate?.days} Days
                </p>

                <p>
                  <strong>Topics:</strong>{" "}
                  {item.intermediate?.topics?.join(", ")}
                </p>

                <p>
                  <strong>Course:</strong>{" "}
                  {item.intermediate?.courses?.join(", ")}
                </p>

                <p>
                  <strong>Project:</strong>{" "}
                  {item.intermediate?.project}
                </p>

              </div>

              <div className="roadmap-stage">

                <h4>Advanced</h4>

                <p>
                  <strong>Duration:</strong>{" "}
                  {item.advanced?.days} Days
                </p>

                <p>
                  <strong>Topics:</strong>{" "}
                  {item.advanced?.topics?.join(", ")}
                </p>

                <p>
                  <strong>Course:</strong>{" "}
                  {item.advanced?.courses?.join(", ")}
                </p>

                <p>
                  <strong>Project:</strong>{" "}
                  {item.advanced?.project}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Analysis;