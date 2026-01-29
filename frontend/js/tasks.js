// js/tasks.js

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

const params = new URLSearchParams(window.location.search);
const projectId = params.get("projectId");

if (!projectId) {
  alert("Projeto inválido");
  window.location.href = "projects.html";
}

const taskList = document.getElementById("taskList");
const descricaoInput = document.getElementById("descricao");

// 🔙 Voltar
function goBack() {
  window.location.href = "projects.html";
}

// 📥 Listar tarefas
async function loadTasks() {
  const response = await fetch(
    `http://localhost:8080/tasks/project/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.status === 401) {
    alert("Sessão expirada. Faça login novamente.");
    localStorage.removeItem("token");
    window.location.href = "index.html";
    return;
  }

  if (!response.ok) {
    console.error("Erro ao carregar tarefas:", response.status);
    return;
  }

  const tasks = await response.json();
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item text-muted";
    li.textContent = "Nenhuma tarefa cadastrada para este projeto.";
    taskList.appendChild(li);
    return;
  }

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <span>
        ${t.descricao}
        ${t.status === "CONCLUIDA" ? "✅" : ""}
      </span>
      <div>
        ${
          t.status !== "CONCLUIDA"
            ? `<button class="btn btn-sm btn-success me-1"
                onclick="finishTask(${t.id})">Concluir</button>`
            : ""
        }
        <button class="btn btn-sm btn-danger"
          onclick="deleteTask(${t.id})">Excluir</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// ➕ Criar tarefa (🔥 AQUI ESTAVA O ERRO)
async function createTask() {
  const descricao = descricaoInput.value.trim();

  if (!descricao) {
    alert("Descrição é obrigatória");
    return;
  }

  const response = await fetch("http://localhost:8080/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      descricao,
      projectId: Number(projectId)
    })
  });

  if (!response.ok) {
    alert("Erro ao criar tarefa");
    return;
  }

  descricaoInput.value = "";
  loadTasks();
}

// ✅ Concluir tarefa
async function finishTask(id) {
  const response = await fetch(
    `http://localhost:8080/tasks/${id}/finish`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    alert("Erro ao concluir tarefa");
    return;
  }

  loadTasks();
}

// 🗑️ Excluir tarefa
async function deleteTask(id) {
  if (!confirm("Deseja excluir esta tarefa?")) return;

  const response = await fetch(
    `http://localhost:8080/tasks/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    alert("Não foi possível excluir (tarefa pode ser predecessora)");
    return;
  }

  loadTasks();
}

loadTasks();