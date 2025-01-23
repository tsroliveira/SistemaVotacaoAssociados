package com.coop.ntconsult.dtos;

import lombok.Data;

@Data
public class VotacaoDTO {
    private Long idPauta;
    private String motivo;
    private int duracao;
}
