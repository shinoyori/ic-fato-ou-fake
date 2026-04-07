import Verdict from "../Verdict";

export default function TFResult({ r }) {
  const maxS = r.terms.length ? Math.max(...r.terms.map(t => Math.abs(t.score))) : 1;

  return (
    <div className="result-panel">
      <Verdict label={r.label} prob={r.prob} />

      <div className="section-label" style={{ marginBottom: 14 }}>
        <span>TERMOS</span> tf-idf score por palavra
      </div>

      {r.terms.length === 0 && (
        <p style={{ color:"#6b7280", fontSize:14 }}>
          Nenhum termo marcante detectado — texto muito neutro ou muito curto.
        </p>
      )}

      <div className="tfidf-list">
        {r.terms.map((t, i) => {
          const color = t.type === "fake" ? "#ff6b6b" : "#059669";
          const pct   = (Math.abs(t.score) / maxS) * 100;
          return (
            <div className="tfidf-item" key={i}>
              <div className="ti-header">
                <span className="tfidf-term" style={{ color }}>"{t.term}"</span>
                <span className="tfidf-score">{t.score > 0 ? "+" : ""}{t.score.toFixed(1)}</span>
              </div>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${pct}%`, background: color }} />
              </div>
              <div className="tfidf-sub">
                → associado a {t.type === "fake" ? "desinformação" : "jornalismo verificado"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="formula-box">
        <div className="formula-label">fórmula</div>
        TF-IDF(t, d) = TF(t,d) × log( N / df(t) )<br />
        Penaliza termos ubíquos; amplifica termos raros e informativos
      </div>
    </div>
  );
}
