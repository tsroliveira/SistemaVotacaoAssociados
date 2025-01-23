package com.coop.ntconsult.repositories;

import com.coop.ntconsult.models.Votacao;
import com.coop.ntconsult.models.Associado;
import com.coop.ntconsult.models.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VotoRepository extends JpaRepository<Voto, Integer> {
    boolean existsByVotacaoAndAssociado(Votacao votacao, Associado associado);
}
