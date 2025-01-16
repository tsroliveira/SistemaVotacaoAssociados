package com.coop.ntconsult.controllers;

import com.coop.ntconsult.dtos.PautaDTO;
import com.coop.ntconsult.models.Pauta;
import com.coop.ntconsult.services.PautaService;
import com.coop.ntconsult.dtos.RespostaPautaDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PautaController {

    private final PautaService pautaService;

    public PautaController(PautaService pautaService) {
        this.pautaService = pautaService;
    }

    @PostMapping("/pautas")
    public ResponseEntity<RespostaPautaDTO> cadastrar(@RequestBody PautaDTO pautaDTO) {
        RespostaPautaDTO pautaCadastrada = pautaService.cadastrarPauta(pautaDTO);
        return new ResponseEntity<>(pautaCadastrada, HttpStatus.CREATED);
    }

    @GetMapping("/pautas/{id}")
    public ResponseEntity<Pauta> buscarPorId(@PathVariable Long id) {
        Pauta pauta = pautaService.buscarPorId(id);
        return ResponseEntity.ok(pauta);
    }
    
    @GetMapping("/pautas")
    public ResponseEntity<List<Pauta>> listar() {
        List<Pauta> pautas = pautaService.listarPautas();
        return ResponseEntity.ok(pautas);
    }
    
    @PutMapping("/pautas/{id}")
    public ResponseEntity<Pauta> atualizar(@PathVariable Long id, @RequestBody PautaDTO pautaDTO) {
        Pauta pautaAtualizada = pautaService.atualizarPauta(id, pautaDTO);
        return ResponseEntity.ok(pautaAtualizada);
    }

    @DeleteMapping("/pautas/{id}")
    public ResponseEntity<Map<String, String>> excluir(@PathVariable Long id) {
        pautaService.excluirPauta(id);
        //return ResponseEntity.noContent().build(); // 204 No Content
        Map<String, String> response = new HashMap<>();
        response.put("mensagem", "EXCLUIDA_COM_SUCESSO");        
        return ResponseEntity.ok(response);

    }
}
