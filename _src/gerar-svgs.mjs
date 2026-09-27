// Gera os visuais SVG do README (animados, com as fontes da marca embutidas).
// Uso: node _src/gerar-svgs.mjs   (na pasta github-perfil-aethus)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, '..', 'site atualizado');
const OUT = join(ROOT, 'assets');
mkdirSync(OUT, { recursive: true });

const font = (f) => readFileSync(join(SITE, 'assets/fonts', f)).toString('base64');
const FONTS = {
  display: `@font-face{font-family:'SG';src:url(data:font/woff2;base64,${font('SpaceGrotesk.woff2')}) format('woff2');font-weight:300 700}`,
  mono: `@font-face{font-family:'JB';src:url(data:font/woff2;base64,${font('JetBrainsMono.woff2')}) format('woff2');font-weight:400 800}`,
};

// Logo oficial (paths vetoriais do site) → reaproveitado como <svg> aninhado
const logoSvg = readFileSync(join(SITE, 'assets/img/logo.svg'), 'utf8');
const logoInner = logoSvg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const markSvg = readFileSync(join(SITE, 'assets/img/mark.svg'), 'utf8');
const markInner = markSvg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const C = { black: '#01020B', navy: '#04081D', surface: '#080E29', blue: '#1D64FF', light: '#489DFF', ice: '#E0EFFF', muted: '#8A97C4', line: 'rgba(72,157,255,.14)', ok: '#3EE08A' };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const reduced = '@media (prefers-reduced-motion:reduce){*{animation:none!important}}';

/* ------------------------------------------------------------ cabeçalho */
function header() {
  const W = 1200, H = 440;
  // rede neural determinística (sem aleatoriedade, para o arquivo não mudar a cada build)
  const pts = [[70, 90], [170, 60], [140, 190], [260, 130], [90, 330], [230, 300], [330, 380], [880, 70], [990, 120], [1110, 60], [960, 250], [1080, 220], [1140, 340], [900, 370], [1020, 390]];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [4, 5], [5, 3], [5, 6], [7, 8], [8, 9], [8, 10], [10, 11], [11, 9], [11, 12], [10, 13], [13, 14], [12, 14]];
  const lines = edges.map(([a, b], i) => `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" class="edge" style="animation-delay:${(i * 0.37) % 4}s"/>`).join('');
  const nodes = pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? 2.6 : 3.4}" class="node" style="animation-delay:${(i * 0.53) % 3.2}s"/>`).join('');
  const term = '➜ aethus init --agent=autônomo   ✓ operação autônoma ativa';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="AETHUS IA — A inteligência que conecta, organiza e eleva / The intelligence that connects, organizes and elevates">
<defs>
<style>${FONTS.display}${FONTS.mono}
.edge{stroke:${C.light};stroke-width:1;opacity:.12;animation:edge 4s ease-in-out infinite}
.node{fill:${C.light};opacity:.35;animation:node 3.2s ease-in-out infinite}
@keyframes edge{50%{opacity:.45}}
@keyframes node{50%{opacity:1}}
.eyebrow{font:500 13px 'JB',ui-monospace,monospace;letter-spacing:.28em;fill:${C.light}}
.tag{font:600 30px 'SG',system-ui,sans-serif;letter-spacing:-.02em;fill:${C.ice}}
.tag b{fill:${C.light}}
.en{font:400 13px 'JB',ui-monospace,monospace;letter-spacing:.2em;fill:${C.muted}}
.term{font:400 14px 'JB',ui-monospace,monospace;fill:${C.muted}}
.p{fill:${C.light}}.ok{fill:${C.ok}}
.cursor{fill:${C.light};animation:blink 1s step-end infinite}
@keyframes blink{50%{opacity:0}}
.glow{animation:glow 6s ease-in-out infinite}
@keyframes glow{50%{opacity:.55}}
${reduced}
</style>
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${C.light}" stroke-opacity=".06"/></pattern>
<radialGradient id="halo" cx="50%" cy="46%" r="46%"><stop offset="0" stop-color="${C.blue}" stop-opacity=".38"/><stop offset="1" stop-color="${C.blue}" stop-opacity="0"/></radialGradient>
<linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="${C.blue}"/><stop offset="1" stop-color="${C.light}"/></linearGradient>
<clipPath id="card"><rect width="${W}" height="${H}" rx="18"/></clipPath>
<clipPath id="typing"><rect x="0" y="0" height="40" width="0"><animate attributeName="width" values="0;620;620;0" keyTimes="0;.45;.9;1" dur="9s" repeatCount="indefinite"/></rect></clipPath>
</defs>
<g clip-path="url(#card)">
<rect width="${W}" height="${H}" fill="${C.black}"/>
<rect width="${W}" height="${H}" fill="url(#grid)"/>
<ellipse cx="600" cy="190" rx="560" ry="230" fill="url(#halo)" class="glow"/>
${lines}${nodes}
<text x="600" y="62" text-anchor="middle" class="eyebrow">// CONSULTORIA &amp; SOLUÇÕES COM IA · AI CONSULTING &amp; SOLUTIONS</text>
<svg x="330" y="92" width="540" height="192" viewBox="0 0 709 252">${logoInner}</svg>
<text x="600" y="316" text-anchor="middle" class="tag">A inteligência que <tspan fill="${C.light}">conecta</tspan>, <tspan fill="${C.light}">organiza</tspan> e <tspan fill="${C.light}">eleva</tspan>.</text>
<text x="600" y="346" text-anchor="middle" class="en">THE INTELLIGENCE THAT CONNECTS, ORGANIZES AND ELEVATES</text>
<g transform="translate(290 372)">
  <rect x="0" y="0" width="620" height="40" rx="8" fill="${C.navy}" stroke="${C.line}"/>
  <g clip-path="url(#typing)" transform="translate(18 0)"><text x="0" y="26" class="term"><tspan class="p">➜ aethus</tspan> init --agent=autônomo   <tspan class="ok">✓ operação autônoma ativa</tspan></text></g>
  <rect x="598" y="12" width="8" height="16" class="cursor"/>
