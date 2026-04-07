// Method display config (colors, tags, backgrounds)
export const MC = {
  naive_bayes:  { accent:"#ff6b6b", bg:"#fff5f5", tag:"#dc2626" },
  decision_tree:{ accent:"#6bffb8", bg:"#f0fff8", tag:"#059669" },
  random_forest:{ accent:"#6bceff", bg:"#f0f9ff", tag:"#0284c7" },
  tfidf:        { accent:"#ffd93d", bg:"#fffbeb", tag:"#d97706" },
};

// Method selector cards
export const METHODS = [
  { id:"naive_bayes",   name:"Naive Bayes",        tag:"NB", desc:"Probabilidade por features" },
  { id:"decision_tree", name:"Árvore de Decisão",  tag:"DT", desc:"Perguntas binárias em sequência" },
  { id:"random_forest", name:"Random Forest",      tag:"RF", desc:"Votação de múltiplas árvores" },
  { id:"tfidf",         name:"TF-IDF",             tag:"TF", desc:"Peso estatístico de termos" },
];
