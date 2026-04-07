import Verdict from "../Verdict";

export default function NBResult({ r }) {
  return (
    <div className="result-panel">
      <Verdict label={r.label} prob={r.prob} />

      <div className="section-label" style={{ marginBottom: 14 }}>
        <span>FEATURES</span> análise por característica
      </div>

      <div className="feature-list">
        {r.features.map((f, i) => {
          const color = f.dir === "fake" ? "#ff6b6b" : "#059669";
          const pct   = Math.min(100, (f.value / f.max) * 100);
          return (
            <div className="feature-item" key={i}>
              <div className="f-header">
                <span className="f-name">{f.name}</span>
                <span className="f-val">{f.value} · peso {f.weight}</span>
              </div>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${pct}%`, background: color }} />
              </div>
              <div className="f-sub">
                → {f.dir === "fake" ? "indica desinformação" : "indica fonte confiável"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="formula-box">
        <div className="formula-label">fórmula central</div>
        P(Fake | features) ∝ P(features | Fake) × P(Fake)<br />
        log-odds = Σ wᵢ·xᵢ &nbsp;→&nbsp; sigmoid(x) &nbsp;→&nbsp; probabilidade
      </div>
    </div>
  );
}
