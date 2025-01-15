package com.coop.ntconsult.controllers;

import com.coop.ntconsult.services.ApiExternaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CpfController {

    private final ApiExternaService apiExternaService;

    public CpfController(ApiExternaService apiExternaService) {
        this.apiExternaService = apiExternaService;
    }

    @GetMapping("/integracao-externa")
    public String integrarComApiExterna(@RequestParam String parametro) {
        return apiExternaService.obterDadosDeApiExterna(parametro);
    }
}
