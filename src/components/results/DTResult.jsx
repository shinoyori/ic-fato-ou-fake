import Verdict from "../Verdict";

export default function DTResult({ r }) {
  const leafColor = r.label === "fake" ? "#ff6b6b" : r.label === "real" ? "#059669" : "#d97706";

  return (
    <div className="result-panel">
      <Verdict label={r.label} prob={r.prob} />

      <div className="section-label" style={{ marginBottom: 16 }}>
        <span>CAMINHO</span> percurso na árvore
      </div>

      <div className="tree-path">
        {r.path.map((step, i) => {
          const isLast = i === r.path.length - 1;
          const color  = step.leaf ? leafColor : "#6bceff";
          return (
            <div className="tree-step" key={i}>
              <div className="tree-step-connector">
                <div className="step-dot" style={{ borderColor: color, background: step.leaf ? color : "white" }} />
                {!isLast && <div className="step-line" />}
              </div>
              <div className="step-body">
                {step.leaf
                  ? <div className="step-leaf" style={{ color }}>{step.leaf}</div>
                  : <>
                      <span className="step-question">{step.q}</span>
                      {step.a && (
                        <span className="step-answer" style={{
                          background: step.a === "Sim" ? "#6bceff22" : "#ff6b6b22",
                          color:      step.a === "Sim" ? "#0284c7"   : "#dc2626",
                        }}>
                          {step.a}
                        </span>
                      )}
                    </>
                }
              </div>
            </div>
          );
        })}
      </div>

      <div className="formula-box">
        <div className="formula-label">como aprende</div>
        Ganho de Informação = H(pai) − Σ (|filho| / |pai|) × H(filho)<br />
        Cada nó divide o espaço escolhendo a feature com maior redução de entropia
      </div>
    </div>
  );
}
