package com.coop.ntconsult.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coop.ntconsult.models.Assembleia;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssembleiaRepository extends JpaRepository<Assembleia, Long> {
    Optional<Assembleia> findByTitulo(String titulo);
}