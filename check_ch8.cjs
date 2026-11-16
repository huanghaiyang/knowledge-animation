const fs = require('fs')
const ts = require('typescript')
const path = require('path')

function load(file) {
  const src = fs.readFileSync(file, 'utf8')
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText
  const mod = { exports: {} }
  new Function('exports', 'require', 'module', out)(mod.exports, require, mod)
  return mod.exports.ch8Sections
}

const orig = load(path.join(process.env.TEMP, 'ch8.orig.ts'))
const cur = load('d:/sgames/knowledge-animation/src/data/book/ch8.ts')

let errors = []
const chinese = (s) => (s.match(/[\u4e00-\u9fff]/g) || []).length

if (orig.length !== cur.length) errors.push(`section count ${orig.length} -> ${cur.length}`)

const rows = []
for (let i = 0; i < orig.length; i++) {
  const a = orig[i], b = cur[i]
  for (const k of ['id', 'no', 'title', 'pages', 'tag']) {
    if (a[k] !== b[k]) errors.push(`${a.id}: ${k} changed`)
  }
  if (a.beats.length !== b.beats.length) errors.push(`${a.id}: beats ${a.beats.length} -> ${b.beats.length}`)
  if (a.keyIdeas.length !== b.keyIdeas.length) errors.push(`${a.id}: keyIdeas ${a.keyIdeas.length} -> ${b.keyIdeas.length}`)
  if (a.takeaways.length !== b.takeaways.length) errors.push(`${a.id}: takeaways ${a.takeaways.length} -> ${b.takeaways.length}`)

  let oldChars = 0, newChars = 0, oldP = 0, newP = 0, minP = 9999, maxP = 0
  let oldF = 0, newF = 0
  for (let j = 0; j < a.beats.length; j++) {
    const ba = a.beats[j], bb = b.beats[j]
    if (ba.paragraphs.length !== bb.paragraphs.length) {
      errors.push(`${a.id} beat${j + 1}: paragraphs ${ba.paragraphs.length} -> ${bb.paragraphs.length}`)
      continue
    }
    const fa = ba.formulas || [], fb = bb.formulas || []
    oldF += fa.length; newF += fb.length
    if (fa.length !== fb.length) errors.push(`${a.id} beat${j + 1}: formulas ${fa.length} -> ${fb.length}`)
    for (let k = 0; k < Math.min(fa.length, fb.length); k++) {
      if (fa[k].math !== fb[k].math) errors.push(`${a.id} beat${j + 1} formula${k + 1}: math changed`)
    }
    for (let k = 0; k < ba.paragraphs.length; k++) {
      const ca = chinese(ba.paragraphs[k]), cb = chinese(bb.paragraphs[k])
      oldChars += ca; newChars += cb; oldP++; newP++
      minP = Math.min(minP, cb); maxP = Math.max(maxP, cb)
      if (cb < 180 || cb > 330) errors.push(`${a.id} beat${j + 1} p${k + 1}: ${cb} chars`)
    }
  }
  const abs = chinese(b.abstract)
  if (abs < 150 || abs > 225) errors.push(`${a.id}: abstract ${abs} chars`)
  b.keyIdeas.forEach((s, k) => {
    const c = chinese(s)
    if (c < 50 || c > 82) errors.push(`${a.id} keyIdea${k + 1}: ${c} chars`)
  })
  b.takeaways.forEach((s, k) => {
    const c = chinese(s)
    if (c < 40 || c > 82) errors.push(`${a.id} takeaway${k + 1}: ${c} chars`)
  })
  rows.push({
    id: a.id,
    oldP, newP, oldF, newF,
    oldChars, newChars,
    abs: abs,
    avg: Math.round(newChars / newP),
    minP, maxP
  })
}

console.log('--- per-section (chinese chars in paragraphs) ---')
for (const r of rows) {
  console.log(`${r.id}  p:${r.oldP}->${r.newP}  f:${r.oldF}->${r.newF}  chars:${r.oldChars}->${r.newChars}  avg:${r.avg}  range:${r.minP}-${r.maxP}  abstract:${r.abs}`)
}

const text = fs.readFileSync('d:/sgames/knowledge-animation/src/data/book/ch8.ts', 'utf8')
const banned = [
  [/不是[^。\n]{0,40}而是/g, '不是…而是…'],
  [/与其说/g, '与其说'],
  [/不如说/g, '不如说'],
  [/真正的/g, '真正的'],
  [/这正是/g, '这正是'],
  [/恰恰/g, '恰恰'],
  [/恰好/g, '恰好'],
  [/值得注意的是/g, '值得注意的是'],
  [/换句话说/g, '换句话说'],
  [/进一步说/g, '进一步说'],
  [/深刻/g, '深刻'],
  [/标志着/g, '标志着'],
  [/构成了/g, '构成了'],
  [/两件事/g, '两件事'],
  [/三件事/g, '三件事'],
  [/一方面/g, '一方面'],
  [/另一方面/g, '另一方面'],
  [/赋能/g, '赋能'],
  [/维度/g, '维度'],
  [/范式/g, '范式'],
  [/底层逻辑/g, '底层逻辑'],
  [/——/g, '破折号']
]
console.log('--- banned phrase hits ---')
let hits = 0
for (const [re, name] of banned) {
  const m = text.match(re)
  if (m) { hits += m.length; console.log(`${name}: ${m.length}`) }
}
if (!hits) console.log('none')
for (const w of ['首先', '其次', '最后']) {
  const m = text.match(new RegExp(w, 'g'))
  if (m) console.log(`${w}: ${m.length}`)
}

console.log('--- structure errors ---')
if (!errors.length) console.log('none')
else errors.forEach((e) => console.log(e))
