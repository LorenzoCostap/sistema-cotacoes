package backend.repository;

import backend.model.Indicador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndicadorRepository extends JpaRepository<Indicador, Long> {
}