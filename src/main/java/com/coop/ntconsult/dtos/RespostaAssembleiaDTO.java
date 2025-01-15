package com.coop.ntconsult.dtos;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RespostaAssembleiaDTO {
    private Long id;
    private String titulo;
    private LocalDateTime dataHora;
    private String mensagem;
}
