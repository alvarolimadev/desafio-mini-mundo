// services/project.service.js
import { apiFetch } from "../core/api.js";

const API_URL = "http://localhost:8080/projects";

export async function listProjects() {
  const res = await apiFetch(API_URL);
  return res.json();
}

export async function createProject(data) {
  return apiFetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export async function updateProject(id, data) {
  return apiFetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

export async function deleteProject(id) {
  return apiFetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}