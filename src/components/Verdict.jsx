export default function Verdict({ label, prob }) {
  const pct    = Math.round(prob * 100);
  const isFake = label === "fake";
  const isReal = label === "real";
  const color  = isFake ? "#ff6b6b" : isReal ? "#059669" : "#d97706";
  const bg     = isFake ? "#fff5f5" : isReal ? "#f0fff8" : "#fffbeb";
  const text   = isFake ? "⚠ Possível Fake News" : isReal ? "✓ Provavelmente Real" : "? Inconclusivo";

  return (
    <div className="verdict-row" style={{ "--verdict-bg": bg, borderColor: color }}>
      <div className="verdict-badge" style={{ color, borderColor: color }}>{text}</div>
      <div className="verdict-prob">
        <div className="prob-num" style={{ color }}>{pct}%</div>
        <div className="prob-label">PROB. FAKE</div>
      </div>
      <div style={{ flex: 1, minWidth: 140 }}>
        <div style={{ height: 10, background: "#e2e8f0", borderRadius: 99, overflow: "hidden", border: "2px solid #1a1a2e" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width .8s ease" }} />
        </div>
        <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "'IBM Plex Mono',monospace", marginTop: 4 }}>
          {pct < 40 ? "baixo risco" : pct < 65 ? "risco moderado" : "alto risco"}
        </div>
      </div>
    </div>
  );
}
