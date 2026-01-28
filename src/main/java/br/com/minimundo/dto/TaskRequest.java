package br.com.minimundo.dto;

import java.time.LocalDate;

public class TaskRequest {

    private String descricao;
    private Long projectId;
    private Long predecessoraId;
    private LocalDate dataInicio;
    private LocalDate dataFim;

    public String getDescricao() { return descricao; }
    public Long getProjectId() { return projectId; }
    public Long getPredecessoraId() { return predecessoraId; }
    public LocalDate getDataInicio() { return dataInicio; }
    public LocalDate getDataFim() { return dataFim; }
}