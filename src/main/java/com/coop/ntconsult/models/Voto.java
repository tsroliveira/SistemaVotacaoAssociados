package com.coop.ntconsult.models;

import jakarta.persistence.*;
import lombok.Data;
import com.coop.ntconsult.models.Associado;
import com.coop.ntconsult.models.Votacao;
import com.coop.ntconsult.models.VotoOpcao;
import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;

@Entity
@Data
@Table(
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_votacao", "id_associado"})
    }
)
public class Voto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_votacao", nullable = false)
    //@JsonIgnoreProperties({"votos", "dataInicio", "dataFim","motivo"})
    @JsonBackReference
    private Votacao votacao;

    @ManyToOne
    @JoinColumn(name = "id_associado", nullable = false)
    private Associado associado;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VotoOpcao voto;

    private LocalDateTime dataHora;

    @PrePersist
    public void prePersist() {
        this.dataHora = LocalDateTime.now();
    }
}
