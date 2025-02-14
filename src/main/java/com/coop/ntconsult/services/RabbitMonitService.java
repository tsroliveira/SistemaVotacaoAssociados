package com.coop.ntconsult.services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.util.List;

import com.coop.ntconsult.repositories.VotacaoRepository;
import com.coop.ntconsult.models.Votacao;

@Service
public class RabbitMonitService {

    @Autowired
    private VotacaoRepository votacaoRepository;

    @Autowired
    private RabbitMessagingService mensageriaService;

    @Scheduled(fixedRate = 60000)  // Executa a cada 60 segundos
    public void verificarVotacoesEncerradas() {
        List<Votacao> votacoesEncerradas = votacaoRepository.findByDataFimBefore(LocalDateTime.now());
        
        for (Votacao votacao : votacoesEncerradas) {
            // Enviar notificação para o serviço de mensageria
            mensageriaService.notificarEncerramentoVotacao(votacao);
        }
    }
}
