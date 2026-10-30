# Guia geral de contribuição

Adapte este documento às decisões locais antes de adotá-lo como regra. Confirme branch padrão, comandos, proteções e responsáveis reais. Não copie exceções administrativas ou convenções de outro repositório.

## Antes de trabalhar

Leia objetivo, escopo, requisitos, arquitetura/contratos existentes, instruções para agentes e a issue concreta. Confira alterações locais, base remota, PRs em andamento e dependências. Preserve autoria e trabalho que não fazem parte da entrega.

Use uma [issue executável](ISSUES.md). Se a necessidade ainda não existir, verifique se é nova entrega, decisão prévia ou parte inseparável de uma issue. Divida por resultado e dependência, sem esconder execução independente em checklist.

## Branches e commits

Trabalhe em branch própria a partir da base atualizada, conforme a política do repositório. Não presuma `main` ou `master`. Não force push em branch alheia e não descarte alterações para conseguir uma árvore limpa.

Quando o projeto não tiver convenção, uma opção é `tipo/numero-da-issue-resumo-curto`, como `fix/42-restaurar-sessao`. Tipos usuais: `feat`, `fix`, `docs`, `refactor`, `test` e `chore`. Não inclua sprint ou uma segunda sequência sem convenção explicitamente adotada.

Faça commits por mudança lógica. Mensagens precisam explicar a alteração. Se o projeto adotar Conventional Commits, use `tipo(escopo): resumo`, com escopo opcional. Registre motivo/impacto no corpo quando necessário. Não invente autoria, coautoria, testes ou números de issue.

## Validação

Escolha testes pelo risco e pelos critérios de aceite. Execute checks locais aplicáveis; interface exige estados reais, responsividade e acessibilidade; contratos exigem casos válidos e negativos; integrações exigem evidência de recebimento/processamento quando isso faz parte do aceite.

Documente ambiente e limitações. Diferencie mock, teste isolado, integração real e aceite. Testes escritos não equivalem a testes aprovados. Preserve evidências sanitizadas, sem segredos ou informações pessoais desnecessárias.

## Pull request e revisão

Explique problema, comportamento resultante, escopo, issue, dependências, validação e limites. PR parcial referencia a issue sem fechá-la; fechamento automático fica para a entrega final quando compatível com o procedimento local.

Prefira PR independente sobre a branch padrão. Se houver PRs empilhados, declare base, ordem e dependência; o diff deve mostrar somente o incremento. Após atualização, conflito resolvido ou novo push, confira o HEAD atual e repita as verificações afetadas.

Em equipe, obtenha a revisão independente exigida. Em projeto solo, siga a decisão documentada do proprietário para revisar e integrar. Não apresente revisão do próprio autor ou de seu agente como aprovação independente. Exceções precisam ser explícitas, limitadas e rastreáveis.

## Integração e aceite

Quem integra deve ter autorização e conferir critérios, diff atual, comentários, conflitos e checks. Merge não substitui homologação ou implantação quando exigidas. Não feche a issue nem mova para Done sem cumprir o aceite do projeto.

Agentes não fazem merge, autoaprovação, publicação, gasto ou ampliação de permissões por inferência a partir deste modelo geral. As autorizações específicas do proprietário e as regras locais definem essas ações.

Relatórios pessoais só podem registrar trabalho real informado ou comprovado. Cada pessoa mantém sua própria contribuição e autoria. Nunca invente reuniões, participação, datas, horas ou aceite.

Referências de convenções opcionais: [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) e [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Não são uma metodologia de gestão universal.
