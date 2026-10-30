# Segurança

O projeto está em estágio inicial e não foi auditado para produção. O servidor MCP é local por stdio. Não abra esse canal na rede nem acrescente ponte HTTP sem projeto de autenticação, autorização e validação de origem/host.

Não envie vulnerabilidades contendo segredos ou dados privados em issues públicas. Use o recurso de relato privado do GitHub quando disponível. Se não estiver habilitado, peça ao mantenedor um canal privado antes de compartilhar detalhes exploráveis.

O modelo gera texto e não executa ações. O cliente de peers inicia programas configurados localmente com permissões do usuário; a allowlist não limita o que o programa faz internamente. Não execute peers de origem desconhecida.

Não existe garantia de resistência geral a prompt injection. A defesa inicial reduz as ações expostas e valida contratos. Antes de adicionar escrita, shell, rede remota ou persistência sensível, revise o modelo de ameaças e teste efeitos reais.
