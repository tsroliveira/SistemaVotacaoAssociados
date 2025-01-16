package com.coop.ntconsult.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coop.ntconsult.models.Votacao;

public interface VotacaoRepository extends JpaRepository<Votacao, Long> {
    
}
