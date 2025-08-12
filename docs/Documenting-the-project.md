# Documentação de Criação do Projeto - Núcleo de Pagamentos

## Visão Geral
Este projeto implementa um **serviço de pagamentos** baseado em **NestJS + TypeScript + Prisma + PostgreSQL**.  
O objetivo é prover uma API REST robusta, idempotente e auditável para lidar com criação, captura, reembolso e consulta de pagamentos.

A modelagem foi desenhada para garantir **integridade**, **observabilidade** e **resiliência na integração com provedores externos**.

---

## O que vai ter e por quê

### Funcionalidades Principais (P1)
- **Criação de Pagamento (Idempotente)**  
  Para evitar duplicação em cenários de reenvio.

- **Consulta de Pagamento**  
  Permite verificar status e histórico.

- **Confirmação/Captura de Pagamento**  
  Finaliza a cobrança no provedor.

- **Solicitação de Reembolso (Parcial/Total)**  
  Atende a processos de pós-venda.

- **Registro de Tentativas no Provedor (PaymentAttempt)**  
  Para auditoria técnica e depuração.

- **Trilha de Eventos de Domínio (PaymentEvent)**  
  Permite reconstruir o histórico de um pagamento.

- **Outbox Transacional**  
  Garante publicação confiável de eventos para outros sistemas.

- **Regras de Estado Coerentes (Máquina de Estado)**  
  Evita transições inválidas.

- **Swagger com exemplos reais**  
  Facilita testes e integração.

- **Seeds, Docker e README claros**  
  Garantem que o ambiente suba rapidamente.

### Funcionalidades Secundárias (P2)
- **Listagem com Filtros**  
  Para facilitar buscas por status, período e orderId.

- **Processamento Automático de Reembolsos (Worker)**  
  Automatiza chamadas ao provedor.

- **Idempotência Genérica**  
  Evita duplicação também em refunds.

- **Logs Estruturados + Correlação (X-Request-Id)**  
  Aumenta a rastreabilidade.

- **Listagens Auxiliares (attempts/refunds)**  
  Apoio para backoffice e SRE.

---

## O que não vai ter e por quê

- **Suporte Multi-Moeda Completo com Câmbio**  
  Fora do escopo inicial; manteremos `currency` apenas como código ISO3 sem conversões automáticas.

- **Integração Direta com Provedores Reais**  
  Começaremos com provider mock para simplificar desenvolvimento e testes.

- **Interface Web de Administração**  
  Escopo é API; front ficará para outro projeto.

- **Pagamentos Recorrentes/Assinaturas**  
  Requer lógica e estados adicionais; fora do MVP.

- **Gateway Failover Multi-Provedor**  
  Complexidade alta para fase inicial; pode ser evoluído depois.

---

## Justificativas de Arquitetura

1. **NestJS + TypeScript**  
   Estrutura modular, tipagem forte e boa integração com testes.

2. **Prisma ORM + PostgreSQL**  
   Produtividade no desenvolvimento, migrações seguras e suporte a recursos como JSONB e índices parciais.

3. **DDD + Máquina de Estados**  
   Clareza nas transições e regras de negócio.

4. **Outbox Pattern**  
   Garante entrega de eventos mesmo em falhas de publicação.

5. **Idempotência via tabela dedicada**  
   Evita efeitos colaterais duplicados em reenvios.
   
6. **Refunds com Somatório Validado**  
   Evita devoluções acima do valor capturado.

---

## Próximos Passos

- Finalizar diagrama ER atualizado.
- Configurar testes unitários e de integração.
- Criar pipeline de CI/CD.
- Publicar documentação no repositório.

---

**Data:** 2025-08-11  
**Autor:** Lucas Lotar

------------------------------------------------------------------------------------------------------------------------
