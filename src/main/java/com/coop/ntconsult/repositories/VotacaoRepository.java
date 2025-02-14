package com.coop.ntconsult.repositories;

import com.coop.ntconsult.models.Votacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VotacaoRepository extends JpaRepository<Votacao, Long> {
    List<Votacao> findByDataFimBefore(LocalDateTime dataFim);
}
