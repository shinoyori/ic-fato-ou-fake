import Verdict from "../Verdict";

export default function RFResult({ r }) {
  return (
    <div className="result-panel">
      <Verdict label={r.label} prob={r.prob} />

      <div className="section-label" style={{ marginBottom: 16 }}>
        <span>FLORESTA</span> {r.fv} fake / {r.rv} real de {r.trees.length} árvores
      </div>

      <div className="forest-grid">
        {r.trees.map((t, i) => {
          const c = t.vote === "fake" ? "#ff6b6b" : "#059669";
          return (
            <div className="tree-card" key={i} style={{ borderColor: c + "66" }}>
              <div className="t-name">{t.name}</div>
              <div className="t-feat">features: {t.feat}</div>
              <div className="t-vote" style={{ color: c }}>
                {t.vote === "fake" ? "⚠ FAKE" : "✓ REAL"}&nbsp;
                <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace" }}>
                  ({Math.round(t.conf * 100)}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="vote-bar">
        <div className="vote-fake" style={{ width: `${(r.fv / r.trees.length) * 100}%` }} />
        <div className="vote-real" />
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"#6b7280", marginTop:6 }}>
        <span>{r.fv} votos fake</span>
        <span>{r.rv} votos real</span>
      </div>

      <div className="formula-box">
        <div className="formula-label">ensemble</div>
        Cada árvore treinada em amostra Bootstrap (bagging) + subconjunto aleatório de features<br />
        Resultado final = moda dos votos &nbsp;→&nbsp; reduz variância sem aumentar viés
      </div>
    </div>
  );
}
