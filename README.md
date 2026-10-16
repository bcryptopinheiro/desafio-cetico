# Desafio Cético

Jogo de estudo de Filosofia (11.º ano): o que é conhecer, tipos de conhecimento, possibilidade do conhecimento e ceticismo, regressão infinita e fundacionalismo, origem do conhecimento (a priori e a posteriori). HTML, CSS e JavaScript puro, num único ficheiro.
Funciona como app (PWA): pode ser adicionado ao ecrã principal e funciona sem internet.

Site: https://bcryptopinheiro.github.io/desafio-cetico/

## O que tem

- **Botão «Continuar»** no topo: leva sempre ao próximo passo certo (o jogo a meio, o mundo seguinte, a simulação ou a revisão dos erros)
- **Plano até ao teste**: o aluno indica a data do teste e o jogo diz o que fazer hoje
- 5 mundos que se desbloqueiam com 70%, com tempo estimado e 1 a 3 estrelas. **A matéria vem aos bocadinhos**: uma parte curta, perguntas só sobre essa parte, a parte seguinte… e os desafios no fim. Ao repetir um mundo, pode-se escolher «só perguntas». O botão «Matéria» deixa rever a lição toda a meio do jogo
- **Respostas escritas dentro dos mundos** («Explica», «Justifica», «Distingue», incluindo a Julieta e o exercício 9): o aluno escreve (fica guardado), compara com a resposta-modelo e marca os pontos que incluiu
- **Matéria toda**: as lições completas de cada tema, para ler ou rever de seguida
- **Opções equilibradas**: as respostas erradas são plausíveis e do mesmo tamanho que a certa, para o tamanho não denunciar a resposta (o `verificar.mjs` controla isto)
- Minijogos: escolha múltipla, verdadeiro ou falso, completa a frase, classifica rápido (60 s), ordena o argumento, liga
- Cartões de estudo por tema (com as respostas abertas do teste), revisão dos erros e teste final de 0 a 20
- **Simulação do Teste** no formato do teste real: Grupo I escolha múltipla, Grupo II verdadeiro ou falso, Grupo III tabela a priori/a posteriori, Grupo IV desenvolvimento sobre o ceticismo (autoavaliação com checklist)
- **Modo relaxar (ASMR)**: fundo animado de slime (toca nos blobs) com som «squish»; durante as partes de matéria o fundo fica mais discreto. Tudo opcional nas definições
- Ecrã inicial arrumado: minijogos, «O que sai no teste», definições e recomeçar ficam em secções que abrem

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
{ id:'m2-50', m:2, s:0, t:'mc', q:'Pergunta', o:['CERTA','errada','errada','errada'], e:'Explicação' }
{ id:'m2-51', m:2, s:0, t:'vf', q:'Afirmação', a:true, e:'Explicação' }
{ id:'m2-52', m:2, s:0, t:'completa', q:'Frase com ___ no sítio da palavra', o:['CERTA','errada','errada','errada'], e:'...' }
```

`m` é o número do mundo (1–5) e `s` é a secção da lição desse mundo onde a matéria é explicada (começa em 0; a pergunta só aparece depois dessa parte). Cada `id` tem de ser único. Com `destaque:true`, a pergunta conta para o mínimo de perguntas de matéria nova no teste final.
