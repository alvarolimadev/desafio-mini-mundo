package br.com.minimundo.service;

import br.com.minimundo.domain.Project;
import br.com.minimundo.domain.User;
import br.com.minimundo.dto.ProjectRequest;
import br.com.minimundo.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public Project create(ProjectRequest request, User user) {

        if (repository.existsByNomeAndOwner(request.getNome(), user)) {
            throw new IllegalArgumentException("Projeto com este nome já existe");
        }

        Project project = new Project();
        project.setNome(request.getNome());
        project.setDescricao(request.getDescricao());
        project.setOwner(user);

        if (request.getStatus() != null) {
            project.setStatus(Project.Status.valueOf(request.getStatus()));
        }

        project.setOrcamento(request.getOrcamento());

        return repository.save(project);
    }

    public List<Project> list(User user) {
        return repository.findByOwner(user);
    }

    public Project find(Long id, User user) {
        return repository.findByIdAndOwner(id, user)
                .orElseThrow(() -> new IllegalArgumentException("Projeto não encontrado"));
    }

    public Project update(Long id, ProjectRequest request, User user) {

        Project project = find(id, user);

        project.setNome(request.getNome());
        project.setDescricao(request.getDescricao());
        project.setOrcamento(request.getOrcamento());

        if (request.getStatus() != null) {
            project.setStatus(Project.Status.valueOf(request.getStatus()));
        }

        return repository.save(project);
    }

    public void delete(Long id, User user) {
        Project project = find(id, user);
        repository.delete(project);
    }
}