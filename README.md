# Desafio Cético

Jogo de estudo de Filosofia (11.º ano): o que é conhecer, tipos de conhecimento, possibilidade do conhecimento e ceticismo, regressão infinita e fundacionalismo, origem do conhecimento (a priori e a posteriori). HTML, CSS e JavaScript puro, num único ficheiro.

Site: https://bcryptopinheiro.github.io/desafio-cetico/

## O que tem

- 5 mundos que se desbloqueiam com 70%, com 1 a 3 estrelas
- Minijogos: escolha múltipla, verdadeiro ou falso, completa a frase, classifica rápido (60 s), ordena o argumento, liga
- Cartões de estudo (com as respostas abertas do teste), revisão dos erros e teste final de 0 a 20
- Fundo animado de slime (pode ser desligado nas definições) e som opcional

O progresso fica guardado no browser (`localStorage`).

## Onde está cada coisa

Está tudo em `index.html`:

| Parte | O que tem |
|---|---|
| `<style>` | Cores e aspeto (claro, escuro, telemóvel, fundo de slime) |
| `CONTEUDO` (topo do `<script>`) | Toda a matéria: perguntas, frases para classificar, argumento, pares para ligar, cartões |
| Resto do `<script>` | A lógica do jogo (não é preciso mexer para acrescentar perguntas) |

## Acrescentar perguntas

No objeto `CONTEUDO.perguntas`, a primeira opção de `o` é sempre a certa (o jogo baralha as opções):

```js
{ id:'m2-30', m:2, t:'mc', q:'Pergunta', o:['CERTA','errada','errada','errada'], e:'Explicação' }
{ id:'m2-31', m:2, t:'vf', q:'Afirmação', a:true, e:'Explicação' }
{ id:'m2-32', m:2, t:'completa', q:'Frase com ___ no sítio da palavra', o:['CERTA','errada','errada','errada'], e:'...' }
```

`m` é o número do mundo (1–5) e cada `id` tem de ser único. Com `destaque:true`, a pergunta conta para o mínimo de perguntas de matéria nova no teste final.
