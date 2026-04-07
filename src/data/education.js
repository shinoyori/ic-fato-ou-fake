export const EDU = {
  naive_bayes: {
    emoji: "🎲",
    title: "Como funciona o Naive Bayes?",
    color: "#ff6b6b",
    cards: [
      { tag:"Teoria",    title:"Teorema de Bayes",         text:"Dado que vejo certas palavras, qual a prob. de ser fake? O modelo combina P(fake) com a verossimilhança de cada feature individualmente." },
      { tag:"Nome",      title:"Por que 'Naive'?",          text:"Assume que todas as features são independentes — raramente verdade, mas surpreendentemente eficaz! Simplifica muito o cálculo sem perder precisão." },
      { tag:"Vantagem",  title:"Rápido e interpretável",   text:"Poucos dados para treinar, resultados em milissegundos. Foi o primeiro algoritmo a filtrar spam de e-mail nos anos 90." },
      { tag:"Limitação", title:"Sem contexto",             text:"Não captura relações entre palavras. 'não é perigoso' e 'é perigoso' têm features parecidas, mas significados opostos." },
    ],
  },
  decision_tree: {
    emoji: "🌳",
    title: "Como funciona a Árvore de Decisão?",
    color: "#6bffb8",
    cards: [
      { tag:"Conceito",  title:"Perguntas binárias",       text:"A árvore faz perguntas sequenciais sobre o texto. Cada nó testa uma feature; as folhas dão o veredicto final." },
      { tag:"Treino",    title:"Ganho de informação",      text:"O algoritmo escolhe em cada nó a feature que melhor separa os exemplos, medindo redução de entropia (Ganho de Informação) ou Índice de Gini." },
      { tag:"Vantagem",  title:"100% rastreável",          text:"Você pode seguir o caminho exato — nó a nó — e entender por qual razão chegou ao resultado. É auditável e explicável." },
      { tag:"Limitação", title:"Overfitting",              text:"Árvores profundas tendem a memorizar os dados de treino. A solução é limitar a profundidade ou usar Random Forest." },
    ],
  },
  random_forest: {
    emoji: "🌲",
    title: "Como funciona o Random Forest?",
    color: "#6bceff",
    cards: [
      { tag:"Ensemble",  title:"Muitas árvores",           text:"Combina dezenas ou centenas de árvores de decisão, cada uma treinada em uma amostra aleatória diferente dos dados (Bootstrap Aggregating)." },
      { tag:"Aleatório", title:"Subconjunto de features",  text:"Cada árvore usa um subconjunto aleatório das features em cada nó — isso força diversidade. Árvores diversas reduzem mais o erro juntas." },
      { tag:"Votação",   title:"Resultado por maioria",    text:"Cada árvore emite um voto. O veredicto final é a classe com mais votos, cancelando erros individuais e tornando o modelo robusto." },
      { tag:"Insight",   title:"Feature Importance",       text:"Podemos medir quais features mais contribuíram para decisões em TODAS as árvores — criando um ranking de importância explicável." },
    ],
  },
  tfidf: {
    emoji: "📊",
    title: "Como funciona TF-IDF?",
    color: "#ffd93d",
    cards: [
      { tag:"TF",        title:"Term Frequency",           text:"Mede quantas vezes um termo aparece no documento analisado. Termos muito frequentes têm mais peso na representação daquele texto." },
      { tag:"IDF",       title:"Inverse Doc. Frequency",   text:"Penaliza termos que aparecem em muitos documentos (como 'o', 'de'). Palavras raras e específicas têm IDF maior — são mais informativas." },
      { tag:"TF×IDF",    title:"O produto final",          text:"Alto para termos frequentes nesse texto mas raros no corpus geral. Cria uma 'impressão digital' do texto no espaço de features." },
      { tag:"Aplicação", title:"Para fake news",           text:"'Inacreditável' tem alto IDF em corpus jornalístico, mas aparece muito em fake news — esse contraste é capturado pelo vetor TF-IDF." },
    ],
  },
};
