package com.coop.ntconsult.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coop.ntconsult.models.Associado;
import java.util.Optional;

public interface AssociadoRepository extends JpaRepository<Associado, Long> {
    Optional<Associado> findByCpf(String cpf);
}
