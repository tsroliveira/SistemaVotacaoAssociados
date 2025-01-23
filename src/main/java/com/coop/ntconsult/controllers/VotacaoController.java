package com.coop.ntconsult.controllers;

import com.coop.ntconsult.dtos.VotacaoDTO;
import com.coop.ntconsult.models.Votacao;
import com.coop.ntconsult.services.VotacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/votacoes")
public class VotacaoController {

    private final VotacaoService votacaoService;

    public VotacaoController(VotacaoService votacaoService) {
        this.votacaoService = votacaoService;
    }

    @PostMapping
    public ResponseEntity<Votacao> cadastrarVotacao(@RequestBody VotacaoDTO votacaoDTO) {
        Votacao novaVotacao = votacaoService.cadastrarVotacao(votacaoDTO);
        return ResponseEntity.ok(novaVotacao);
    }

    @GetMapping
    public List<Votacao> listarVotacoes() {
        return votacaoService.listarVotacoes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Votacao> buscarVotacaoPorId(@PathVariable Long id) {
        Votacao votacao = votacaoService.buscarPorId(id);
        return ResponseEntity.ok(votacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Votacao> atualizarVotacao(@PathVariable Long id, @RequestBody VotacaoDTO votacaoDTO) {
        Votacao votacaoAtualizada = votacaoService.atualizarVotacao(id, votacaoDTO);
        return ResponseEntity.ok(votacaoAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirVotacao(@PathVariable Long id) {
        votacaoService.excluirVotacao(id);
        return ResponseEntity.noContent().build();
    }
}
