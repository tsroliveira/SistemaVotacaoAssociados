package com.coop.ntconsult.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@Service
public class ApiExternaService {

    @Value("${api.externa.url}")  // URL da API externa configurada no application.properties
    private String apiUrl;

    private final RestTemplate restTemplate;

    public ApiExternaService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Método para fazer a requisição à API externa
    public String obterDadosDeApiExterna(String parametro) {
        String url = apiUrl + "/endpoint?parametro=" + parametro;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        
        return response.getBody();
    }
}
