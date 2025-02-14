package com.coop.ntconsult.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class RabbitListnerService {

    @RabbitListener(queues = "votacao.encerrada.queue")
    public void receberNotificacao(String mensagem) {
        System.out.println("Notificação recebida: " + mensagem);
        
        // Aqui você pode fazer uma chamada HTTP para outros endpoints
    }
}
