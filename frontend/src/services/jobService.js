import API from "./api";

export const matchJobDescription = async (
  resumeText,
  jobDescription
) => {
  const response = await API.post("/match-jd", {
    resume_text: resumeText,
    job_description: jobDescription,
  });

  return response.data;
};