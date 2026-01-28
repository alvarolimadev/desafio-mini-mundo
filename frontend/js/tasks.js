const API = "http://localhost:8080/tasks";
const token = localStorage.getItem("token");
const projectId = localStorage.getItem("projectId");

if (!token || !projectId) {
  window.location.href = "index.html";
}

function headers() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  };
}

async function loadTasks() {
  const res = await fetch(`${API}?projectId=${projectId}`, {
    headers: headers()
  });

  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <span class="${t.status === 'CONCLUIDA' ? 'completed' : ''}">
        ${t.descricao} (${t.status})
        ${t.predecessora ? ` | Pred: ${t.predecessora.id}` : ''}
      </span>
      <button class="btn btn-sm btn-danger" onclick="deleteTask(${t.id})">Excluir</button>
    `;

    list.appendChild(li);
  });
}

async function createTask() {
  const descricao = document.getElementById("descricao").value;
  const status = document.getElementById("status").value;
  const predecessoraId = document.getElementById("predecessora").value;

  await fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      descricao,
      status,
      projectId,
      predecessoraId: predecessoraId || null
    })
  });

  document.getElementById("descricao").value = "";
  document.getElementById("predecessora").value = "";

  loadTasks();
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: headers()
    });

    if (!res.ok) {
      const msg = await res.text();
      alert(msg);
    }

    loadTasks();
  } catch (e) {
    alert("Erro ao excluir tarefa");
  }
}

function voltar() {
  window.location.href = "projects.html";
}

loadTasks();