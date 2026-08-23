import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
export const downloadReport = (resume) => {
  const doc = new jsPDF();

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("AI Resume Analyzer Report", 105, 18, { align: "center" });

  doc.setDrawColor(255, 123, 44);
  doc.line(14, 24, 196, 24);

  // Basic Info
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  let role = resume.job_role || resume.selected_role || "Not Specified";

  doc.text(`Resume Name : ${resume.resume_name}`, 14, 35);
  doc.text(`Job Role : ${role}`, 14, 43);
  doc.text(`ATS Score : ${resume.ats_score}%`, 14, 51);

  // Analysis Table
  autoTable(doc, {
    startY: 60,
    head: [["Section", "Details"]],
    body: [
      [
        "Matched Skills",
        (resume.matched_skills || []).join(", ")
      ],
      [
        "Missing Skills",
        (resume.missing_skills || []).join(", ")
      ],
      [
        "Strengths",
        (resume.analysis?.strengths || []).join("\n")
      ],
      [
        "Weaknesses",
        (resume.analysis?.weaknesses || []).join("\n")
      ],
      [
        "Suggestions",
        (resume.analysis?.suggestions || []).join("\n")
      ],
      [
        "Interview Questions",
        (resume.analysis?.interview_questions || []).join("\n")
      ]
    ],
    styles: {
      fontSize: 10,
      cellPadding: 4,
      overflow: "linebreak"
    },
    headStyles: {
      fillColor: [255, 123, 44]
    }
  });

let y = (doc.lastAutoTable?.finalY || 60) + 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Learning Roadmap", 14, y);

  y += 10;

  (resume.roadmap || []).forEach((skill) => {

    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(skill.skill, 14, y);

    y += 8;

    const stages = [
      ["Beginner", skill.beginner],
      ["Intermediate", skill.intermediate],
      ["Advanced", skill.advanced]
    ];

    stages.forEach(([title, data]) => {

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(title, 18, y);

      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      doc.text(`Duration : ${data.days} Days`, 22, y);
      y += 5;

      doc.text(`Project : ${data.project}`, 22, y);
      y += 5;

      doc.text("Topics:", 22, y);
      y += 5;

      (data.topics || []).forEach(topic => {
        doc.text(`• ${topic}`, 28, y);
        y += 5;
      });

      doc.text("Courses:", 22, y);
      y += 5;

      (data.courses || []).forEach(course => {
        doc.text(`• ${course}`, 28, y);
        y += 5;
      });

      y += 5;

      if (y > 250) {
        doc.addPage();
        y = 20;
      }

    });

    y += 5;
  });

  doc.setDrawColor(200);
  doc.line(14, 285, 196, 285);

  doc.setFontSize(10);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    14,
    292
  );

  doc.text(
    "AI Resume Analyzer",
    196,
    292,
    { align: "right" }
  );

  doc.save(`${resume.resume_name}-Report.pdf`);
};