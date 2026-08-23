import "./History.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { downloadReport } from "../../utils/downloadReport";
import {
  FileText,
  Star,
  BrainCircuit,
  Eye,
  Trash2,
  Search,
  Download,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import Loading from "../../components/Loading/Loading";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";

import { getHistory } from "../../services/historyService";
import { deleteResume } from "../../services/resumeService";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedResume, setSelectedResume] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedResumes, setSelectedResumes] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await getHistory();
      setHistory(response.history || []);
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Failed to load history"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = useMemo(() => {
    let data = [...history];

    data = data.filter((resume) =>
      resume.resume_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    if (filter === "high") {
      data = data.filter(
        (resume) => resume.ats_score >= 80
      );
    }

    if (filter === "medium") {
      data = data.filter(
        (resume) =>
          resume.ats_score >= 60 &&
          resume.ats_score < 80
      );
    }

    if (filter === "low") {
      data = data.filter(
        (resume) => resume.ats_score < 60
      );
    }

    return data;
  }, [history, search, filter]);

  const toggleSelect = (_id) => {
    setSelectedResumes((prev) =>
      prev.includes(_id)
        ? prev.filter((id) => id !== _id)
        : [...prev, _id]
    );
  };

  const selectAll = () => {
    if (
      selectedResumes.length ===
      filteredHistory.length
    ) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(
        filteredHistory.map(
          (item) => item._id
        )
      );
    }
  };

  const handleDelete = async () => {
    if (!selectedResume) return;

    try {
      await deleteResume(selectedResume._id);

      setHistory((prev) =>
        prev.filter(
          (item) =>
            item._id !== selectedResume._id
        )
      );

      toast.success(
        "Resume deleted successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Delete failed"
      );
    }

    setOpenDialog(false);
    setSelectedResume(null);
  };

  const deleteSelected = async () => {
    try {
      for (const id of selectedResumes) {
        await deleteResume(id);
      }

      setHistory((prev) =>
        prev.filter(
          (item) =>
            !selectedResumes.includes(item._id)
        )
      );

      setSelectedResumes([]);

      toast.success(
        "Selected resumes deleted"
      );
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loading
          text="Loading Resume History..."
          fullScreen={false}
        />
      </DashboardLayout>
    );
  }
    return (
    <DashboardLayout>
      <div className="history-page">

        <h1>Resume History</h1>

        <div className="history-controls">

          <div className="search-box">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search Resume..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Scores</option>
            <option value="high">ATS ≥ 80</option>
            <option value="medium">ATS 60 - 79</option>
            <option value="low">ATS &lt; 60</option>
          </select>

        </div>

        <div className="history-toolbar">
          <label className="select-all">
            <input
              type="checkbox"
              checked={
                filteredHistory.length > 0 &&
                selectedResumes.length === filteredHistory.length
              }
              onChange={selectAll}
            />
            Select All
          </label>
        </div>

        {filteredHistory.length === 0 ? (

          <div className="empty-history">
            <FileText size={80} />
            <h2>No Resume Found</h2>
          </div>

        ) : (

          <div className="history-grid">

            {filteredHistory.map((resume) => (

              <div
                className="history-card"
                key={resume._id}
              >

                <div className="history-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedResumes.includes(resume._id)}
                    onChange={() => toggleSelect(resume._id)}
                  />
                </div>

                <div className="history-header">
                  <FileText />
                  <h2>{resume.resume_name}</h2>
                </div>

                <div className="history-score">
                  <Star />
                  ATS Score
                  <span>{resume.ats_score}%</span>
                </div>

                <div className="history-skills">
                  {resume.matched_skills?.map((skill, i) => (
                    <span key={i}>{skill}</span>
                  ))}
                </div>

                <div className="analysis-preview">
                  <BrainCircuit size={18} />
                  <p>
                    {resume.analysis?.suggestions?.[0] ||
                      "No suggestions available"}
                  </p>
                </div>

                <div className="history-actions">

                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate("/analysis", {
                        state: resume,
                      })
                    }
                  >
                    <Eye size={18} />
                    View Report
                  </button>

                  <button
  className="download-btn"
  onClick={() => downloadReport(resume)}
>
  <Download size={18} />
  Download
</button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedResume(resume);
                      setOpenDialog(true);
                    }}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        <ConfirmDialog
          isOpen={openDialog}
          title="Delete Resume"
          message={`Delete "${selectedResume?.resume_name}" ?`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => {
            setOpenDialog(false);
            setSelectedResume(null);
          }}
        />

        {selectedResumes.length > 0 && (
          <div className="bulk-action-bar">

            <span>
              {selectedResumes.length} Resume Selected
            </span>

            <button
              className="delete-selected-btn"
              onClick={deleteSelected}
            >
              Delete Selected
            </button>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default History;