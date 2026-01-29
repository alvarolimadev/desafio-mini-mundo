// core/auth.js
export function getToken() {
  return localStorage.getItem("token");
}

export function redirectToLogin() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}