package com.coop.ntconsult.services;

import com.coop.ntconsult.dtos.PautaDTO;
import com.coop.ntconsult.dtos.RespostaPautaDTO;
import com.coop.ntconsult.models.Pauta;
import com.coop.ntconsult.repositories.PautaRepository;
import com.coop.ntconsult.repositories.AssembleiaRepository;
import com.coop.ntconsult.models.Assembleia;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PautaService {

    private final PautaRepository pautaRepository;
    private final AssembleiaRepository assembleiaRepository;

    @Value("${api.externa.url}")
    private String apiUrl;

    public PautaService(PautaRepository pautaRepository, AssembleiaRepository assembleiaRepository) {
        this.pautaRepository = pautaRepository;
        this.assembleiaRepository = assembleiaRepository;
    }

    @Transactional
    public RespostaPautaDTO cadastrarPauta(PautaDTO pautaDTO) {
        Optional<Pauta> pautaExistente = verificarPautaExistente(pautaDTO.getTitulo());

        if (pautaExistente.isPresent()) {
            Pauta pauta = pautaExistente.get();
            return new RespostaPautaDTO(
                pauta.getId(),
                pauta.getTitulo(),
                pauta.getDataHora(),
                "PAUTA_JA_CADASTRADA"
            );
        } else {
            Pauta pauta = new Pauta();
            pauta.setTitulo(pautaDTO.getTitulo());
            pauta.setDataHora(LocalDateTime.now());

            Assembleia assembleia = assembleiaRepository.findById(pautaDTO.getId_assembleia())
                    .orElseThrow(() -> new IllegalArgumentException("Assembleia não encontrada"));
            pauta.setAssembleia(assembleia);

            Pauta novaPauta = pautaRepository.save(pauta);

            return new RespostaPautaDTO(
                novaPauta.getId(),
                novaPauta.getTitulo(),
                novaPauta.getDataHora(),
                "PAUTA_CADASTRADA_COM_SUCESSO"
            );
        }
    }

    // Ajustado para garantir que as votações sejam carregadas junto com a pauta
    public List<Pauta> listarPautas() {
        return pautaRepository.findAll(); // O fetch das votações será tratado na configuração da entidade
    }

    // Ajustado para buscar uma pauta pelo ID e carregar suas votações
    public Pauta buscarPorId(Long id) {
        return pautaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pauta não encontrada"));
    }

    @Transactional
    public Pauta atualizarPauta(Long id, PautaDTO pautaDTO) {
        Pauta pautaExistente = buscarPorId(id);
        pautaExistente.setTitulo(pautaDTO.getTitulo());
        return pautaRepository.save(pautaExistente);
    }

    @Transactional
    public void excluirPauta(Long id) {
        Pauta pauta = buscarPorId(id);
        pautaRepository.delete(pauta);
    }

    private Optional<Pauta> verificarPautaExistente(String titulo) {
        return pautaRepository.findByTitulo(titulo);
    }
}
