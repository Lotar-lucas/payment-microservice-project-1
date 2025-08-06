## PaymentMethod 
Explicação dos campos
- id: identificador único interno.

- code: chave curta para o método (sempre use snake_case sem espaços).

- displayName: a forma como o método aparece na UI ou em logs.

- provider (opcional): para indicar qual gateway/provider gerencia esse método.

- config (JSON opcional): armazena credenciais e parâmetros específicos (API key, URLs, timeouts).

- isActive: permite desabilitar temporariamente um método sem perder histórico.

- createdAt / updatedAt: timestamps automáticos para auditoria básica.