</g>
<rect x="0" y="${H - 4}" width="${W}" height="4" fill="url(#bar)"/>
</g>
</svg>
`;
}

/* -------------------------------------------------------------- processo */
const PROCESSO = {
  pt: { title: '// COMO TRABALHAMOS', steps: [['DIAGNÓSTICO', 'MAPEAR GARGALOS'], ['ARQUITETURA', 'DESENHAR O SISTEMA'], ['AUTOMAÇÃO', 'IMPLANTAR E TESTAR'], ['ESCALA', 'MONITORAR E EXPANDIR']] },
  en: { title: '// HOW WE WORK', steps: [['DIAGNOSIS', 'MAP BOTTLENECKS'], ['ARCHITECTURE', 'DESIGN THE SYSTEM'], ['AUTOMATION', 'DEPLOY & TEST'], ['SCALE', 'MONITOR & EXPAND']] },
};
function processo(lang) {
  const W = 1200, H = 250;
  const { title, steps: labels } = PROCESSO[lang];
  const steps = labels.map(([a, b], i) => [`0${i + 1}`, a, b]);
  const xs = [150, 450, 750, 1050], y = 104;
  const nodes = steps.map(([n, pt, en], i) => `
<g class="step" style="animation-delay:${i * 1}s">
  <circle cx="${xs[i]}" cy="${y}" r="34" fill="${C.navy}" stroke="${C.light}" stroke-width="1.5" class="ring"/>
  <circle cx="${xs[i]}" cy="${y}" r="34" fill="none" stroke="${C.light}" class="wave" style="animation-delay:${i * 1}s"/>
  <text x="${xs[i]}" y="${y + 6}" text-anchor="middle" class="num">${n}</text>
  <text x="${xs[i]}" y="${y + 74}" text-anchor="middle" class="pt">${esc(pt)}</text>
  <text x="${xs[i]}" y="${y + 98}" text-anchor="middle" class="en">${esc(en)}</text>
