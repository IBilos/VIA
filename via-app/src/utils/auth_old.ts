import { users } from "../data/users";
import { User } from "../types";

export const login = (username: string, password: string): boolean => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }
  return false;
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem("currentUser");
  return stored ? JSON.parse(stored) : null;
};

export const logout = () => {
  localStorage.removeItem("currentUser");
  if (getCurrentUser()) {
    return false;
  }
  return true;
};
