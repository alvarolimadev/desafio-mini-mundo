package br.com.minimundo.dto;

import br.com.minimundo.domain.Task;

import java.time.LocalDate;

public class TaskResponse {

    private Long id;
    private String descricao;
    private String status;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private Long predecessoraId;

    public static TaskResponse from(Task task) {
        TaskResponse r = new TaskResponse();
        r.id = task.getId();
        r.descricao = task.getDescricao();
        r.status = task.getStatus().name();
        r.dataInicio = task.getDataInicio();
        r.dataFim = task.getDataFim();
        r.predecessoraId =
                task.getPredecessora() != null ? task.getPredecessora().getId() : null;
        return r;
    }

    public Long getId() { return id; }
    public String getDescricao() { return descricao; }
    public String getStatus() { return status; }
    public LocalDate getDataInicio() { return dataInicio; }
    public LocalDate getDataFim() { return dataFim; }
    public Long getPredecessoraId() { return predecessoraId; }
}