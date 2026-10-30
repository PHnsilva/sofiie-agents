# Política de custo zero

Meta: **R$ 0 de contratação e consumo faturável de serviços no caminho entregue**, sem cartão, API paga, créditos promocionais ou compra de hardware. Energia, internet, armazenamento local e tempo de trabalho continuam existindo; desempenho útil de um modelo local não é garantido em qualquer computador.

| Recurso              | Caminho inicial                                      | Restrição                                                                  |
| -------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| Repositório          | GitHub público                                       | Somente código e exemplos públicos                                         |
| Inferência padrão    | Nenhuma, modo handoff                                | Um assistente externo pode ter custo próprio; não é requisito do runtime   |
| Inferência opcional  | Ollama local                                         | Modelo local selecionado, cloud desabilitado, sem fallback remoto          |
| CI                   | Runner padrão `ubuntu-latest` em repositório público | Sem larger runner, inferência, cache configurado, artifacts ou agendamento |
| Banco                | Arquivos locais versionados                          | SQLite futuro, sem serviço gerenciado                                      |
| Hospedagem           | Nenhuma                                              | Máquina deve estar ligada durante uso local                                |
| Comunicação          | MCP stdio local                                      | Peers externos exigem análise própria                                      |
| Treinamento de pesos | Fora do escopo                                       | Não contratar GPU nem executar fine-tuning no Actions                      |

O workflow contém condição para executar checks apenas quando o repositório é público. Se a visibilidade mudar para privada, ele fica sem execução de jobs de teste; rode `npm run check` localmente até revisar cotas e orçamento. Não utiliza armazenamento de artifacts nem cache explícito. Essa condição é proteção do projeto, não uma alteração no orçamento global da conta.

Não foram criados serviços externos, assinaturas, modelos na nuvem, Codespaces ou automações diárias. Nenhuma configuração de faturamento da conta foi alterada.

O Ollama deve ser instalado e configurado pelo operador para uso local, com `OLLAMA_NO_CLOUD=1` no serviço e reinicialização. O adaptador do projeto fixa o loopback, rejeita redirects e nomes cloud/URLs, exige modelo listado localmente e não faz fallback. Essas verificações não substituem a configuração do servidor Ollama nem isolam um programa de terceiros.

As condições de planos podem mudar. Antes de provisionar algo ou alterar CI, rever documentação e manter a ausência de serviços faturáveis como critério de aceite.

Fontes consultadas para o plano inicial:

- [Cobrança do GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions): runner padrão de repositório público permanece gratuito; larger runners e armazenamento têm regras distintas.
- [Ollama: modo somente local](https://docs.ollama.com/faq#how-do-i-disable-ollama-cloud-features): configuração de cloud no processo do servidor.
- [API local de chat](https://docs.ollama.com/api/chat): geração local com limites definidos pelo cliente.
