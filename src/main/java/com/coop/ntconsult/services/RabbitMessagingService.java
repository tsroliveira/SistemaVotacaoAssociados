package com.coop.ntconsult.services;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coop.ntconsult.models.Votacao;

@Service
public class RabbitMessagingService {

    private static final String EXCHANGE = "votacao.exchange";
    private static final String ROUTING_KEY = "votacao.encerrada";

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void notificarEncerramentoVotacao(Votacao votacao) {
        // Construa a mensagem com os dados relevantes da votação
        String mensagem = "A votação " + votacao.getId() + " foi encerrada.";

        // Enviar mensagem para o RabbitMQ
        rabbitTemplate.convertAndSend(EXCHANGE, ROUTING_KEY, mensagem);
    }
}
