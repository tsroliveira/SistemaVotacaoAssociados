package com.coop.ntconsult.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coop.ntconsult.models.Pauta;

public interface PautaRepository extends JpaRepository<Pauta, Long> {
        Optional<Pauta> findByTitulo(String titulo);

}
