import API from "./api";

export const getHistory = async () => {
  const response = await API.get("/history");
  return response.data;
};