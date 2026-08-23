import "./ATSGauge.css";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ATSGauge({ score }) {
  return (
    <div className="ats-gauge">
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: "#ff6a00",
          trailColor: "#222",
        })}
      />

      <h3>ATS Score</h3>
    </div>
  );
}

export default ATSGauge;