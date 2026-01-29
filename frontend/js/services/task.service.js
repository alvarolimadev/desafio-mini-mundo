import { apiFetch } from "../core/api.js";

const API_URL = "http://localhost:8080/tasks";

export async function listByProject(projectId, status) {
  let url = `${API_URL}/project/${projectId}`;

  if (status) {
    url += `?status=${status}`;
  }

  const response = await apiFetch(url);

  if (!response.ok) {
    throw new Error("Erro ao carregar tarefas");
  }

  return response.json();
}

export async function create(task) {
  const response = await apiFetch(API_URL, {
    method: "POST",
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error("Erro ao criar tarefa");
  }
}

export async function update(taskId, task) {
  const response = await apiFetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }
}

export async function finish(taskId) {
  await apiFetch(`${API_URL}/${taskId}/finish`, { method: "PUT" });
}

export async function remove(taskId) {
  await apiFetch(`${API_URL}/${taskId}`, { method: "DELETE" });
}