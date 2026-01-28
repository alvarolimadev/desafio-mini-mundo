package br.com.minimundo.repository;

import br.com.minimundo.domain.Project;
import br.com.minimundo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByOwner(User owner);

    Optional<Project> findByIdAndOwner(Long id, User owner);

    boolean existsByNomeAndOwner(String nome, User owner);
}