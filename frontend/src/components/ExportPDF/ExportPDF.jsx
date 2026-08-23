import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

function ExportPDF({ targetId, fileName = "Resume_Report.pdf" }) {
  const exportPDF = async () => {
    try {
      const element = document.getElementById(targetId);

      if (!element) {
        alert("Report not found");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (canvas.height * pdfWidth) /
        canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save(fileName);
    } catch (error) {
      console.error(error);
      alert("Failed to export PDF");
    }
  };

  return (
    <button onClick={exportPDF}>
      <Download size={18} />
      Export PDF
    </button>
  );
}

export default ExportPDF;