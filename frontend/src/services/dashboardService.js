import API from "./api";

export const getDashboardData = async () => {
  const response = await API.get("/history");

  const history = response.data.history || [];

  const totalResumes = history.length;

  const averageATS =
    totalResumes > 0
      ? Math.round(
          history.reduce(
            (sum, item) => sum + item.ats_score,
            0
          ) / totalResumes
        )
      : 0;

  const highestATS =
    totalResumes > 0
      ? Math.max(
          ...history.map(
            (item) => item.ats_score
          )
        )
      : 0;

  const totalSkills = history.reduce(
    (sum, item) =>
      sum + (item.skills?.length || 0),
    0
  );

  return {
    history,
    totalResumes,
    averageATS,
    highestATS,
    totalSkills,
  };
};