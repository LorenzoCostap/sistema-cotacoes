package backend.controller;
import backend.model.Indicador;
import backend.repository.IndicadorRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/indicadores")
@CrossOrigin
public class IndicadorController {

    private final IndicadorRepository repo;

    public IndicadorController(IndicadorRepository repo) {
        this.repo = repo;
    }

    // LISTAR
    @GetMapping
    public List<Indicador> listar() {
        return repo.findAll();
    }

    // CRIAR
    @PostMapping
    public Indicador criar(@RequestBody Indicador indicador) {
        return repo.save(indicador);
    }

    // ATUALIZAR
    @PutMapping("/{id}")
    public Indicador atualizar(@PathVariable Long id, @RequestBody Indicador indicador) {
        indicador.setId(id);
        return repo.save(indicador);
    }

    // DELETAR
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repo.deleteById(id);
    }
}