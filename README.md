# Sistema de Votação para Cooperativas

Este projeto é uma API REST projetada para gerenciar sessões de votação para cooperativas, onde cada associado tem um voto e as decisões são tomadas através de assembleias de votação.

<img src="https://github.com/tsroliveira/devicon/blob/master/icons/java/java-original-wordmark.svg" height="46" width="46" /> <img src="https://github.com/tsroliveira/devicon/blob/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" height="46" width="46" /> &nbsp; <img src="https://github.com/tsroliveira/devicon/blob/master/icons/rabbitmq/rabbitmq-original.svg" height="34" width="34" /> &nbsp; <img src="https://github.com/tsroliveira/devicon/blob/master/icons/docker/docker-original-wordmark.svg" height="46" width="46" /> &nbsp; <img src="https://github.com/tsroliveira/devicon/blob/master/icons/mysql/mysql-original-wordmark.svg" height="46" width="46" />


## Funcionalidades

- Gerenciamento de associados (CRUD)
- Gerenciamento de assembleias (CRUD)
- Gerenciamento de pautas (CRUD)
- Gerenciamento de sessões de votação com duração configurável
- Registro de votos (Sim/Não)
- Contagem de votos e geração de resultados
- Integração com serviço externo de validação de CPF usando AWS Lambda e Bucket S3 (https://yblnpqv2ztxtir7e6hfmsndszi0uxquf.lambda-url.us-east-1.on.aws/users)
- Sistema de mensageria para notificar resultados usando Docker e RabbitMQ

## Stack de Tecnologia

- Java 17
- Spring Boot 3.4.1
- Spring Data JPA
- Spring Web
- Spring AMQP (RabbitMQ)
- Banco de Dados MySQL
- Maven
- Lombok
- JUnit 5

## Pré-requisitos

- JDK 17+
- Maven 3.6+
- MySQL 8+
- RabbitMQ 3.9+
- Docker (opcional, para containerização)

## Configuração e Instalação

### Configuração do Banco de Dados

1. Instale o MySQL ou use Docker:
```bash
docker run -d --name mysql-cooperativa -p 3308:3306 \
  -e MYSQL_DATABASE=cooperativa \
  -e MYSQL_USER=app \
  -e MYSQL_PASSWORD=app \
  -e MYSQL_ROOT_PASSWORD=root \
  mysql:8
```

2. Crie o banco de dados:
```sql
CREATE DATABASE cooperativa;
```

### Configuração da Aplicação Parte 1

1. Clone o repositório:
```bash
git clone https://github.com/tsroliveira/ntconsult.git 
cd SistemaVotacaoAssociados
```

### Configuração do RabbitMQ

1. Instale o RabbitMQ ou use Docker:
```bash
docker-compose up -d 
#pré-configurado
```
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
#criar um novo
```

### Configuração da Aplicação Parte 2

1. Configure as propriedades da aplicação:
   - Edite `src/main/resources/application.properties` para corresponder ao seu ambiente

2. Construa a aplicação:
```bash
./mvnw clean package
```

3. Execute a aplicação:
```bash
./mvnw spring-boot:run
```

## Endpoints da API

### Gerenciamento de Associados

- `POST /api/associados` - Criar associado
- `GET /api/associados` - Listar todos os associados
- `GET /api/associados/{id}` - Obter associado por ID
- `PUT /api/associados/{id}` - Atualizar associado
- `DELETE /api/associados/{id}` - Excluir associado

### Gerenciamento de Assembleias

- `POST /api/assembleias` - Criar assembleia
- `GET /api/assembleias` - Listar todas as assembleias
- `GET /api/assembleias/{id}` - Obter assembleia por ID
- `PUT /api/assembleias/{id}` - Atualizar assembleia
- `DELETE /api/assembleias/{id}` - Excluir assembleia

### Gerenciamento de Pautas

- `POST /api/pautas` - Criar pauta
- `GET /api/pautas` - Listar todas as pautas
- `GET /api/pautas/{id}` - Obter pauta por ID
- `PUT /api/pautas/{id}` - Atualizar pauta
- `DELETE /api/pautas/{id}` - Excluir pauta

### Gerenciamento de Sessões de Votação

- `POST /api/votacoes` - Criar sessão de votação
- `GET /api/votacoes` - Listar todas as sessões de votação
- `GET /api/votacoes/{id}` - Obter sessão de votação por ID
- `PUT /api/votacoes/{id}` - Atualizar sessão de votação
- `DELETE /api/votacoes/{id}` - Excluir sessão de votação

### Gerenciamento de Votos

- `POST /api/votos` - Registrar um voto
- `GET /api/votos` - Listar todos os votos
- `GET /api/votos/{id}` - Obter voto por ID
- `DELETE /api/votos/{id}` - Excluir voto

## Exemplos de Requisições/Respostas

### Criar Associado

**Requisição:**
```json
POST /api/associados
{
  "nome": "João Silva",
  "cpf": "12345678900",
  "funcao": "Cooperado"
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "João Silva",
  "cpf": "12345678900",
  "funcao": "Cooperado",
  "dataHora": "2025-03-12T10:30:00",
  "status": "ABLE_TO_VOTE",
  "mensagem": "ASSOCIADO_CADASTRADO_COM_SUCESSO"
}
```

### Criar Assembleia

**Requisição:**
```json
POST /api/assembleias
{
  "titulo": "Assembleia Ordinária 2025"
}
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Assembleia Ordinária 2025",
  "dataHora": "2025-03-12T10:35:00",
  "mensagem": "ASSEMBLEIA_CADASTRADA_COM_SUCESSO"
}
```

### Criar Pauta

**Requisição:**
```json
POST /api/pautas
{
  "titulo": "Aprovação do Orçamento Anual",
  "id_assembleia": 1
}
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Aprovação do Orçamento Anual",
  "dataHora": "2025-03-12T10:40:00",
  "mensagem": "PAUTA_CADASTRADA_COM_SUCESSO"
}
```

### Criar Sessão de Votação

**Requisição:**
```json
POST /api/votacoes
{
  "idPauta": 1,
  "motivo": "Votação do Orçamento Anual",
  "duracao": 300
}
```

**Resposta:**
```json
{
  "id": 1,
  "motivo": "Votação do Orçamento Anual",
  "dataInicio": "2025-03-12T10:45:00",
  "dataFim": "2025-03-12T10:50:00",
  "pauta": {
    "id": 1,
    "titulo": "Aprovação do Orçamento Anual"
  }
}
```

### Registrar Voto

**Requisição:**
```json
POST /api/votos
{
  "idPauta": 1,
  "idAssociado": 1,
  "voto": "SIM"
}
```

**Resposta:**
```json
{
  "status": "VOTO_REGISTRADO"
}
```

## Sugestões de Melhorias

1. **Tratamento de Exceções**: Implementar um manipulador global de exceções usando `@ControllerAdvice`
2. **Documentação da API**: Adicionar documentação com Swagger/OpenAPI
3. **Validação de Entrada**: Implementar Bean Validation
4. **Segurança**: Adicionar Spring Security para autenticação e autorização
5. **Docker Compose**: Fornecer uma configuração completa do docker-compose para fácil implantação
6. **Paginação**: Adicionar paginação aos endpoints de listagem para melhor desempenho
7. **Logging**: Aprimorar o logging para melhor observabilidade
8. **Cobertura de Testes**: Aumentar a cobertura de testes unitários e de integração
9. **Versionamento da API**: Implementar estratégia de versionamento da API
10. **Otimização de Desempenho**: Implementar cache e otimização de consultas para cenários de alto volume

## Licença

Licença MIT - Veja o arquivo LICENSE para detalhes
