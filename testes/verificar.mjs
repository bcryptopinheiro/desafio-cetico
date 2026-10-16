// Verifica o conteúdo do Desafio Cético.
// Uso (na pasta do projeto):  node testes/verificar.mjs   (tem de acabar com «Tudo certo ✔»)
// Lê o index.html, confirma que o script não tem erros de sintaxe e verifica perguntas, frases, cartões e a Simulação do Teste.
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = html.split('<script>')[1].split('</script>')[0];

let fails = 0;
const ok = (cond, msg) => { console.log(`${cond ? '✔' : '✘'} ${msg}`); if (!cond) fails++; };

console.log('— Script —');
let sintaxe = true;
try { new vm.Script(script); } catch (e) { sintaxe = false; console.log(e.message); }
ok(sintaxe, 'o script não tem erros de sintaxe');

const ctx = {};
vm.createContext(ctx);
vm.runInContext(script.split('/* =====================================================================\n   MOTOR')[0] + ';globalThis.C = CONTEUDO;', ctx);
const C = ctx.C;

console.log('— Perguntas —');
const P = C.perguntas;
const ids = P.map((p) => p.id);
ok(new Set(ids).size === ids.length, `ids únicos (${ids.length} perguntas)`);
ok(P.every((p) => p.m >= 1 && p.m <= 5), 'todas as perguntas têm mundo de 1 a 5');
ok(P.filter((p) => p.t !== 'vf').every((p) => Array.isArray(p.o) && p.o.length === 4 && new Set(p.o).size === 4), 'escolha múltipla e completa: 4 opções diferentes');
ok(P.filter((p) => p.t === 'vf').every((p) => typeof p.a === 'boolean'), 'verdadeiro/falso: resposta true ou false');
ok(P.filter((p) => p.t === 'completa').every((p) => p.q.includes('___')), 'completa a frase: tem o espaço ___');
ok(P.every((p) => p.e && p.e.length > 5), 'todas as perguntas têm explicação');
// (as lições podem dizer que Descartes e Hume não saem; o que não pode haver são perguntas ou cartões sobre eles)
ok(!/Descartes|Hume/i.test(JSON.stringify([C.perguntas, C.classificar, C.cartoes, C.ligar, C.simulacao])), 'não há perguntas nem cartões sobre Descartes ou Hume (não saem)');
const discutiveis = ['sólidos ocupam espaço', 'fruto da macieira', 'Em quantos argumentos'];
ok(discutiveis.every((f) => !JSON.stringify(C).includes(f)), 'sem exemplos discutíveis (o manual e os apontamentos não estão de acordo)');
for (const m of C.mundos) ok(P.filter((p) => p.m === m.n).length >= m.nPerguntas, `mundo ${m.n}: banco chega para ${m.nPerguntas} perguntas por jogo`);
const vfEx = P.filter((p) => p.t === 'vf' && /Julieta|cético radical|ceticismo radical/.test(p.q));
ok(vfEx.length >= 6, `pelo menos 6 V/F sobre os exercícios 1 e 9 (${vfEx.length})`);

console.log('— Classificar —');
for (const [k, set] of Object.entries(C.classificar)) {
  ok(set.itens.every((i) => set.cats.some((c) => c.k === i.c)), `${k}: todas as frases têm categoria válida (${set.itens.length})`);
  ok(set.cats.every((c) => set.porque[c.k]), `${k}: cada categoria tem explicação`);
}
const jul = C.classificar.tipos.itens.filter((i) => /Julieta/.test(i.x));
const esperado = ['pr', 'c', 'p', 'pr', 'pr', 'p', 'c'];
ok(jul.length === 7 && jul.every((i, n) => i.c === esperado[n]), 'exercício 1 (Julieta A–G): respostas do manual');

console.log('— Simulação do Teste —');
const S = C.simulacao, G = S.grupos;
ok(G.reduce((s, g) => s + g.cotacao, 0) === 20, 'cotações somam 20 valores');
ok(P.filter((p) => p.t === 'mc').length >= G[0].n, `Grupo I: há pelo menos ${G[0].n} escolhas múltiplas`);
ok(P.filter((p) => p.t === 'vf').length >= G[1].n, `Grupo II: há pelo menos ${G[1].n} verdadeiro/falso`);
const tab = C.classificar.tabela.itens;
ok(tab.filter((i) => i.c === 'pri').length >= G[2].n / 2 && tab.filter((i) => i.c === 'pos').length >= G[2].n / 2, `Grupo III: frases suficientes de cada coluna (${tab.length})`);
ok(S.desenvolvimento.length === 3, 'Grupo IV: 3 variantes');
ok(S.desenvolvimento.every((d) => d.pontos.length && d.pontos.every((i) => S.pontos[i]) && d.modelo.length > 200), 'Grupo IV: checklist e resposta-modelo válidas');

console.log('— Cartões —');
const cid = C.cartoes.map((c) => c.id);
ok(new Set(cid).size === cid.length, `ids únicos (${cid.length} cartões)`);
ok(C.cartoes.some((c) => /contraditório/.test(c.frente)), 'cartão do exercício 9');

ok(C.cartoes.every((c) => c.m >= 1 && c.m <= 5), 'todos os cartões têm tema (mundo 1 a 5)');

console.log('— Lições (matéria antes das perguntas) —');
for (const m of C.mundos) {
  const L = C.licoes[m.n];
  ok(L && L.ideia && L.truque && L.seccoes.length && L.seccoes.every((s) => s.t && s.l.length && s.l.every((r) => r.length === 2)), `mundo ${m.n}: lição com secções e truque`);
}

console.log('— App (funciona sem internet) —');
const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const files = [...sw.split('const FILES = [')[1].split('];')[0].matchAll(/'([^']+)'/g)].map((m) => m[1]);
ok(files.filter((f) => f !== './').every((f) => existsSync(new URL('../' + f.slice(2), import.meta.url))), `sw.js: os ${files.length} ficheiros guardados existem`);
const man = JSON.parse(readFileSync(new URL('../manifest.webmanifest', import.meta.url), 'utf8'));
ok(man.icons.every((i) => existsSync(new URL('../' + i.src, import.meta.url))), 'manifest: os ícones existem');
ok(/rel="manifest"/.test(html) && /serviceWorker\.register\('sw\.js'\)/.test(html), 'index.html liga o manifest e regista o sw.js');

console.log(fails ? `\n${fails} problema(s) ✘` : '\nTudo certo ✔');
process.exit(fails ? 1 : 0);
