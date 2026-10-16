# Desafio Cético

Jogo de estudo de Filosofia (11.º ano): o que é conhecer, tipos de conhecimento, possibilidade do conhecimento e ceticismo, regressão infinita e fundacionalismo, origem do conhecimento (a priori e a posteriori). HTML, CSS e JavaScript puro, num único ficheiro.
Funciona como app (PWA): pode ser adicionado ao ecrã principal e funciona sem internet.

Site: https://bcryptopinheiro.github.io/desafio-cetico/

## O que tem

- **Aprender a matéria**: a matéria dos 5 mundos explicada, com exemplos e truques. Cada mundo abre com a sua lição antes das perguntas, e o botão «Matéria» deixa revê-la a meio do jogo
- 5 mundos que se desbloqueiam com 70%, com 1 a 3 estrelas
- Minijogos: escolha múltipla, verdadeiro ou falso, completa a frase, classifica rápido (60 s), ordena o argumento, liga
- Cartões de estudo por tema (com as respostas abertas do teste), revisão dos erros e teste final de 0 a 20
- **Simulação do Teste** no formato do teste real: Grupo I escolha múltipla, Grupo II verdadeiro ou falso, Grupo III tabela a priori/a posteriori, Grupo IV desenvolvimento sobre o ceticismo (autoavaliação com checklist)
- Fundo animado de slime (pode ser desligado nas definições) e som opcional

## Guardar e recomeçar

Tudo fica guardado no browser (`localStorage`, chave `desafio-cetico-v1`):

- XP, estrelas, recordes, erros para rever e cartões que já sabes
- **Jogos a meio**: mundos, teste final e simulação (incluindo a tabela e o texto do Grupo IV, guardado enquanto se escreve). Ao sair com ✕, continua-se depois na mesma pergunta
- **Recomeçar**: botão ↺ ao lado de cada mundo (com confirmação; os mundos já abertos continuam abertos), e no início, com dois toques, recomeçar o teste final ou a simulação, limpar a revisão dos erros ou pôr os cartões como «por saber». «Apagar todo o progresso» apaga tudo menos as definições

## Onde está cada coisa

Está tudo em `index.html`:

| Parte | O que tem |
|---|---|
| `<style>` | Cores e aspeto (claro, escuro, telemóvel, fundo de slime) |
| `CONTEUDO` (topo do `<script>`) | Toda a matéria: lições, perguntas, frases para classificar (e a tabela do Grupo III), argumento, pares para ligar, cartões, Simulação do Teste |
| Resto do `<script>` | A lógica do jogo (não é preciso mexer para acrescentar perguntas) |

Outros ficheiros:

| Ficheiro | O que tem |
|---|---|
| `manifest.webmanifest`, `icons/` | Nome e ícones da app no ecrã principal |
| `sw.js` | Guarda o jogo no telemóvel para funcionar sem internet. **Ao publicar uma atualização, muda o número da versão** (v1 → v2 → …) |
| `testes/verificar.mjs` | Verifica perguntas, respostas, lições, cartões e ficheiros da app: `node testes/verificar.mjs` (tem de acabar com «Tudo certo ✔») |

## Acrescentar perguntas

No objeto `CONTEUDO.perguntas`, a primeira opção de `o` é sempre a certa (o jogo baralha as opções):

```js
{ id:'m2-30', m:2, t:'mc', q:'Pergunta', o:['CERTA','errada','errada','errada'], e:'Explicação' }
{ id:'m2-31', m:2, t:'vf', q:'Afirmação', a:true, e:'Explicação' }
{ id:'m2-32', m:2, t:'completa', q:'Frase com ___ no sítio da palavra', o:['CERTA','errada','errada','errada'], e:'...' }
```

`m` é o número do mundo (1–5) e cada `id` tem de ser único. Com `destaque:true`, a pergunta conta para o mínimo de perguntas de matéria nova no teste final.
