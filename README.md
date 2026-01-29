# Mini Mundo

Projeto de laboratório para avaliação técnica de desenvolvedores.

## Stack
- Java 17
- Spring Boot
- Spring Security + JWT
- PostgreSQL
- Docker
- GitHub Actions

## Funcionalidades
- Autenticação (Login/Cadastro)
- CRUD de Projetos
- CRUD de Tarefas com dependência
- Segurança por usuário

## Como rodar em desenvolvimento
```bash
docker compose up
```

## Porta de acesso
O frontend estará disponível em `http://localhost:5500`.

## Executar via Docker Hub

É necessário um banco PostgreSQL em execução.

Exemplo:
```bash
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=dev \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://HOST:5432/minimundo \
  -e SPRING_DATASOURCE_USERNAME=minimundo \
  -e SPRING_DATASOURCE_PASSWORD=minimundo \
  jklvb/minimundo:1.0.0
 ```