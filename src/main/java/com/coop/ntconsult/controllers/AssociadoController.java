package com.coop.ntconsult.controllers;

import com.coop.ntconsult.dtos.AssociadoDTO;
import com.coop.ntconsult.models.Associado;
import com.coop.ntconsult.services.AssociadoService;
import com.coop.ntconsult.dtos.RespostaAssociadoDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.MessageSource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AssociadoController {

    @Autowired
    private AssociadoService associadoService;

    @PostMapping("/associados")
    public ResponseEntity<RespostaAssociadoDTO> cadastrar(@RequestBody AssociadoDTO associadoDTO) {
        RespostaAssociadoDTO associadoCadastrado = associadoService.cadastrarAssociado(associadoDTO);
        return ResponseEntity.ok(associadoCadastrado);
    }

    @GetMapping("/associados/{id}")
    public ResponseEntity<Associado> buscarPorId(@PathVariable Long id) {
        Associado associado = associadoService.buscarPorId(id);
        return ResponseEntity.ok(associado);
    }

    @GetMapping("/associados")
    public ResponseEntity<List<Associado>> listar() {
        List<Associado> associados = associadoService.listarAssociados();
        return ResponseEntity.ok(associados);
    }

    @PutMapping("/associados/{id}")
    public ResponseEntity<Associado> atualizar(@PathVariable Long id, @RequestBody AssociadoDTO associadoDTO) {
        Associado associadoAtualizado = associadoService.atualizarAssociado(id, associadoDTO);
        return ResponseEntity.ok(associadoAtualizado);
    }

    @DeleteMapping("/associados/{id}")
    public ResponseEntity<Map<String, String>> excluir(@PathVariable Long id) {
        associadoService.excluirAssociado(id);

        Map<String, String> response = new HashMap<>();
        response.put("mensagem", "EXCLUIDO_COM_SUCESSO");

        //return ResponseEntity.noContent().build();
        return ResponseEntity.ok(response);

    }
}
