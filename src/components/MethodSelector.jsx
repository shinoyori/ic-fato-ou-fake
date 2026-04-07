import { useState } from "react";
import { METHODS, MC } from "../data/methods";

const ADVANCED_METHODS = [
  { id:"bert",     tag:"BERT",   name:"BERT",              desc:"Transformers bidirecionais" },
  { id:"exFake",  tag:"exFake",name:"exFake",           desc:"..." },
  { id:"gpt",      tag:"GPT",    name:"GPT fine-tuned",    desc:"..." },
  { id:"aaa",  tag:"aaa",name:"aaa",           desc:"..." },
];

function ComingSoonTooltip({ visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "absolute",
      bottom: "calc(100% + 10px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#1a1a2e",
      color: "white",
      fontSize: 11,
      fontFamily: "'IBM Plex Mono', monospace",
      padding: "6px 12px",
      borderRadius: 4,
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 10,
    }}>
      🚧 em breve
      <div style={{
        position: "absolute",
        top: "100%", left: "50%",
        transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop: "5px solid #1a1a2e",
      }}/>
    </div>
  );
}

export default function MethodSelector({ selected, onChange }) {
  const [tooltip, setTooltip] = useState(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="section-label" style={{ marginBottom: 12 }}>
        <span>MÉTODO</span> escolha o algoritmo
      </div>
      <div className="method-grid" style={{ marginBottom: 16 }}>
        {METHODS.map(m => (
          <div
            key={m.id}
            className={`method-card${selected === m.id ? " active" : ""}`}
            style={{ "--accent-color": MC[m.id].accent }}
            onClick={() => onChange(m.id)}
          >
            <div className="m-tag">[{m.tag}]</div>
            <div className="m-name">{m.name}</div>
            <div className="m-desc">{m.desc}</div>
          </div>
        ))}
      </div>

      
      


      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 13px",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: ".08em",
            background: "white",
            border: "1.5px dashed #6b7280",
            borderRadius: 4,
            color: "#6b7280",
            cursor: "pointer",
            transition: "all .15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a1a2e"; e.currentTarget.style.color = "#1a1a2e"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#6b7280"; e.currentTarget.style.color = "#6b7280"; }}
        >
          <span style={{ fontSize: 13 }}>{expanded ? "▾" : "▸"}</span>
          modelos avançados (LLM / Transformers)
        </button>

        {expanded && ADVANCED_METHODS.map(m => (
          <div
            key={m.id}
            style={{ position: "relative" }}
            onMouseEnter={() => setTooltip(m.id)}
            onMouseLeave={() => setTooltip(null)}
          >
            <ComingSoonTooltip visible={tooltip === m.id} />
            <button
              disabled
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                background: "#f8f8f8",
                border: "1.5px solid #e2e8f0",
                borderRadius: 4,
                color: "#9ca3af",
                cursor: "not-allowed",
                opacity: .75,
              }}
            >
              <span style={{
                background: "#e2e8f0",
                color: "#6b7280",
                fontSize: 9,
                padding: "1px 5px",
                borderRadius: 2,
                letterSpacing: ".06em",
              }}>
                {m.tag}
              </span>
              {m.name}
              <span style={{ fontSize: 9, color: "#c084fc", letterSpacing: ".05em" }}>PRO</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
