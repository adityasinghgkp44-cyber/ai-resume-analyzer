import API from "./api";

export const generateRoadmap = async (missingSkills) => {
  const response = await API.post("/roadmap", {
    missing_skills: missingSkills,
  });

  return response.data;
};