import API from "./api";

export const loginUser = async (email, password) => {
  const response = await API.post("/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (userData) => {
  console.log("REGISTER PAYLOAD:", userData);

  const response = await API.post("/register", userData);

  return response.data;
};