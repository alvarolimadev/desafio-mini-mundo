package br.com.minimundo.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String descricao;

    @Enumerated(EnumType.STRING)
    private Status status = Status.NAO_CONCLUIDA;

    private LocalDate dataInicio;
    private LocalDate dataFim;

    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "predecessora_id")
    private Task predecessora;

    public enum Status {
        CONCLUIDA,
        NAO_CONCLUIDA
    }

    // ===== GETTERS E SETTERS =====

    public Long getId() { return id; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public LocalDate getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDate dataInicio) { this.dataInicio = dataInicio; }
    public LocalDate getDataFim() { return dataFim; }
    public void setDataFim(LocalDate dataFim) { this.dataFim = dataFim; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    public Task getPredecessora() { return predecessora; }
    public void setPredecessora(Task predecessora) { this.predecessora = predecessora; }
}