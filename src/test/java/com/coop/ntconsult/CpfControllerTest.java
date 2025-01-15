package com.coop.ntconsult;

import com.coop.ntconsult.controllers.CpfController;
import com.coop.ntconsult.services.ApiExternaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
public class CpfControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private ApiExternaService apiExternaService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(new CpfController(apiExternaService)).build();
    }

    @Test
    public void testIntegrarComApiExterna() throws Exception {
        String parametro = "valorTeste";
        String respostaEsperada = "Dados da API Externa";

        // Simula a resposta da API externa
        when(apiExternaService.obterDadosDeApiExterna(parametro)).thenReturn(respostaEsperada);

        // Faz a requisição GET e verifica se o retorno é o esperado
        mockMvc.perform(get("/integracao-externa?parametro=" + parametro))
                .andExpect(status().isOk())
                .andExpect(content().string(respostaEsperada));
    }
}
