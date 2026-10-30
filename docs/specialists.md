# Matriz de especialistas

Os 24 especialistas são perfis de uma mesma base. Compartilham contratos, fontes e política de revisão; não exigem modelos diferentes. O orquestrador é o coordenador e não é contado entre os 24.

| ID                 | Área                     | Quando consultar                       | Entrega/tecnologias de referência                             |
| ------------------ | ------------------------ | -------------------------------------- | ------------------------------------------------------------- |
| `product`          | Produto e requisitos     | Objetivo ambíguo, escopo e prioridades | Problema, histórias, critérios e dependências                 |
| `architecture`     | Arquitetura              | Mudança de limites e contratos         | ADR, desenho modular, contratos e invariantes                 |
| `backend`          | Backend e APIs           | Serviço, autorização e transação       | TypeScript/Fastify; Java/Spring ou C#/.NET se o projeto usar  |
| `frontend`         | Frontend                 | Telas web e estados                    | HTML/CSS/TypeScript; framework conforme o produto             |
| `ux`               | UX e pesquisa            | Fluxos e fricção                       | Hipóteses, roteiro de pesquisa e teste de usabilidade         |
| `visual-design`    | Design visual            | Composição e identidade de interface   | Hierarquia, tipografia, paleta e responsividade               |
| `accessibility`    | Acessibilidade           | Toda experiência de usuário            | WCAG 2.2 AA, semântica, teclado e leitores de tela            |
| `qa`               | Qualidade                | Aceite e regressão                     | Testes por risco; node:test, Playwright conforme contexto     |
| `security`         | Segurança                | Dados, comandos, ferramentas e rede    | Ameaças, autorização, validação e teste negativo              |
| `privacy`          | Privacidade              | Voz, dados pessoais e retenção         | Minimização, acesso, exclusão e requisitos a revisar          |
| `devops`           | Entrega                  | Build, CI e implantação                | GitHub Actions; Docker só quando justificado                  |
| `sre`              | Confiabilidade           | Falhas e recuperação                   | Logs mínimos, métricas, timeout e procedimento de recuperação |
| `performance`      | Desempenho               | Lentidão e limite da máquina           | Benchmark reproduzível de CPU, GPU, memória e latência        |
| `data`             | Dados                    | Persistência e consultas               | SQLite local; PostgreSQL quando existir necessidade real      |
| `ai`               | IA                       | Provedor, prompts e inferência         | Ollama local, contratos de entrada/saída, seleção de modelo   |
| `evaluations`      | Avaliações               | Comparar versões e aprendizado         | Datasets sanitizados, rubricas, baseline e reserva            |
| `knowledge`        | Conhecimento             | Memória e recuperação                  | Fontes, validade, busca textual; RAG medido no futuro         |
| `interoperability` | MCP e protocolos         | Ferramentas e outros agentes           | SDK MCP oficial, schemas e futura integração A2A              |
| `desktop`          | Desktop                  | Bridge e ações locais                  | Tauri/Rust, comandos fixos e testes Windows                   |
| `voice`            | Voz/multimodal           | STT/TTS e áudio                        | Avaliar alternativas locais, latência e português             |
| `mobile`           | Mobile/PWA               | Toque, offline e permissões            | PWA primeiro; nativo se o produto exigir                      |
| `game-design`      | Design de jogos          | Mecânicas e progressão                 | Documento curto, protótipo e playtest                         |
| `game-engine`      | Engines/Roblox           | Sistemas e rede de jogos               | Godot/GDScript, Unity/C# ou Roblox/Luau conforme o projeto    |
| `documentation`    | Documentação/localização | Guias, contratos e textos              | Markdown, exemplos executáveis, português e inglês            |

Essas tecnologias são referências para tarefas, não bibliotecas instaladas por este repositório. O bootstrap instala apenas as dependências do runtime e da qualidade em TypeScript.

## Como coordenar

1. O orquestrador inspeciona contexto e define aceite.
2. Seleciona até três perfis de trabalho. A heurística de palavras-chave é o padrão; seleção explícita deve ser usada em tarefas ambíguas.
3. QA revisa por padrão, exceto quando já está entre os perfis de trabalho. UI, mobile e voz recebem revisão de acessibilidade; APIs, IA, dados, desktop, MCP e entrega recebem segurança.
4. O host ou operador consulta os perfis de forma sequencial. O planejador não inicia workers.
5. O responsável consolida conflitos, executa validações e solicita revisão independente do PR. Uma persona revisando sua própria saída não é revisão humana independente.

## O que ainda será especializado

O conjunto inicial pode receber exemplos reais, rubricas e ferramentas específicas por área. Esse trabalho depende de avaliações: ter um nome e um prompt não prova competência de frontend, segurança, jogos ou qualquer outra área.

Não instalar todos os ecossistemas de uma vez. Por exemplo, Roblox exige validação real no Studio quando aplicável; mencionar Luau no perfil não torna essa integração implementada.
