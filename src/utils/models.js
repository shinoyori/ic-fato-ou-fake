// ─── Feature extraction ──────────────────────────────────────────────────────

const SENSATIONAL_WORDS = [
  "inacreditável","chocante","urgente","exclusivo","bombástico","revelação",
  "segredo","conspiração","eles não","a mídia","fraude","roubado","comprovado",
  "cura","milagre","alerta","perigo","colapso","esconde","censura",
];

const HEDGE_WORDS = [
  "segundo","de acordo","fontes","relatório","estudo","pesquisa","dados",
  "evidências","cientistas","especialistas","porém","contudo",
];

function extractFeatures(text) {
  const lower     = text.toLowerCase();
  const words     = lower.split(/\s+/);
  const capsRatio = (text.match(/[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ]/g) || []).length / Math.max(text.length, 1);
  const excl      = (text.match(/!/g) || []).length;
  const sensCount = words.filter(w => SENSATIONAL_WORDS.some(s => w.includes(s))).length;
  const hedgeCount= words.filter(w => HEDGE_WORDS.some(s => w.includes(s))).length;
  const wordCount = words.length;
  const avgLen    = words.reduce((a, w) => a + w.length, 0) / Math.max(wordCount, 1);
  return { lower, words, capsRatio, excl, sensCount, hedgeCount, wordCount, avgLen };
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

// ─── Naive Bayes ─────────────────────────────────────────────────────────────

export function runNaiveBayes(text) {
  const f  = extractFeatures(text);
  const lo = f.sensCount * .8 + f.excl * .5 + f.capsRatio * 15
           - f.hedgeCount * .6 - (f.avgLen > 6 ? .5 : 0) - (f.wordCount > 80 ? .3 : 0);
  const prob = Math.min(.97, Math.max(.05, sigmoid(lo - .5)));

  return {
    prob,
    label: prob > .5 ? "fake" : "real",
    method: "naive_bayes",
    features: [
      { name:"Palavras sensacionalistas", value: f.sensCount,                        max: 8,  dir:"fake", weight:.8 },
      { name:"Exclamações (!)",           value: f.excl,                             max: 5,  dir:"fake", weight:.5 },
      { name:"MAIÚSCULAS excessivas (%)", value: +(f.capsRatio * 100).toFixed(1),    max: 30, dir:"fake", weight:.6 },
      { name:"Linguagem de fonte/hedge",  value: f.hedgeCount,                       max: 6,  dir:"real", weight:.6 },
      { name:"Comprimento médio (chars)", value: +f.avgLen.toFixed(1),               max: 10, dir:"real", weight:.3 },
    ],
  };
}

// ─── Decision Tree ───────────────────────────────────────────────────────────

export function runDecisionTree(text) {
  const f = extractFeatures(text);
  const path = [];
  let result;

  if (f.sensCount >= 3) {
    path.push({ q:"Palavras sensacionalistas ≥ 3?", a:"Sim" });
    if (f.excl >= 2) {
      path.push({ q:"Exclamações ≥ 2?", a:"Sim" });
      result = { label:"fake", prob:.91 };
      path.push({ leaf:"⚠ FAKE NEWS", label:"fake" });
    } else if (f.hedgeCount >= 2) {
      path.push({ q:"Exclamações ≥ 2?", a:"Não" }, { q:"Linguagem de fonte ≥ 2?", a:"Sim" });
      result = { label:"real", prob:.38 };
      path.push({ leaf:"✓ REAL", label:"real" });
    } else {
      path.push({ q:"Exclamações ≥ 2?", a:"Não" }, { q:"Linguagem de fonte ≥ 2?", a:"Não" });
      result = { label:"fake", prob:.72 };
      path.push({ leaf:"⚠ FAKE NEWS", label:"fake" });
    }
  } else {
    path.push({ q:"Palavras sensacionalistas ≥ 3?", a:"Não" });
    if (f.capsRatio > .1) {
      path.push({ q:"MAIÚSCULAS > 10%?", a:"Sim" });
      result = { label:"fake", prob:.68 };
      path.push({ leaf:"⚠ FAKE NEWS", label:"fake" });
    } else if (f.hedgeCount >= 1) {
      path.push({ q:"MAIÚSCULAS > 10%?", a:"Não" }, { q:"Tem linguagem de fonte?", a:"Sim" });
      result = { label:"real", prob:.22 };
      path.push({ leaf:"✓ REAL", label:"real" });
    } else {
      path.push({ q:"MAIÚSCULAS > 10%?", a:"Não" }, { q:"Tem linguagem de fonte?", a:"Não" });
      result = { label:"fake", prob:.55 };
      path.push({ leaf:"? INCERTO", label:"uncertain" });
    }
  }

  return { ...result, path, method:"decision_tree" };
}

// ─── Random Forest ───────────────────────────────────────────────────────────

export function runRandomForest(text) {
  const f = extractFeatures(text);
  const trees = [
    { name:"Árvore #1", feat:"léxico",        vote: f.sensCount>2 && f.hedgeCount<2              ? "fake":"real", conf:.82 },
    { name:"Árvore #2", feat:"pontuação",     vote: f.excl>1 || f.capsRatio>.12                  ? "fake":"real", conf:.74 },
    { name:"Árvore #3", feat:"estrutura",     vote: f.wordCount<20 && f.sensCount>1               ? "fake":"real", conf:.68 },
    { name:"Árvore #4", feat:"combinado",     vote: (f.sensCount*2 + f.excl - f.hedgeCount*3)>2  ? "fake":"real", conf:.79 },
    { name:"Árvore #5", feat:"tom",           vote: f.capsRatio>.08 && f.hedgeCount<1             ? "fake":"real", conf:.71 },
    { name:"Árvore #6", feat:"léxico+struct", vote: f.sensCount>1 && f.capsRatio>.06              ? "fake":"real", conf:.76 },
  ];
  const fv   = trees.filter(t => t.vote === "fake").length;
  const prob = fv / trees.length;
  return { prob, label: prob > .5 ? "fake" : "real", trees, fv, rv: trees.length - fv, method:"random_forest" };
}

// ─── TF-IDF ──────────────────────────────────────────────────────────────────

const FAKE_TERMS = [
  { term:"inacreditável", score: 3.2 },
  { term:"chocante",      score: 2.8 },
  { term:"urgente",       score: 2.5 },
  { term:"conspiração",   score: 3.5 },
  { term:"censura",       score: 3.8 },
  { term:"exclusivo",     score: 2.1 },
  { term:"milagre",       score: 2.9 },
  { term:"comprovado",    score: 1.9 },
];

const REAL_TERMS = [
  { term:"segundo",       score:-2.3 },
  { term:"estudo",        score:-2.7 },
  { term:"pesquisa",      score:-3.1 },
  { term:"dados",         score:-2.9 },
  { term:"especialistas", score:-2.5 },
  { term:"relatório",     score:-2.6 },
];

export function runTFIDF(text) {
  const f = extractFeatures(text);
  const found = [
    ...FAKE_TERMS.filter(t => f.lower.includes(t.term)).map(t => ({ ...t, type:"fake" })),
    ...REAL_TERMS.filter(t => f.lower.includes(t.term)).map(t => ({ ...t, type:"real" })),
  ]
    .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
    .slice(0, 8);

  const raw  = found.reduce((a, t) => a + t.score, 0) + f.sensCount * .5 - f.hedgeCount * .7;
  const prob = Math.min(.96, Math.max(.04, sigmoid(raw * .4 - .3)));
  return { prob, label: prob > .5 ? "fake" : "real", terms: found, method:"tfidf" };
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────

export function runModel(method, text) {
  switch (method) {
    case "naive_bayes":   return runNaiveBayes(text);
    case "decision_tree": return runDecisionTree(text);
    case "random_forest": return runRandomForest(text);
    case "tfidf":         return runTFIDF(text);
    default: throw new Error(`Unknown method: ${method}`);
  }
}
