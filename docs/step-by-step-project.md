# Passo a Passo Completo para o Microsserviço de Pagamentos

---

## Sprint 1 (Core MVP)

- [ ] **Revisar e finalizar o ERD**  
  - Confirme que as entidades `Payment` e `PaymentMethod` e seus relacionamentos estão claros.  
  - Exporte o diagrama (draw.io, dbdiagram.io ou similar).

- [ ] **Modelar o Prisma Schema**  
  - Abra `prisma/schema.prisma` e defina os models `Payment` e `PaymentMethod`.  
  - Adicione constraints (`@id`, `@unique`, `@relation`, `@@index`).

- [ ] **Criar a migration inicial**  
  ```bash
  npx prisma migrate dev --name init-payments
 Gerar o Prisma Client


 - npx prisma generate
  Configurar o PrismaModule no NestJS

 - Crie src/prisma/prisma.module.ts e src/prisma/prisma.service.ts.

Importe PrismaModule no AppModule.

 Implementar Entidades de Domínio (DDD mínimo)

src/payments/domain/Payment.entity.ts

src/payments/domain/PaymentMethod.entity.ts

Defina atributos privados, construtor com validações e métodos de comportamento.

 Criar Repositórios com Prisma

src/payments/infra/prisma-payment.repository.ts

src/payments/infra/prisma-payment-method.repository.ts

 Desenvolver Use Cases

CreatePaymentUseCase

ConfirmPaymentUseCase

 Criar Controllers e DTOs

src/payments/presentation/payments.controller.ts com rotas:

POST /payments

GET /payments/:id

PATCH /payments/:id/confirm

Defina DTOs com class-validator.

 Configurar Swagger / OpenAPI

Instale @nestjs/swagger e swagger-ui-express.

No main.ts, configure SwaggerModule para gerar /docs.

 Escrever Testes

Unit tests (Jest) para entidades e use cases.

Integration/E2E tests (Supertest) para endpoints.

 Montar Docker Compose

Crie docker-compose.yml com serviços api e db.

Teste com:

bash
Copiar
Editar
docker compose up -d
 Escrever o README.md

Objetivo do serviço

Escopo mínimo

Como rodar (clone, .env, migrate, docker)

Exemplos de curl

 Ajustes finais

Rode eslint --fix e prettier --write.

Organize commits com mensagens claras.

Sprint 2 (Maturidade Mínima)
 Adicionar Tenant

Atualize o ERD e schema.prisma.

Crie migration:

bash
Copiar
Editar
npx prisma migrate dev --name add-tenant
 Adicionar PaymentStatusHistory

Modele no ERD.

No ConfirmPaymentUseCase, insira lógica para criar um registro em PaymentStatusHistory.

 Testes para novas features

Unit + integration tests para Tenant e PaymentStatusHistory.

🚀 Com este checklist você mantém o core do MVP focado e garante evolução incremental, mostrando ao recrutador a sua visão completa de um microsserviço de pagamentos.