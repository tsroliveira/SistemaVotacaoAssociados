package com.coop.ntconsult.services;

import com.coop.ntconsult.dtos.VotoDTO;
import com.coop.ntconsult.models.Votacao;
import com.coop.ntconsult.models.Voto;
import com.coop.ntconsult.models.Associado;
import com.coop.ntconsult.repositories.VotacaoRepository;
import com.coop.ntconsult.repositories.VotoRepository;

import com.coop.ntconsult.services.AssociadoService;

import com.coop.ntconsult.repositories.AssociadoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class VotoService {

    private final VotoRepository votoRepository;
    private final VotacaoRepository votacaoRepository;
    private final AssociadoRepository associadoRepository;
    private final AssociadoService associadoService;

    public VotoService(VotoRepository votoRepository, VotacaoRepository votacaoRepository,
                       AssociadoRepository associadoRepository, AssociadoService associadoService) {
        this.votoRepository = votoRepository;
        this.votacaoRepository = votacaoRepository;
        this.associadoRepository = associadoRepository;
        this.associadoService = associadoService;
    }

    @Transactional
    public String cadastrarVoto(VotoDTO votoDTO) {
        Associado associado = associadoRepository.findById(votoDTO.getIdAssociado())
                .orElseThrow(() -> new IllegalArgumentException("CPF inválido"));

        boolean jaVotou = votoRepository.existsByVotacaoAndAssociado(
                votacaoRepository.findById(votoDTO.getIdPauta()).orElseThrow(() -> new IllegalArgumentException("Votação não encontrada")),
                associado
        );

        if (jaVotou) {
            return "{\"status\": \"ALREADY_VOTED\"}";
        }

        String cpfStatus = associadoService.validarCpfExterno(associado.getCpf());

        if (cpfStatus.contains("CPF_INVALIDO") || cpfStatus.contains("UNABLE_TO_VOTE")) {
            return "{\"status\": \"UNABLE_TO_VOTE\"}"; // CPF inválido ou não autorizado a votar
        }

        Votacao votacao = votacaoRepository.findById(votoDTO.getIdPauta())
                .orElseThrow(() -> new IllegalArgumentException("Votação não encontrada"));

        Voto voto = new Voto();
        voto.setVotacao(votacao);
        voto.setAssociado(associado);
        voto.setVoto(votoDTO.getVoto());

        votoRepository.save(voto);

        return "{\"status\": \"VOTO_REGISTRADO\"}";
    }

    public List<Voto> listarVotos() {
        return votoRepository.findAll();
    }

    public Voto buscarPorId(Integer id) {
        return votoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Voto não encontrado"));
    }

    @Transactional
    public void excluirVoto(Integer id) {
        Voto voto = buscarPorId(id);
        votoRepository.delete(voto);
    }
}