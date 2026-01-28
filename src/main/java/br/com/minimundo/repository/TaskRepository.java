package br.com.minimundo.repository;

import br.com.minimundo.domain.Project;
import br.com.minimundo.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByProject(Project project);

    List<Task> findByProjectAndStatus(Project project, Task.Status status);

    boolean existsByPredecessora(Task task);
}