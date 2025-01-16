package com.coop.ntconsult.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coop.ntconsult.models.Assembleia;

import java.util.Optional;

public interface AssembleiaRepository extends JpaRepository<Assembleia, Long> {
    Optional<Assembleia> findByTitulo(String titulo);
}
