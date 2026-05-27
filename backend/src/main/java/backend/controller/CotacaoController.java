package backend.controller;

import backend.model.Cotacao;
import backend.repository.CotacaoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cotacoes")
@CrossOrigin
public class CotacaoController{

    private final CotacaoRepository repo;

    public CotacaoController(CotacaoRepository repo){
        this.repo = repo;
    }

    @GetMapping
    public List<Cotacao>listar(){
        return repo.findAll();
    }

    @PostMapping
    public Cotacao criar(@RequestBody Cotacao cotacao){
        return repo.save(cotacao);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable long id){
        repo.deleteById(id);
    }
}