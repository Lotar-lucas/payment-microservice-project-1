Núcleo de Pagamentos
1) Criar pagamento (idempotente) — P1
Como checkout
Quero criar um pagamento para um pedido
Para iniciar a cobrança sem duplicar transações

Aceite

Envia POST /payments com orderId, amount > 0, currency, methodId, Idempotency-Key.

Na primeira vez: 201 com {id, status: PENDING, ...}.

Reenvio com a mesma Idempotency-Key e mesmo payload: 200 com a mesma resposta.

Se methodId inativo ou inválido: 422 com código/mensagem clara.

Reenvio com mesma chave e payload diferente: 409.

DoD

Validações server-side, Payment.status como enum.

Seed de PaymentMethod (pix, credit_card).

Testes: feliz, inválido, idempotência (igual/diferente).

2) Consultar pagamento — P1
Como backoffice/checkout
Quero buscar pagamento por ID
Para ver status e links de ação

Aceite

GET /payments/:id retorna 200 com dados + links (self, confirm, refunds).

ID inexistente: 404.

DoD

Índices em id, status.

Testes: existente/inexistente.

3) Confirmar/Capturar pagamento — P1
Como sistema de cobrança
Quero confirmar/capturar um pagamento pendente
Para concluir a transação

Aceite

PATCH /payments/:id/confirm:

Se status = PENDING: cria PaymentAttempt (operation=capture), registra sucesso/falha, atualiza status para CAPTURED em sucesso.

Em falha: mantém PENDING ou marca FAILED (defina política) e registra erro.

Se estado não elegível (ex.: CANCELED, REFUNDED): 409.

DoD

Atualização + Attempt + PaymentEvent na mesma transação.

Testes: sucesso, falha, conflito de estado.

4) Listar pagamentos com filtros — P2
Como operador
Quero filtrar por status, orderId, período
Para localizar rapidamente

Aceite

GET /payments?status=...&orderId=...&from=...&to=... → paginação + metadados.

Parâmetros inválidos: 400.

DoD

Índices em status, orderId, createdAt.

Testes: combinações principais.

Reembolsos
5) Solicitar reembolso (parcial/total) — P1
Como pós-venda
Quero solicitar reembolso para um pagamento capturado
Para devolver valores

Aceite

POST /payments/:id/refunds com amount > 0.

Elegível: status em CAPTURED (ou política definida).

Cria Refund(status=requested) e PaymentEvent(REFUND_REQUESTED).

Se amount > disponível (capturado – já reembolsado): 422.

Pagamento não elegível: 409.

DoD

Somatório de refunds ≤ valor capturado.

Testes: total/parcial, excesso, estado inválido.

6) Processar reembolso (mock provider) — P2
Como worker
Quero processar reembolsos no provedor
Para concluir a devolução

Aceite

Ao processar: cria PaymentAttempt (operation=refund), atualiza Refund para processed ou failed, gera evento.

Se reembolso total concluído: Payment.status = REFUNDED.

DoD

Job/worker simples (Nest Schedule) com logs.

Testes: sucesso/falha.

Observabilidade & Auditoria
7) Registrar tentativas no gateway — P1
Como engenharia/SRE
Quero rastrear cada chamada a provedor
Para depurar e conciliar

Aceite

Toda confirmação/refund grava PaymentAttempt com provider, operation, status, requestPayload, responsePayload, errorCode, errorMessage.

GET /payments/:id/attempts lista tentativas (ordem desc por data).

DoD

Índice [provider, status].

Testes: gravação e listagem.

8) Trilha de eventos de domínio — P1
Como auditoria
Quero histórico de eventos
Para reconstruir a jornada do pagamento

Aceite

Gera PaymentEvent para: PAYMENT_CREATED, CAPTURED, FAILED, REFUND_REQUESTED, REFUND_PROCESSED, REFUND_FAILED, CANCELED.

GET /payments/:id/events retorna lista em ordem cronológica.

DoD

Testes: presença dos eventos nos cenários principais.

Integração Resiliente
9) Outbox transacional — P1
Como arquiteto de integração
Quero gravar eventos em Outbox na mesma transação
Para garantir publicação posterior sem perda

Aceite

Em transições relevantes (ex.: CAPTURED, REFUND_PROCESSED) insere OutboxMessage {eventType, payload, published=false} na mesma transação.

Worker periódico publica (mock/log) e marca published=true + publishedAt.

Mensagens travadas reprocessam (retry simples).

DoD

Worker com backoff básico.

Testes: inserir → publicar → marcar; idempotência do worker.

10) Idempotência genérica — P2
Como plataforma
Quero tolerar reenvios
Para evitar efeitos colaterais duplicados

Aceite

POST /payments exige Idempotency-Key; armazena requestHash, statusCode, responseBody; re-servir resposta em reenvio idêntico.

Reuso da mesma chave com payload diferente → 409.

Opcional: aplicar também em POST /refunds.

DoD

Testes de reenvio igual/diferente.

Segurança, Qualidade e DX
11) Regras de estado coerentes — P1
Como time de produto
Quero impedir transições inválidas
Para manter consistência

Aceite

Máquina de estados clara:
PENDING -> CAPTURED/FAILED
CAPTURED -> REFUNDED/CANCELED

Transição inválida → 409 com code e detail.

DoD

Testes cobrindo transições válidas/ inválidas.

12) Logs estruturados & correlação — P2
Como SRE
Quero logs com X-Request-Id
Para rastrear requisições

Aceite

Middleware que aceita X-Request-Id ou gera um.

Logs JSON com nível, msg, paymentId, latência.

Contadores mínimos por status HTTP.

DoD

Testes do middleware e formatação.

13) Swagger com exemplos — P1
Como consumidor da API
Quero documentação navegável
Para testar rápido

Aceite

/docs com exemplos reais de requests/responses (create, confirm, list, refunds).

Headers documentados: Idempotency-Key, X-Request-Id.

DoD

Schemas alinhados aos DTOs/Prisma.

Checagem manual de navegação.

14) Seeds, Docker e README — P1
Como dev
Quero subir o ambiente em 1 comando
Para focar nas features

Aceite

docker compose up -d sobe app + DB.

Script db:seed popula PaymentMethod.

README explica setup, scripts e decisões de arquitetura.

DoD

Healthcheck e smoke test local.

15) Listagens auxiliares (attempts/refunds) — P2
Como backoffice
Quero listas por pagamento
Para suporte e conciliação

Aceite

GET /payments/:id/attempts → 200 lista.

GET /payments/:id/refunds → 200 lista.

DoD

Testes simples de listagem.