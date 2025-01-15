package com.coop.ntconsult.dtos;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RespostaAssociadoDTO {
    private Long id;
    private String nome;
    private String cpf;
    private String funcao;
    private LocalDateTime dataHora;
    private String status;
    private String mensagem;
}
