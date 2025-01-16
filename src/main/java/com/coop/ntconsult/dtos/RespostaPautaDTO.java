package com.coop.ntconsult.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RespostaPautaDTO {

    private Long id;
    private String titulo;
    private LocalDateTime dataHora;
    private String mensagem;
}
