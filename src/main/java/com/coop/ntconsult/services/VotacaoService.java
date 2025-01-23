package com.coop.ntconsult.services;

import com.coop.ntconsult.dtos.VotacaoDTO;
import com.coop.ntconsult.exceptions.EntityNotFoundException;
import com.coop.ntconsult.models.Pauta;
import com.coop.ntconsult.models.Votacao;
import com.coop.ntconsult.repositories.VotacaoRepository;
import com.coop.ntconsult.repositories.PautaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VotacaoService {

    private final VotacaoRepository votacaoRepository;
    private final PautaRepository pautaRepository;

    public VotacaoService(VotacaoRepository votacaoRepository, PautaRepository pautaRepository) {
        this.votacaoRepository = votacaoRepository;
        this.pautaRepository = pautaRepository;
    }

    @Transactional
    public Votacao cadastrarVotacao(VotacaoDTO votacaoDTO) {
        Pauta pauta = pautaRepository.findById(votacaoDTO.getIdPauta())
                .orElseThrow(() -> new EntityNotFoundException("Pauta não encontrada"));

        long duracao = votacaoDTO.getDuracao();

        Votacao votacao = new Votacao(votacaoDTO.getMotivo(), pauta, duracao > 0 ? duracao : 60);
        return votacaoRepository.save(votacao);
    }

    public List<Votacao> listarVotacoes() {
        return votacaoRepository.findAll();
    }

    public Votacao buscarPorId(Long id) {
        return votacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Votação não encontrada"));
    }

    @Transactional
    public Votacao atualizarVotacao(Long id, VotacaoDTO votacaoDTO) {
        Votacao votacaoExistente = buscarPorId(id);

        long duracao = votacaoDTO.getDuracao();

        votacaoExistente.setMotivo(votacaoDTO.getMotivo());

        votacaoExistente.setDataFim(votacaoExistente.getDataInicio().plusSeconds(duracao > 0 ? duracao : 60));

        return votacaoRepository.save(votacaoExistente);
    }

    @Transactional
    public void excluirVotacao(Long id) {
        Votacao votacao = buscarPorId(id);
        votacaoRepository.delete(votacao);
    }

    public boolean existePorId(Long id) {
        return votacaoRepository.existsById(id);
    }
}
