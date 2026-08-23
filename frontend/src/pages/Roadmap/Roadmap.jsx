import "./Roadmap.css";

import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-hot-toast";
import { Map, BookOpen, Rocket } from "lucide-react";
import { generateRoadmap } from "../../services/roadmapService";

function Roadmap() {
  const [skills, setSkills] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const missingSkills = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    if (missingSkills.length === 0) {
      toast.error("Enter at least one missing skill.");
      return;
    }

    try {
      setLoading(true);

      const response = await generateRoadmap(missingSkills);

      setRoadmap(response.roadmap || []);

      toast.success("Roadmap generated successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
          "Unable to generate roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="roadmap-page">

        <h1>
          <Map size={32} />
          AI Learning Roadmap
        </h1>

        <p>
          Enter missing skills separated by commas.
        </p>

        <textarea
          placeholder="Example: Docker, AWS, Kubernetes,python"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button
          className="roadmap-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>

        {!loading && roadmap.length === 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
              opacity: 0.8,
            }}
          >
            No roadmap generated yet.
          </p>
        )}

        {roadmap.map((item, index) => (
          <div className="roadmap-card" key={index}>

            <h2>{item.skill}</h2>

            {/* Beginner */}

            <div className="roadmap-stage">

              <BookOpen size={20} />

              <div>

                <h3>
                  Beginner ({item.beginner?.days} Days)
                </h3>

                <p>
                  <strong>Project:</strong>{" "}
                  {item.beginner?.project}
                </p>

                <p>
                  <strong>Courses:</strong>{" "}
                  {item.beginner?.courses?.join(", ")}
                </p>

                <p>
                  <strong>Topics:</strong>{" "}
                  {item.beginner?.topics?.join(", ")}
                </p>

              </div>

            </div>

            {/* Intermediate */}

            <div className="roadmap-stage">

              <BookOpen size={20} />

              <div>

                <h3>
                  Intermediate ({item.intermediate?.days} Days)
                </h3>

                <p>
                  <strong>Project:</strong>{" "}
                  {item.intermediate?.project}
                </p>

                <p>
                  <strong>Courses:</strong>{" "}
                  {item.intermediate?.courses?.join(", ")}
                </p>

                <p>
                  <strong>Topics:</strong>{" "}
                  {item.intermediate?.topics?.join(", ")}
                </p>

              </div>

            </div>

            {/* Advanced */}

            <div className="roadmap-stage">

              <Rocket size={20} />

              <div>

                <h3>
                  Advanced ({item.advanced?.days} Days)
                </h3>

                <p>
                  <strong>Project:</strong>{" "}
                  {item.advanced?.project}
                </p>

                <p>
                  <strong>Courses:</strong>{" "}
                  {item.advanced?.courses?.join(", ") || "N/A"}
                </p>

                <p>
                  <strong>Topics:</strong>{" "}
                  {item.advanced?.topics?.join(", ")}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>
    </DashboardLayout>
  );
}

export default Roadmap;