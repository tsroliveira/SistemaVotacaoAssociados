package com.coop.ntconsult.controllers;

import com.coop.ntconsult.dtos.AssembleiaDTO;
import com.coop.ntconsult.models.Assembleia;
import com.coop.ntconsult.services.AssembleiaService;
import com.coop.ntconsult.dtos.RespostaAssembleiaDTO;

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
public class AssembleiaController {

    @Autowired
    private AssembleiaService assembleiaService;

    @PostMapping("/assembleias")
    public ResponseEntity<RespostaAssembleiaDTO> cadastrar(@RequestBody AssembleiaDTO assembleiaDTO) {
        RespostaAssembleiaDTO assembleiaCadastrado = assembleiaService.cadastrarAssembleia(assembleiaDTO);
        return ResponseEntity.ok(assembleiaCadastrado);
    }

    @GetMapping("/assembleias/{id}")
    public ResponseEntity<Assembleia> buscarPorId(@PathVariable Long id) {
        Assembleia assembleia = assembleiaService.buscarPorId(id);
        return ResponseEntity.ok(assembleia);
    }

    @GetMapping("/assembleias")
    public ResponseEntity<List<Assembleia>> listar() {
        List<Assembleia> assembleias = assembleiaService.listarAssembleias();
        return ResponseEntity.ok(assembleias);
    }

    @PutMapping("/assembleias/{id}")
    public ResponseEntity<Assembleia> atualizar(@PathVariable Long id, @RequestBody AssembleiaDTO assembleiaDTO) {
        Assembleia assembleiaAtualizado = assembleiaService.atualizarAssembleia(id, assembleiaDTO);
        return ResponseEntity.ok(assembleiaAtualizado);
    }

    @DeleteMapping("/assembleias/{id}")
    public ResponseEntity<Map<String, String>> excluir(@PathVariable Long id) {
        assembleiaService.excluirAssembleia(id);

        Map<String, String> response = new HashMap<>();
        response.put("mensagem", "EXCLUIDO_COM_SUCESSO");

        //return ResponseEntity.noContent().build();
        return ResponseEntity.ok(response);

    }
}
