// js/pages/tasks.page.js
import { ensureAuthenticated } from "../core/auth.js";
import * as taskService from "../services/task.service.js";
import { renderTasks } from "../ui/task.ui.js";

export async function initTasksPage() {
  const statusFilter = document.getElementById("statusFilter");

  if (!ensureAuthenticated()) return;

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("projectId");

  if (!projectId) {
    alert("Projeto inválido");
    window.location.href = "projects.html";
    return;
  }

  // BOTÃO VOLTAR
  const btnBack = document.getElementById("btnBack");

  btnBack.addEventListener("click", () => {
    window.location.href = "projects.html";
  });

  // ===== FORM CRIAÇÃO =====
  const btnCreate = document.getElementById("btnCreateTask");
  const descricaoInput = document.getElementById("descricao");
  const dataInicioInput = document.getElementById("dataInicio");
  const dataFimInput = document.getElementById("dataFim");

  // ===== MODAL EDIÇÃO =====
  const editModalEl = document.getElementById("editTaskModal");
  const editModal = new bootstrap.Modal(editModalEl);

  const editTaskIdInput = document.getElementById("editTaskId");
  const editDescricaoInput = document.getElementById("editDescricao");
  const editDataInicioInput = document.getElementById("editDataInicio");
  const editDataFimInput = document.getElementById("editDataFim");
  const editStatusInput = document.getElementById("editStatus");
  const btnSaveEdit = document.getElementById("btnSaveEdit");

  // ===== LISTAGEM =====
  async function loadTasks() {
    try {
      const status = statusFilter.value || null;

      const tasks = await taskService.listByProject(projectId, status);

      renderTasks(tasks, {
        onEdit: openEditModal,
        onFinish: async id => {
          await taskService.finish(id);
          loadTasks();
        },
        onDelete: async id => {
          if (confirm("Excluir tarefa?")) {
            await taskService.remove(id);
            loadTasks();
          }
        }
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar tarefas");
    }
  }

  statusFilter.addEventListener("change", () => {
    loadTasks();
  });

  // ===== ABRIR MODAL =====
    function openEditModal(task) {
    editTaskIdInput.value = task.id;
    editDescricaoInput.value = task.descricao;

    editDataInicioInput.value = task.dataInicio
        ? task.dataInicio.substring(0, 10)
        : "";

    editDataFimInput.value = task.dataFim
        ? task.dataFim.substring(0, 10)
        : "";

    editStatusInput.value = task.status;

    editModal.show();
    }

  // ===== SALVAR EDIÇÃO =====
    btnSaveEdit.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const id = editTaskIdInput.value;

    if (!id) {
        alert("ID da tarefa não encontrado");
        return;
    }

    const payload = {
        descricao: editDescricaoInput.value.trim(),
        dataInicio: editDataInicioInput.value || null,
        dataFim: editDataFimInput.value || null,
        status: editStatusInput.value
    };

    try {
        await taskService.update(id, payload);

        editModal.hide();
        loadTasks();
    } catch (err) {
        console.error("Erro ao salvar edição:", err);
        alert("Erro ao salvar a tarefa");
    }
    });

  // ===== CRIAR TAREFA =====
  btnCreate.addEventListener("click", async () => {
    const descricao = descricaoInput.value.trim();

    if (!descricao) {
      alert("Descrição é obrigatória");
      return;
    }

    await taskService.create({
      descricao,
      projectId: Number(projectId),
      dataInicio: dataInicioInput.value || null,
      dataFim: dataFimInput.value || null,
      status: "NAO_CONCLUIDA"
    });

    descricaoInput.value = "";
    dataInicioInput.value = "";
    dataFimInput.value = "";

    loadTasks();
  });

  // INICIALIZA
  loadTasks();
}