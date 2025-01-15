package com.coop.ntconsult.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Pauta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "assembleia_id")
    private Assembleia assembleia;

    @OneToMany(mappedBy = "pauta")
    private List<Votacao> votacoes;

    public Pauta() {
        this.dataHora = LocalDateTime.now();
    }
}
