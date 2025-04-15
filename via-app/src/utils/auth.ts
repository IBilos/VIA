import axios from "axios";

const API_URL = "http://localhost:5176/api/users";

// The function to handle the login request
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      // Store the user in localStorage or context for app-wide access
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user)); // Storing user data (for simplicity)
      return true;
    }
  } catch (error) {
    console.error("Login failed", error);
    return false;
  }
};

// Retrieve the current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Logout function
export const logout = (): boolean => {
  localStorage.removeItem("user");
  return !getCurrentUser();
};
