package com.coop.ntconsult.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Voto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String valor;

    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "votacao_id")
    private Votacao votacao;

    @ManyToOne
    @JoinColumn(name = "associado_id")
    private Associado associado;

    public Voto() {
        this.dataHora = LocalDateTime.now();
    }
}
