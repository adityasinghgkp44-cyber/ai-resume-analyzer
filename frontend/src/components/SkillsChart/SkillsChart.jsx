import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

function SkillsChart({ skills }) {
  const data = skills.map((skill) => ({
    skill,
    value: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="skill" />
        <Radar
          dataKey="value"
          fill="#ff6a00"
          stroke="#ff6a00"
          fillOpacity={0.5}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default SkillsChart;