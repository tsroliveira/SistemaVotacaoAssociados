package com.coop.ntconsult.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

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
    @JoinColumn(name = "id_pauta")
    @JsonBackReference
    private Pauta pauta;

    @OneToMany(mappedBy = "votacao", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Voto> votos;

    public Votacao() {
        this.dataInicio = LocalDateTime.now();
        this.dataFim = this.dataInicio.plusSeconds(60);
    }

    public Votacao(String motivo, Pauta pauta, long duracao) {
        this.motivo = motivo;
        this.pauta = pauta;
        this.dataInicio = LocalDateTime.now();
        this.dataFim = this.dataInicio.plusSeconds(duracao > 0 ? duracao : 60);
    }
}
