import { EDU } from "../data/education";
import { MC } from "../data/methods";

export default function EduSection({ method }) {
  const e  = EDU[method];
  const mc = MC[method];
  if (!e) return null;

  return (
    <div className="edu-section">
      <hr className="divider bold" />
      <div className="edu-header">
        <div className="edu-icon" style={{ background: mc.bg, borderColor: mc.accent }}>
          {e.emoji}
        </div>
        <div>
          <div className="section-label">
            <span style={{ background: mc.tag }}>APRENDA</span>
          </div>
          <h3>{e.title}</h3>
        </div>
      </div>
      <div className="edu-grid">
        {e.cards.map((c, i) => (
          <div className="edu-card" key={i}>
            <span className="ec-tag" style={{ background: mc.tag }}>{c.tag}</span>
            <div className="ec-title">{c.title}</div>
            <div className="ec-text">{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
