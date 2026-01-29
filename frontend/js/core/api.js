// core/api.js
import { getToken, redirectToLogin } from "./auth.js";

export async function apiFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  // 🔥 só envia Authorization se houver token
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (response.status === 401) {
    alert("Sessão expirada");
    redirectToLogin();
    throw new Error("Unauthorized");
  }

  return response;
}