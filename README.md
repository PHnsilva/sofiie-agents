# Sofiie Agents

Base local de especialistas para desenvolver e revisar o [Sofiie](https://github.com/PHnsilva/Sofiie) e outros projetos. Um orquestrador prepara a tarefa, seleciona perfis e indica revisores. Um servidor MCP permite que outros assistentes usem esse catálogo e essas ferramentas.

O objetivo de longo prazo é melhorar instruções, conhecimento e resultados com avaliações e revisão humana. Esta versão **não treina pesos de modelos** e não modifica projetos autonomamente.

## Estado inicial

| Disponível                                               | Limite atual                                                |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| 24 perfis com missão e critérios próprios                | São especializações configuráveis, não 24 modelos treinados |
| Orquestrador com seleção explícita ou por palavras-chave | Produz planos; não executa a tarefa planejada               |
| Servidor MCP stdio com 5 ferramentas                     | Sem endpoint público, autenticação HTTP ou A2A              |
| Cliente MCP para peers locais autorizados                | Uso via CLI e configuração local revisada                   |
| Modo `handoff`, sem inferência                           | O assistente externo executa a análise por conta própria    |
| Adaptador Ollama opcional                                | Requer instalação e modelo local; não há modelo incluído    |
| Busca lexical com fontes e status                        | Sem embeddings; memória de lições aprovadas começa vazia    |
| Testes, avaliação de roteamento e CI                     | Não medem ainda qualidade de geração ou aprendizado         |

## Começar sem serviço pago

Pré-requisitos: **Node.js 24 LTS**, npm e Git. Não é necessário Docker, conta de API ou GPU para preparar planos e handoffs.

```powershell
git clone https://github.com/PHnsilva/sofiie-agents.git
cd sofiie-agents
npm ci
npm run check
npm run plan -- "Melhorar a interface frontend e a acessibilidade do Sofiie"
npm run consult -- accessibility "Revisar navegação com teclado e foco do formulário"
```

O último comando retorna instruções e a tarefa para você fornecer ao assistente que já utiliza. `inferenceExecuted: false` significa que nenhum modelo respondeu. O programa não transforma esse handoff em uma resposta simulada.

Para inferência local real, consulte [execução com Ollama](docs/local-models.md). O runtime lê variáveis do processo; `.env.example` é documentação e não é carregado automaticamente.

## Conectar outros assistentes por MCP

```powershell
npm run build
```

Adapte [config/mcp.example.json](config/mcp.example.json) com caminhos absolutos e registre o servidor em um host compatível com MCP stdio. Use diretamente `node caminho/dist/mcp/stdio.js`; mensagens de inicialização do npm não devem entrar no canal do protocolo. O formato exato de configuração depende do host.

Ferramentas: `list_specialists`, `get_specialist`, `plan_task`, `consult_specialist` e `search_knowledge`.

O caminho inverso também existe: a CLI chama ferramentas de peers locais definidos por você. [Guia MCP e peers](docs/mcp.md) explica configuração, limites e o teste de integração. Nenhuma conexão foi adicionada automaticamente à sua conta ou a outro aplicativo.

## Especialistas

Produto e requisitos; arquitetura; backend; frontend; UX; design de interfaces; acessibilidade; QA; segurança; privacidade; DevOps; confiabilidade; desempenho; dados; engenharia de IA; avaliações; memória e recuperação; MCP e interoperabilidade; desktop; voz; mobile/PWA; design de jogos; engines/Roblox; documentação e localização.

Cada tarefa seleciona até três perfis de trabalho e até três funções de revisão. Isso não inicia processos. A [matriz de especialistas](docs/specialists.md) explica uso, entregas e tecnologias por área.

## Estrutura

```text
src/
  agents/         catálogo e instruções
  orchestrator/   planejamento sem efeitos externos
  providers/      handoff e Ollama local
  mcp/            servidor stdio e cliente de peers
  memory/         recuperação de conhecimento versionado
  evals/          regressão do roteamento
knowledge/        referências e lições aprovadas separadas
evals/            cenários públicos de regressão
tests/            testes unitários e comunicação MCP real
docs/             arquitetura, plano e operação
config/           exemplos sem credenciais
.github/          CI e modelos de issues/PR
```

## Plano e evolução

Leia o [plano do projeto](docs/roadmap.md), a [arquitetura](docs/architecture.md), o [ciclo de melhoria](docs/learning-loop.md) e a [política de custos](docs/costs.md). O backlog ficará nas [issues](https://github.com/PHnsilva/sofiie-agents/issues).

Prioridade: validar um modelo local e um host MCP real, estabelecer avaliações de geração, executar um piloto no Sofiie e só então adicionar memória persistente, ferramentas com escrita e federação A2A. Nenhum agendamento diário está ativo.

## Validação e contribuição

`npm run check` verifica formatação, tipos, testes, casos de roteamento e build. Os testes de Ollama usam respostas simuladas; os testes MCP iniciam processos reais deste repositório. Um teste entre componentes do próprio projeto não comprova integração com um agente de terceiros.

Abra uma issue com critério de aceite, trabalhe em branch própria e envie PR com evidências. Conhecimento só entra em `knowledge/approved.json` após revisão e evidência. Não publique dados pessoais, prompts privados, chaves ou respostas de usuários.

Veja [CONTRIBUTING.md](CONTRIBUTING.md), [AGENTS.md](AGENTS.md) e [SECURITY.md](SECURITY.md). Licença [MIT](LICENSE); dependências e modelos mantêm suas próprias licenças.
