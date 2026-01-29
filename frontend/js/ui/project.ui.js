// ui/project.ui.js
let editModal;

export function renderProjects(list, onEdit, onDelete, onTasks) {
  const ul = document.getElementById("projectList");
  ul.innerHTML = "";

  if (!list.length) {
    ul.innerHTML = `
      <li class="list-group-item text-muted">
        Nenhum projeto cadastrado
      </li>`;
    return;
  }

  list.forEach(p => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
      <div class="d-flex justify-content-between">
        <div>
          <strong>${p.nome}</strong>
          <div class="text-muted small">
            ${p.descricao ?? ""}
            ${p.orcamento ? ` • Orçamento: R$ ${p.orcamento}` : ""}
          </div>
          <span class="badge ${p.status === "ATIVO" ? "bg-success" : "bg-secondary"}">
            ${p.status}
          </span>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-secondary"
            onclick="openEditProject(${p.id})">
            Editar
          </button>

          <button class="btn btn-sm btn-primary"
            ${p.status !== "ATIVO" ? "disabled" : ""}
            onclick="openTasks(${p.id})">
            Tarefas
          </button>

          <button class="btn btn-sm btn-danger"
            onclick="deleteProject(${p.id})">
            Excluir
          </button>
        </div>
      </div>
    `;

    const [editBtn, tasksBtn, delBtn] = li.querySelectorAll("button");

    editBtn.onclick = () => onEdit(p);
    tasksBtn.onclick = () => onTasks(p.id);
    delBtn.onclick = () => onDelete(p.id);

    ul.appendChild(li);
  });
}

export function openEditModal(project, onSave) {
  document.getElementById("editProjectId").value = project.id;
  document.getElementById("editProjectName").value = project.nome;
  document.getElementById("editProjectDesc").value = project.descricao ?? "";
  document.getElementById("editProjectBudget").value = project.orcamento ?? "";
  document.getElementById("editProjectStatus").value = project.status;

  editModal = new bootstrap.Modal(
    document.getElementById("editProjectModal")
  );
  editModal.show();

  window.saveEdit = () => {
    onSave(project.id, {
      nome: document.getElementById("editProjectName").value.trim(),
      descricao: document.getElementById("editProjectDesc").value || null,
      orcamento: Number(document.getElementById("editProjectBudget").value) || null,
      status: document.getElementById("editProjectStatus").value
    });
    editModal.hide();
  };
}