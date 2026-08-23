import "./AnalysisCard.css";

function AnalysisCard({ title, items }) {
  return (
    <div className="analysis-card">
      <h2>{title}</h2>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisCard;