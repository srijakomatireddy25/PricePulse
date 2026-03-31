export const loginUser = () => {
  localStorage.setItem("loggedIn", "true");
};

export const logoutUser = () => {
  localStorage.removeItem("loggedIn");
};

export const isAuthenticated = () => {
  return localStorage.getItem("loggedIn") === "true";
};