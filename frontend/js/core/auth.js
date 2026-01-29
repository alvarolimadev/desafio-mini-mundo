// js/core/auth.js
export function saveToken(token) {
  localStorage.setItem("token", token);
}

// frontend/js/core/auth.js
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// 🔥 expõe para uso em HTML inline
window.logout = logout;

export function redirectIfAuthenticated() {
  if (localStorage.getItem("token")) {
    window.location.href = "projects.html";
  }
}

// core/auth.js
export function getToken() {
  return localStorage.getItem("token");
}

export function redirectToLogin() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

export function ensureAuthenticated() {
  const token = getToken();
  if (!token) {
    window.location.href = "index.html";
    return false;
  }
  return true;
}