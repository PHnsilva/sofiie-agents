# Matriz de competências

Os 25 perfis representam responsabilidades, sem impor produtos, linguagens ou frameworks. O orquestrador coordena o trabalho e não é contado entre os especialistas. Um perfil não demonstra competência sem casos e avaliações pertinentes.

| ID                 | Competência                | Quando consultar                           | Entrega e revisão esperadas                             |
| ------------------ | -------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| `product`          | Produto e requisitos       | Necessidade, escopo ou aceite pouco claros | Problema, resultado, limites e critérios verificáveis   |
| `architecture`     | Arquitetura                | Fronteiras, contratos e qualidade          | Alternativas, justificativa, consequências e coerência  |
| `backend`          | Serviços e APIs            | Regras, transações e contratos             | Invariantes, autorização, erros e integração            |
| `frontend`         | Interfaces web             | Interação e estados da interface           | Fluxos, responsividade e semântica                      |
| `ux`               | Pesquisa e usabilidade     | Hipóteses sobre uso e fricção              | Plano de pesquisa, achados e decisões sustentadas       |
| `visual-design`    | Design visual              | Hierarquia e legibilidade                  | Composição adequada ao público e à função               |
| `accessibility`    | Acessibilidade             | Barreiras de percepção e interação         | Avaliação automática, manual e assistiva pertinente     |
| `qa`               | Qualidade                  | Aceite e regressão                         | Cenários por risco e evidências reproduzíveis           |
| `security`         | Segurança                  | Entradas, identidade e permissões          | Ameaças, controles e testes negativos                   |
| `privacy`          | Privacidade                | Dados pessoais e retenção                  | Minimização, acesso, exclusão e requisitos a revisar    |
| `devops`           | Construção e entrega       | Reprodutibilidade e implantação            | Pipeline, configuração, custo e recuperação             |
| `sre`              | Confiabilidade             | Falhas e operação                          | Sinais mínimos, falhas e recuperação                    |
| `performance`      | Desempenho                 | Limites de tempo e recursos                | Medição antes/depois com ambiente e carga               |
| `data`             | Dados e persistência       | Modelo e mudanças de dados                 | Integridade, migração, acesso e restauração             |
| `ai`               | Engenharia de IA           | Modelos, contexto e geração                | Contratos, limites, custo, licença e falhas             |
| `evaluations`      | Avaliação de agentes       | Comparação e evolução                      | Baseline, rubricas, reserva e regressões                |
| `knowledge`        | Conhecimento               | Fontes, memória e validade                 | Proveniência e recuperação útil com revisão             |
| `interoperability` | Protocolos e integração    | Ferramentas e outros agentes               | Contratos, confiança e comunicação real                 |
| `desktop`          | Integração local           | Dispositivos e sistema operacional         | Ações estruturadas e validação no ambiente alvo         |
| `voice`            | Voz e multimodalidade      | Áudio e conversa                           | Estados, erros, consentimento e alternativa textual     |
| `mobile`           | Experiência móvel          | Toque e conectividade                      | Fluxo, permissões e execução no dispositivo             |
| `game-design`      | Design de jogos            | Mecânicas e experiência                    | Hipóteses, protótipo e teste com jogadores              |
| `game-engine`      | Jogos e simulação          | Física e sincronização                     | Comportamento, autoridade e desempenho                  |
| `documentation`    | Documentação e localização | Comunicação de contratos e uso             | Informação por público e exemplos válidos               |
| `modeling`         | Modelagem e diagramas      | Estrutura, comportamento ou dependências   | Fonte editável, renderização e revisão semântica/visual |

## Referências e escolha técnica

As fontes ficam no [catálogo de referências](references.md) e nas propriedades `references` devolvidas pelo catálogo MCP. Consulte-as conforme a pergunta, a versão do projeto e os requisitos. Elas não são conteúdo automaticamente consultado pelo modelo nem dependências instaladas.

Um ADR é uma forma possível de registrar uma decisão e sua justificativa. Não é uma arquitetura, padrão de design ou metodologia obrigatória. A notação de um diagrama depende da pergunta. Nenhum perfil obriga todo projeto a usar o mesmo framework ou processo.

## Coordenação no runtime atual

O planejador seleciona até três perfis por palavras-chave ou seleção explícita e indica revisores conforme o risco. Não inicia processos. O host ou operador conduz a execução. Perfis não têm memória independente nem acesso automático a ferramentas.

O responsável consolida conflitos, verifica critérios e submete a alteração a revisão. Uma persona revisando sua própria resposta não equivale a revisão independente. Para organizar o trabalho, consulte os [guias reutilizáveis](../guides/README.md).
