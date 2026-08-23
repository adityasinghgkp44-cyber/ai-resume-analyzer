import "./StatCard.css";
import CountUp from "react-countup";
function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="stat-card"
      style={{ borderTop: `4px solid ${color}` }}
    >
      <div className="stat-header">
        <span>{title}</span>
        {icon}
      </div>

      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;