</g>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${labels.map((l) => l[0]).join(' → ')}">
<defs>
<style>${FONTS.display}${FONTS.mono}
.num{font:500 16px 'JB',ui-monospace,monospace;fill:${C.light}}
.pt{font:600 20px 'SG',system-ui,sans-serif;letter-spacing:.04em;fill:${C.ice}}
.en{font:400 12px 'JB',ui-monospace,monospace;letter-spacing:.22em;fill:${C.muted}}
.eyebrow{font:500 12px 'JB',ui-monospace,monospace;letter-spacing:.28em;fill:${C.light}}
.step{animation:lit 4s ease-in-out infinite}
@keyframes lit{0%,22%{opacity:1}38%,100%{opacity:.5}}
.wave{opacity:0;transform-box:fill-box;transform-origin:center;animation:wave 4s ease-out infinite}
@keyframes wave{0%{opacity:.7;transform:scale(1)}25%{opacity:0;transform:scale(1.8)}100%{opacity:0}}
${reduced}
</style>
<linearGradient id="track" x1="0" x2="1"><stop offset="0" stop-color="${C.blue}"/><stop offset="1" stop-color="${C.light}"/></linearGradient>
<radialGradient id="dot"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="${C.light}"/><stop offset="1" stop-color="${C.light}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" rx="18" fill="${C.black}" stroke="${C.line}"/>
<text x="40" y="40" class="eyebrow">${title}</text>
<line x1="${xs[0]}" y1="${y}" x2="${xs[3]}" y2="${y}" stroke="${C.line}" stroke-width="2"/>
<line x1="${xs[0]}" y1="${y}" x2="${xs[3]}" y2="${y}" stroke="url(#track)" stroke-width="2" stroke-dasharray="900" stroke-dashoffset="900">
  <animate attributeName="stroke-dashoffset" values="900;0;0" keyTimes="0;.75;1" dur="4s" repeatCount="indefinite"/>
</line>
<circle r="9" fill="url(#dot)"><animateMotion path="M${xs[0]} ${y}H${xs[3]}" dur="4s" keyPoints="0;1;1" keyTimes="0;.75;1" calcMode="linear" repeatCount="indefinite"/></circle>
${nodes}
</svg>
`;
}

/* --------------------------------------------------------------- botões */
function button(label, { w, primary = false, arrow = false }) {
  const H = 46;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${H}" viewBox="0 0 ${w} ${H}" role="img" aria-label="${esc(label)}">
<defs><style>${FONTS.mono}.t{font:600 13px 'JB',ui-monospace,monospace;letter-spacing:.12em;fill:${primary ? '#fff' : C.ice}}</style></defs>
<rect x=".5" y=".5" width="${w - 1}" height="${H - 1}" rx="6" fill="${primary ? C.blue : C.black}" stroke="${primary ? C.blue : 'rgba(72,157,255,.55)'}"/>
<text x="${w / 2}" y="28.5" text-anchor="middle" class="t">${esc(label)}${arrow ? '  →' : ''}</text>
</svg>
`;
}

/* ---------------------------------------------------------------- rodapé */
function rodape() {
  const W = 1200, H = 170;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Conecta · Organiza · Eleva / Connect · Organize · Elevate">
<defs>
<style>${FONTS.display}${FONTS.mono}
.big{font:700 40px 'SG',system-ui,sans-serif;letter-spacing:.02em}
.en{font:400 13px 'JB',ui-monospace,monospace;letter-spacing:.34em;fill:${C.muted}}
${reduced}
</style>
<linearGradient id="shine" x1="0" x2="1" gradientUnits="objectBoundingBox">
  <stop offset="0" stop-color="${C.light}"/><stop offset=".5" stop-color="${C.ice}"/><stop offset="1" stop-color="${C.light}"/>
  <animateTransform attributeName="gradientTransform" type="translate" values="-1 0;1 0" dur="6s" repeatCount="indefinite"/>
</linearGradient>
<linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="${C.blue}" stop-opacity="0"/><stop offset=".5" stop-color="${C.light}"/><stop offset="1" stop-color="${C.blue}" stop-opacity="0"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" rx="18" fill="${C.black}" stroke="${C.line}"/>
<svg x="572" y="22" width="56" height="54" viewBox="361 21 220 211">${markInner}</svg>
<text x="600" y="122" text-anchor="middle" class="big" fill="url(#shine)">CONECTA · ORGANIZA · ELEVA</text>
<text x="600" y="150" text-anchor="middle" class="en">CONNECT · ORGANIZE · ELEVATE</text>
<rect x="300" y="${H - 3}" width="600" height="3" fill="url(#bar)"/>
</svg>
`;
}

const files = {
  'header.svg': header(),
  'processo-pt.svg': processo('pt'),
  'processo-en.svg': processo('en'),
  'rodape.svg': rodape(),
  'btn-pt.svg': button('PORTUGUÊS', { w: 170 }),
  'btn-en.svg': button('ENGLISH', { w: 150 }),
  'btn-site.svg': button('AETHUS.TECH', { w: 170 }),
  'cta-pt.svg': button('AGENDAR DIAGNÓSTICO GRATUITO', { w: 340, primary: true, arrow: true }),
  'cta-en.svg': button('BOOK A FREE ASSESSMENT', { w: 290, primary: true, arrow: true }),
};
for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), svg);
  console.log(`✓ assets/${name} (${Math.round(svg.length / 1024)} KB)`);
}
