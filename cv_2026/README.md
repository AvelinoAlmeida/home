# CV e Carta de Apresentação 2026, Avelino Almeida

Compilador: **XeLaTeX** (Overleaf: Menu > Compiler > XeLaTeX).

## Estrutura

```
main.tex                  CV: junta as secções. Interruptor \publicotrue / \publicofalse no topo.
carta.tex                 Carta de apresentação (texto da carta).
estilo/cvestilo.sty       Visual partilhado (fonte, cores, secções). Mudar aqui muda os dois documentos.
dados/pessoais.tex        Nome, título e contactos (cabeçalho do CV e da carta).
dados/candidatura.tex     Empresa, função, referência: mudar em cada candidatura.
secoes/01_resumo.tex          Resumo
secoes/02_competencias.tex    Competências técnicas
secoes/03_experiencia.tex     Experiência profissional
secoes/04_docente.tex         Atividade docente
secoes/05_formacao.tex        Formação académica
secoes/06_certificacoes.tex   Certificações e formação
secoes/07_idiomas.tex         Idiomas
```

## Tarefas comuns

| Quero… | Editar |
|---|---|
| Atualizar um cargo ou um bullet | `secoes/03_experiencia.tex` |
| Acrescentar uma certificação | `secoes/06_certificacoes.tex` |
| Mudar telefone, email ou título | `dados/pessoais.tex` |
| Mudar a cor ou a fonte | `estilo/cvestilo.sty` |
| Retirar ou reordenar uma secção | comentar ou mover a linha `\input{...}` em `main.tex` |
| Variante para concursos públicos | `\publicotrue` em `main.tex` |
| Preparar uma candidatura | `dados/candidatura.tex` e o parágrafo "Porquê esta empresa" em `carta.tex` |
| Compilar a carta no Overleaf | Menu > Main document > `carta.tex` |

## Regras para manter o CV legível por ATS

- Não usar ícones, tabelas nem duas colunas.
- Competências: rótulo e valores na mesma linha (`\competencia{…}{…}`).
- Não trocar a fonte por Source Sans 3 (parte o hífen de "T-SQL" na extração).
- Manter 2 páginas.
