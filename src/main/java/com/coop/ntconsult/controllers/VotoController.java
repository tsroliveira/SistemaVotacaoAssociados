package com.coop.ntconsult.controllers;

import com.coop.ntconsult.dtos.VotoDTO;
import com.coop.ntconsult.models.Voto;
import com.coop.ntconsult.services.VotoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/votos")
public class VotoController {

    private final VotoService votoService;

    public VotoController(VotoService votoService) {
        this.votoService = votoService;
    }

    @PostMapping
    public ResponseEntity<String> cadastrarVoto(@RequestBody VotoDTO votoDTO) {
        String response = votoService.cadastrarVoto(votoDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Voto>> listarVotos() {
        List<Voto> votos = votoService.listarVotos();
        return ResponseEntity.ok(votos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Voto> buscarVotoPorId(@PathVariable Integer id) {
        Voto voto = votoService.buscarPorId(id);
        return ResponseEntity.ok(voto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirVoto(@PathVariable Integer id) {
        votoService.excluirVoto(id);
        return ResponseEntity.noContent().build();
    }
}
