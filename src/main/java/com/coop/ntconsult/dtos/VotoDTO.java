package com.coop.ntconsult.dtos;

import com.coop.ntconsult.models.VotoOpcao;
import lombok.Data;

@Data
public class VotoDTO {
    private Long idPauta;
    private Long idAssociado;
    private VotoOpcao voto;
}
