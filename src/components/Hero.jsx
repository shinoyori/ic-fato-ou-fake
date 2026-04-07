function HeroIllo() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
      {/* Document */}
      <rect x="30" y="20" width="90" height="120" rx="6" fill="#f0f4f8" stroke="#1a1a2e" strokeWidth="2.5"/>
      <rect x="44" y="38" width="62" height="7" rx="3" fill="#ff6b6b"/>
      <rect x="44" y="52" width="50" height="5" rx="2" fill="#e2e8f0"/>
      <rect x="44" y="63" width="56" height="5" rx="2" fill="#e2e8f0"/>
      <rect x="44" y="74" width="44" height="5" rx="2" fill="#e2e8f0"/>
      <rect x="44" y="90" width="62" height="5" rx="2" fill="#e2e8f0"/>
      <rect x="44" y="101" width="48" height="5" rx="2" fill="#e2e8f0"/>
      {/* Magnifier */}
      <circle cx="128" cy="112" r="32" fill="white" stroke="#1a1a2e" strokeWidth="2.5"/>
      <circle cx="128" cy="112" r="20" fill="#ffd93d" opacity=".4"/>
      <circle cx="128" cy="112" r="20" stroke="#1a1a2e" strokeWidth="2"/>
      <line x1="142" y1="128" x2="156" y2="145" stroke="#1a1a2e" strokeWidth="4" strokeLinecap="round"/>
      {/* Alert badge */}
      <circle cx="155" cy="40" r="18" fill="#ff6b6b" stroke="#1a1a2e" strokeWidth="2"/>
      <text x="155" y="47" textAnchor="middle" fill="white" fontWeight="900" fontSize="20" fontFamily="serif">!</text>
    </svg>
  );
}

export default function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="hero-chapter">Alfabetização Midiática</div>
        <h1>Detector de<br /><em>Fake News</em></h1>
        <p className="hero-sub">
          Analise textos com diferentes algoritmos de machine learning
          e entenda, passo a passo, <strong>por que</strong> cada modelo chega ao seu resultado.
        </p>
      </div>
      <HeroIllo />
    </div>
  );
}
