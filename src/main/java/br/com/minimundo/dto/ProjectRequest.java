package br.com.minimundo.dto;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public class ProjectRequest {

    @NotBlank
    private String nome;

    private String descricao;

    private String status;

    private BigDecimal orcamento;

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getStatus() {
        return status;
    }

    public BigDecimal getOrcamento() {
        return orcamento;
    }
}