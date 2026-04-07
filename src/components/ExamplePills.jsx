import { EXAMPLES } from "../data/examples";

export default function ExamplePills({ onSelect }) {
  return (
    <>
      <div className="section-label">
        <span>EXEMPLOS</span> clique para carregar
      </div>
      <div className="pill-row">
        {EXAMPLES.map((ex, i) => (
          <button key={i} className="pill" onClick={() => onSelect(ex.text)}>
            <span className="pill-dot" style={{ background: ex.dot }} />
            {ex.label}
          </button>
        ))}
      </div>
    </>
  );
}
