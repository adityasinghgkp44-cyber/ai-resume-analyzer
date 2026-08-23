import API from "./api";

export const uploadResume = async (file, role) => {
  const formData = new FormData();

  formData.append("resume", file);
  formData.append("role", role);

  const response = await API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteResume = async (resumeId) => {
  const response = await API.delete(
    `/resume/${encodeURIComponent(resumeId)}`
  );

  return response.data;
};
export const getJobRoles = async () => {
  const response = await API.get("/job-roles");
  return response.data.roles;
};