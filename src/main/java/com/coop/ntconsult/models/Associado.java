package com.coop.ntconsult.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Associado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true)
    private String cpf;

    private String funcao;

    private LocalDateTime dataHora;

    public Associado() {
        this.dataHora = LocalDateTime.now();
    }
}
