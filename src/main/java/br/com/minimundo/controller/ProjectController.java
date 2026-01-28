package br.com.minimundo.controller;

import br.com.minimundo.domain.Project;
import br.com.minimundo.domain.User;
import br.com.minimundo.dto.ProjectRequest;
import br.com.minimundo.dto.ProjectResponse;
import br.com.minimundo.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> create(
            @Valid @RequestBody ProjectRequest request,
            @AuthenticationPrincipal User user
    ) {
        Project project = service.create(request, user);
        return ResponseEntity.ok(ProjectResponse.from(project));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> list(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(
                service.list(user).stream()
                        .map(ProjectResponse::from)
                        .toList()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> find(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(
                ProjectResponse.from(service.find(id, user))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(
                ProjectResponse.from(service.update(id, request, user))
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        service.delete(id, user);
        return ResponseEntity.noContent().build();
    }
}