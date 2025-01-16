package com.coop.ntconsult.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
public class Assembleia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private LocalDateTime dataHora;

    @OneToMany(mappedBy = "assembleia")
    @JsonManagedReference
    private List<Pauta> pautas;

    public Assembleia() {
        this.dataHora = LocalDateTime.now();
    }
}
