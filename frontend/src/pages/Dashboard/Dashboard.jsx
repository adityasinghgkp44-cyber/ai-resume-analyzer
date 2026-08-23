import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard/StatCard";
import { Target } from "lucide-react";
import API from "../../services/api";

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await API.get("/history");
        setHistory(response.data.history || []);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const averageATS =
    history.length > 0
      ? Math.round(
          history.reduce(
            (total, item) => total + Number(item.ats_score || 0),
            0
          ) / history.length
        )
      : 0;

  return (
    <DashboardLayout>
      <StatCard
        title="Average ATS"
        value={loading ? "..." : averageATS}
        color="#ff6a00"
        icon={<Target />}
      />
    </DashboardLayout>
  );
}

export default Dashboard;