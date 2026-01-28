package br.com.minimundo.service;

import br.com.minimundo.domain.Project;
import br.com.minimundo.domain.Task;
import br.com.minimundo.domain.User;
import br.com.minimundo.dto.TaskRequest;
import br.com.minimundo.repository.ProjectRepository;
import br.com.minimundo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public Task create(TaskRequest request, User user) {

        Project project = projectRepository
                .findByIdAndOwner(request.getProjectId(), user)
                .orElseThrow(() -> new IllegalArgumentException("Projeto inválido"));

        if (request.getDataInicio() != null && request.getDataFim() != null &&
            request.getDataFim().isBefore(request.getDataInicio())) {
            throw new IllegalArgumentException("Data fim não pode ser anterior à data início");
        }

        Task task = new Task();
        task.setDescricao(request.getDescricao());
        task.setProject(project);
        task.setDataInicio(request.getDataInicio());
        task.setDataFim(request.getDataFim());

        if (request.getPredecessoraId() != null) {
            Task predecessora = taskRepository.findById(request.getPredecessoraId())
                    .orElseThrow(() -> new IllegalArgumentException("Tarefa predecessora inválida"));
            task.setPredecessora(predecessora);
        }

        return taskRepository.save(task);
    }

    public List<Task> list(Project project, String status) {
        if (status != null) {
            return taskRepository.findByProjectAndStatus(
                    project, Task.Status.valueOf(status)
            );
        }
        return taskRepository.findByProject(project);
    }

    public void delete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada"));

        if (taskRepository.existsByPredecessora(task)) {
            throw new IllegalArgumentException("Tarefa é predecessora de outra");
        }

        taskRepository.delete(task);
    }
}