const API = "http://localhost:8080/projects";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

function headers() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  };
}

async function loadProjects() {
  const res = await fetch(API, { headers: headers() });
  const projects = await res.json();

  const list = document.getElementById("projectList");
  list.innerHTML = "";

  projects.forEach(p => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";

    li.innerHTML = `
      ${p.nome}
      <button class="btn btn-sm btn-danger" onclick="deleteProject(${p.id})">Excluir</button>
    `;

    li.onclick = () => {
      localStorage.setItem("projectId", p.id);
      window.location.href = "tasks.html";
    };

    list.appendChild(li);
  });
}

async function createProject() {
  const nome = document.getElementById("projectName").value;

  await fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ nome })
  });

  loadProjects();
}

async function deleteProject(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: headers()
  });

  loadProjects();
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

loadProjects();