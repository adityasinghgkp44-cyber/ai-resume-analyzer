import "./Upload.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { UploadCloud, FileText } from "lucide-react";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import {
  uploadResume,
  getJobRoles,
} from "../../services/resumeService";

function Upload() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobRoles();
  }, []);

  const fetchJobRoles = async () => {
    try {
      const data = await getJobRoles();

      const formattedRoles = data.map((item) => ({
        value: item,
        label: item,
      }));

      setRoles(formattedRoles);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load job roles.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or DOCX resume.");
      return;
    }

    // 5 MB file size limit
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be smaller than 5 MB.");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a resume.");
      return;
    }

    if (!role) {
      toast.error("Please select a job role.");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadResume(
        selectedFile,
        role
      );

      toast.success("Resume analyzed successfully.");

      navigate("/analysis", {
        state: response,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Resume upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="upload-page">
        <div className="upload-card">

          <UploadCloud
            size={80}
            className="upload-icon"
          />

          <h1>Upload Your Resume</h1>

          <p>
            Upload your resume and select your target job role
            to receive ATS score, skill analysis, roadmap and
            interview preparation.
          </p>

          <div
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <Select
              options={roles}
              placeholder="Search or Select Job Role..."
              value={roles.find(
                (item) => item.value === role
              )}
              onChange={(selected) =>
                setRole(selected ? selected.value : "")
              }
              isSearchable
              isClearable
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#1c1c1c",
                  borderColor: "#444",
                  borderRadius: "10px",
                  minHeight: "50px",
                  color: "#fff",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1c1c1c",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "#ff6a00"
                    : "#1c1c1c",
                  color: "#fff",
                  cursor: "pointer",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#fff",
                }),
                input: (base) => ({
                  ...base,
                  color: "#fff",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#aaa",
                }),
              }}
            />
          </div>

          <label className="upload-box">
            <input
              type="file"
              accept=".pdf,.docx"
              hidden
              onChange={handleFileChange}
            />

            <FileText size={45} />

            <span>
              {selectedFile
                ? selectedFile.name
                : "Choose Resume (PDF/DOCX)"}
            </span>
          </label>

          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading
              ? "Analyzing Resume..."
              : "Upload & Analyze"}
          </button>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Upload;