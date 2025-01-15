package com.coop.ntconsult.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Votacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String motivo;

    private LocalDateTime dataInicio;

    private LocalDateTime dataFim;

    @ManyToOne
    @JoinColumn(name = "pauta_id")
    private Pauta pauta;

    @OneToMany(mappedBy = "votacao")
    private List<Voto> votos;

    public Votacao() {
        this.dataInicio = LocalDateTime.now();
        this.dataFim = this.dataInicio.plusMinutes(1); // Tempo default de 1 minuto
    }
}
