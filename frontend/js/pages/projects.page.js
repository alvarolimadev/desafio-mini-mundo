// pages/projects.page.js
import * as service from "../services/project.service.js";
import { renderProjects, openEditModal } from "../ui/project.ui.js";
import { redirectToLogin } from "../core/auth.js";
import { logout } from "../core/auth.js";

let projects = [];

document
  .getElementById("btnCreate")
  .addEventListener("click", createProject);

document
  .getElementById("searchInput")
  .addEventListener("input", onSearch);

document.getElementById("btnLogout").onclick = logout;

export async function initProjectsPage() {
  try {
    projects = await service.listProjects();
    draw();
  } catch {
    redirectToLogin();
  }
}

function draw() {
  renderProjects(
    projects,
    editProject,
    removeProject,
    openTasks
  );
}

async function createProject() {
  const nome = document.getElementById("projectName").value.trim();
  if (!nome) return alert("Nome do projeto é obrigatório");

  await service.createProject({
    nome,
    descricao: document.getElementById("projectDesc").value || null,
    orcamento: Number(document.getElementById("projectBudget").value) || null
  });

  initProjectsPage();
}

function editProject(project) {
  openEditModal(project, saveEdit);
}

async function saveEdit(id, payload) {
  await service.updateProject(id, payload);
  initProjectsPage();
}

async function removeProject(id) {
  if (!confirm("Deseja excluir este projeto?")) return;
  await service.deleteProject(id);
  initProjectsPage();
}

function onSearch(e) {
  const term = e.target.value.toLowerCase();

  renderProjects(
    projects.filter(p =>
      p.nome.toLowerCase().includes(term)
    ),
    editProject,
    removeProject,
    openTasks
  );
}

function openTasks(id) {
  window.location.href = `tasks.html?projectId=${id}`;
}

document.addEventListener("DOMContentLoaded", () => {
    initProjectsPage();
});