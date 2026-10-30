# Validação do bootstrap

Evidências obtidas no ambiente local durante a criação do repositório. Consulte o histórico Git para a revisão exata do código e o workflow para resultados posteriores.

| Verificação                               | Resultado observado                                                       | Limite                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run format:check`                    | Aprovada                                                                  | Formatação, não comportamento                                                      |
| `npm run typecheck`                       | Aprovada                                                                  | Tipos estáticos                                                                    |
| `npm test`                                | 17 testes aprovados                                                       | Inferência Ollama usa respostas simuladas                                          |
| `npm run eval`                            | 12 de 12 cenários aprovados                                               | Regressão pública de roteamento por palavras-chave                                 |
| `npm run build`                           | Aprovada                                                                  | Build local TypeScript                                                             |
| MCP stdio                                 | Cliente se conecta, lista ferramentas e consulta handoff em processo real | Componentes do próprio projeto; sem host externo homologado                        |
| MCP outbound                              | Ferramenta permitida chamada e ferramenta fora da lista rejeitada         | Peer de teste deste projeto                                                        |
| CLI compilada                             | Plano e handoff executados com sucesso                                    | Nenhum modelo executado                                                            |
| `npm audit --omit=dev --audit-level=high` | Zero vulnerabilidades reportadas                                          | Fotografia do banco de avisos no momento da execução; não é auditoria de segurança |

Pendências: executar modelo local real, homologar um host MCP e um agente externo, construir baseline de qualidade de geração, pilotar uma issue do Sofiie e validar o ciclo de melhoria com revisão. Não há fine-tuning, automação diária, A2A ou integração de produção concluída.
