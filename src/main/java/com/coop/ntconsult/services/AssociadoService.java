package com.coop.ntconsult.services;

import com.coop.ntconsult.dtos.AssociadoDTO;
import com.coop.ntconsult.dtos.RespostaAssociadoDTO;
import com.coop.ntconsult.models.Associado;
import com.coop.ntconsult.repositories.AssociadoRepository;
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
public class AssociadoService {

    private final AssociadoRepository associadoRepository;

    @Value("${api.externa.url}")
    private String apiUrl;

    public AssociadoService(AssociadoRepository associadoRepository) {
        this.associadoRepository = associadoRepository;
    }

    public String validarCpfExterno(String cpf) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = String.format("{\"CPF\": \"%s\"}", cpf);
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                apiUrl, HttpMethod.POST, requestEntity, String.class);

        return responseEntity.getBody();
    }

    public RespostaAssociadoDTO cadastrarAssociado(AssociadoDTO associadoDTO) {

        Optional<Associado> associadoExistente = associadoRepository.findByCpf(associadoDTO.getCpf());
        
        if (associadoExistente.isPresent()) {
            Associado associado = associadoExistente.get();
            return new RespostaAssociadoDTO(
                associado.getId(),
                associado.getNome(),
                associado.getCpf(),
                associado.getFuncao(),
                associado.getDataHora(),
                "EXISTENTE",
                "CPF_JA_CADASTRADO"
            );
        }
    
        String cpfStatus = validarCpfExterno(associadoDTO.getCpf());
    
        if (cpfStatus.contains("CPF_INVALIDO")) {
            return new RespostaAssociadoDTO(null, null, associadoDTO.getCpf(), null, null, "UNABLE_TO_VOTE", "CPF_INVALIDO");
        } 
        else if (cpfStatus.contains("UNABLE_TO_VOTE")) {
            return new RespostaAssociadoDTO(null, associadoDTO.getNome(), associadoDTO.getCpf(), associadoDTO.getFuncao(), LocalDateTime.now(), "UNABLE_TO_VOTE", "CPF_ENCONTRADO_NA_BLACKLIST");
        } 
        else if (cpfStatus.contains("ABLE_TO_VOTE")) {
            Associado associado = new Associado();
            associado.setNome(associadoDTO.getNome());
            associado.setCpf(associadoDTO.getCpf());
            associado.setFuncao(associadoDTO.getFuncao());
            associado.setDataHora(LocalDateTime.now());
    
            Associado novoAssociado = associadoRepository.save(associado);
    
            return new RespostaAssociadoDTO(
                novoAssociado.getId(),
                novoAssociado.getNome(),
                novoAssociado.getCpf(),
                novoAssociado.getFuncao(),
                novoAssociado.getDataHora(),
                "ABLE_TO_VOTE",
                "ASSOCIADO_CADASTRADO_COM_SUCESSO"
            );
        }
    
        return null;
    }
        
    public List<Associado> listarAssociados() {
        return associadoRepository.findAll();
    }

    public Associado buscarPorId(Long id) {
        Optional<Associado> associado = associadoRepository.findById(id);
        if (associado.isPresent()) {
            return associado.get();
        } else {
            throw new IllegalArgumentException("Associado não encontrado");
        }
    }

    public Associado atualizarAssociado(Long id, AssociadoDTO associadoDTO) {
        Associado associadoExistente = buscarPorId(id);
        associadoExistente.setNome(associadoDTO.getNome());
        associadoExistente.setCpf(associadoDTO.getCpf());
        associadoExistente.setFuncao(associadoDTO.getFuncao());

        return associadoRepository.save(associadoExistente);
    }

    public void excluirAssociado(Long id) {
        Associado associado = buscarPorId(id);
        associadoRepository.delete(associado);
    }
}
