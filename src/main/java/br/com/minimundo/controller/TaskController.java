package br.com.minimundo.controller;

import br.com.minimundo.domain.Project;
import br.com.minimundo.domain.Task;
import br.com.minimundo.domain.User;
import br.com.minimundo.dto.TaskRequest;
import br.com.minimundo.dto.TaskResponse;
import br.com.minimundo.service.ProjectService;
import br.com.minimundo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;
    private final ProjectService projectService;

    public TaskController(TaskService taskService, ProjectService projectService) {
        this.taskService = taskService;
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<TaskResponse> create(
            @RequestBody TaskRequest request,
            @AuthenticationPrincipal User user
    ) {
        Task task = taskService.create(request, user);
        return ResponseEntity.ok(TaskResponse.from(task));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskResponse>> list(
            @PathVariable Long projectId,
            @RequestParam(required = false) String status,
            @AuthenticationPrincipal User user
    ) {
        Project project = projectService.find(projectId, user);
        return ResponseEntity.ok(
                taskService.list(project, status).stream()
                        .map(TaskResponse::from)
                        .toList()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}