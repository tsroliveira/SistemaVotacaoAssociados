package com.coop.ntconsult.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coop.ntconsult.models.Voto;

public interface VotoRepository extends JpaRepository<Voto, Long> {
}
