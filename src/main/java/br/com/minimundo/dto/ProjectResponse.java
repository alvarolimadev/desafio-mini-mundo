package br.com.minimundo.dto;

import br.com.minimundo.domain.Project;

import java.math.BigDecimal;

public class ProjectResponse {

    private Long id;
    private String nome;
    private String descricao;
    private String status;
    private BigDecimal orcamento;

    public static ProjectResponse from(Project project) {
        ProjectResponse response = new ProjectResponse();
        response.id = project.getId();
        response.nome = project.getNome();
        response.descricao = project.getDescricao();
        response.status = project.getStatus().name();
        response.orcamento = project.getOrcamento();
        return response;
    }

    // getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getDescricao() { return descricao; }
    public String getStatus() { return status; }
    public BigDecimal getOrcamento() { return orcamento; }
}