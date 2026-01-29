// core/api.js
import { getToken, redirectToLogin } from "./auth.js";

export async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers || {})
    }
  });

  if (response.status === 401) {
    alert("Sessão expirada");
    redirectToLogin();
    throw new Error("Unauthorized");
  }

  return response;
}