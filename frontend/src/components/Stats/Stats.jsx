import "./Stats.css";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    end: 10000,
    suffix: "+",
    title: "Resumes Analyzed",
  },
  {
    end: 95,
    suffix: "%",
    title: "ATS Accuracy",
  },
  {
    end: 150,
    suffix: "+",
    title: "Job Roles Supported",
  },
  {
    end: 24,
    suffix: "/7",
    title: "AI Assistance",
  },
];

function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="stats-section" ref={ref}>
      <h2>Trusted by Future Professionals</h2>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <motion.div
            className="stat-card"
            key={index}
            whileHover={{
              scale: 1.05,
              y: -8,
            }}
          >
            <h1>
  {item.end}
  {item.suffix}
</h1>

            <p>{item.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
  
console.log(CountUp);
}

export default Stats;