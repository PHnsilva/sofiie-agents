# Inferência local opcional

O projeto funciona sem Ollama para catálogo, planejamento, recuperação e handoff. O adaptador Ollama existe, mas um modelo real ainda precisa ser instalado e avaliado na máquina do operador.

## Preparação

1. Confira RAM disponível, GPU/VRAM e espaço em disco. A quantidade total de RAM não é a quantidade livre para o modelo.
2. Escolha um modelo pequeno quantizado voltado a instruções/código e verifique sua licença, requisitos e desempenho em português. Não há modelo padrão para evitar download ou recomendação incompatível com seu hardware.
3. Instale o [Ollama](https://ollama.com/download), configure `OLLAMA_NO_CLOUD=1` no ambiente do serviço e reinicie o Ollama. Siga a [documentação oficial](https://docs.ollama.com/faq#how-do-i-disable-ollama-cloud-features).
4. Baixe um modelo local escolhido por você, confira `ollama list` e copie o nome exato, incluindo tag.

## Executar em PowerShell

```powershell
$env:SOFIIE_PROVIDER = 'ollama'
$env:SOFIIE_MODEL = 'NOME_EXATO_DO_MODELO_LOCAL'
npm run consult -- backend "Propor critérios de aceite para uma API de tarefas"
```

Troque o placeholder pelo nome instalado. Não se trata de um modelo fornecido pelo projeto. Para voltar ao modo sem inferência:

```powershell
$env:SOFIIE_PROVIDER = 'handoff'
```

## Limites do adaptador

- Host fixo `http://127.0.0.1:11434`, sem redirect nem URL configurável.
- Somente nomes locais sem `cloud`, URL ou namespace; exige correspondência exata em `/api/tags`.
- Até 4.000 caracteres por tarefa, contexto solicitado de 4.096 tokens e até 1.024 tokens de geração.
- Timeout de 60 segundos em cada chamada HTTP, sem retry ou fallback de provedor. Um modelo lento pode atingir esse limite.
- Nenhuma ferramenta é fornecida ao modelo. O resultado é texto proposto, marcado como não confiável.
- Resposta incompleta ou erro explícito não vira resultado de sucesso.

Um host pode fazer múltiplas chamadas MCP; a política de uso é uma inferência de cada vez e o adaptador rejeita uma nova consulta enquanto outra está em andamento. Não há fila persistente, continuidade após reinício ou execução 24 horas.

Os testes de contrato usam respostas simuladas de `/api/tags` e `/api/chat`, sem download. Eles não provam qualidade, velocidade, licença ou execução real de um modelo. Registre esses dados em M1.
