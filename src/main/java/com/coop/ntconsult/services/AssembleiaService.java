package com.coop.ntconsult.services;

import com.coop.ntconsult.dtos.AssembleiaDTO;
import com.coop.ntconsult.dtos.RespostaAssembleiaDTO;
import com.coop.ntconsult.models.Assembleia;
import com.coop.ntconsult.repositories.AssembleiaRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AssembleiaService {

    private final AssembleiaRepository assembleiaRepository;

    @Value("${api.externa.url}")
    private String apiUrl;

    public AssembleiaService(AssembleiaRepository assembleiaRepository) {
        this.assembleiaRepository = assembleiaRepository;
    }

    public RespostaAssembleiaDTO cadastrarAssembleia(AssembleiaDTO assembleiaDTO) {

        Optional<Assembleia> assembleiaExistente = assembleiaRepository.findByTitulo(assembleiaDTO.getTitulo());
        
        if (assembleiaExistente.isPresent()) {
            Assembleia assembleia = assembleiaExistente.get();
            return new RespostaAssembleiaDTO(
                assembleia.getId(),
                assembleia.getTitulo(),
                assembleia.getDataHora(),
                "ASSEMBLEIA_JA_CADASTRADA"
            );
        }
        else {
            Assembleia assembleia = new Assembleia();
            assembleia.setTitulo(assembleiaDTO.getTitulo());
            assembleia.setDataHora(LocalDateTime.now());
    
            Assembleia novoAssembleia = assembleiaRepository.save(assembleia);
    
            return new RespostaAssembleiaDTO(
                novoAssembleia.getId(),
                novoAssembleia.getTitulo(),
                novoAssembleia.getDataHora(),
                "ASSEMBLEIA_CADASTRADA_COM_SUCESSO"
            );
        }    
    }
        
    public List<Assembleia> listarAssembleias() {
        return assembleiaRepository.findAll();
    }

    public Assembleia buscarPorId(Long id) {
        Optional<Assembleia> assembleia = assembleiaRepository.findById(id);
        if (assembleia.isPresent()) {
            return assembleia.get();
        } else {
            throw new IllegalArgumentException("Assembleia não encontrada");
        }
    }

    public Assembleia atualizarAssembleia(Long id, AssembleiaDTO assembleiaDTO) {
        Assembleia assembleiaExistente = buscarPorId(id);
        assembleiaExistente.setTitulo(assembleiaDTO.getTitulo());
        return assembleiaRepository.save(assembleiaExistente);
    }

    public void excluirAssembleia(Long id) {
        Assembleia assembleia = buscarPorId(id);
        assembleiaRepository.delete(assembleia);
    }
}
