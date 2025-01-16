package com.coop.ntconsult.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
public class Pauta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "id_assembleia")
    @JsonBackReference
    private Assembleia assembleia;

    @OneToMany(mappedBy = "pauta")
    @JsonManagedReference
    private List<Votacao> votacoes;

    public Pauta() {
        this.dataHora = LocalDateTime.now();
    }
}
