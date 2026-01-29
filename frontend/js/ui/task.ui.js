function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("pt-BR");
}

export function renderTasks(tasks, { onEdit, onFinish, onDelete }) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (!tasks || tasks.length === 0) {
    list.innerHTML = `<li class="list-group-item text-muted">
      Nenhuma tarefa cadastrada
    </li>`;
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
      <div class="d-flex justify-content-between">
        <div>
          <strong>${task.descricao}</strong><br>
          <small>📅 ${formatDate(task.dataInicio)} → ${formatDate(task.dataFim)}</small><br>
          ${
            task.predecessora
              ? `<small>🔗 Predecessora: ${task.predecessora.descricao}</small><br>`
              : ""
          }
          <span class="badge ${
            task.status === "CONCLUIDA" ? "bg-success" : "bg-secondary"
          }">${task.status}</span>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-warning me-1">Editar</button>
          ${
            task.status !== "CONCLUIDA"
              ? `<button class="btn btn-sm btn-success me-1">Concluir</button>`
              : ""
          }
          <button class="btn btn-sm btn-danger">Excluir</button>
        </div>
      </div>
    `;

    const buttons = li.querySelectorAll("button");

    let i = 0;
    buttons[i++].onclick = () => onEdit(task);

    if (task.status !== "CONCLUIDA") {
      buttons[i++].onclick = () => onFinish(task.id);
    }

    buttons[i].onclick = () => onDelete(task.id);

    list.appendChild(li);
  });
}