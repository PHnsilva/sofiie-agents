# Contribuição

Use os [guias reutilizáveis](guides/README.md) como orientação. Eles não impõem metodologia; as regras abaixo são específicas deste repositório.

Escreva issues pelo [guia de qualidade e dependências](guides/ISSUES.md). A convenção local é título com ação e resultado, sem sprint ou segunda sequência obrigatórias; branch `tipo/numero-da-issue-resumo`. Use o tipo nativo quando disponível, senão a label `type:task`; labels de área e prioridade seguem [docs/backlog.md](docs/backlog.md). Não confundir área, tamanho, prioridade e estado.

Abra uma issue com problema, contexto sanitizado e critérios de aceite. Identifique a etapa correspondente no roadmap. Trabalhe em branch própria, use commits pequenos (`feat:`, `fix:`, `docs:`, `test:` ou `chore:`) e abra PR vinculado à issue.

Antes do PR, rode `npm ci` e `npm run check`. Mudanças de contratos MCP exigem teste de integração; provedores exigem testes de falha e custo; interfaces futuras exigem inspeção visual e acessibilidade. Indique claramente mocks, ambientes não testados e dependências externas.

Não crie serviço pago, amplie permissões, agende execução ou instale modelos para outra pessoa como parte de uma contribuição comum. Não altere dependências sem revisar versão, licença e necessidade.

Revisão de agente ajuda na preparação, mas não substitui revisão independente do responsável. Não fazer autoaprovação ou auto-merge. Uma lição de conhecimento precisa citar evidência sanitizada e PR revisado.
