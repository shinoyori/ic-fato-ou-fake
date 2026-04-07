# 🔍 Detector de Fake News — ML Explicável

An educational fake news detector that lets you analyze text with four different ML algorithms and understand, step by step, why each model reaches its verdict.

## Features

- **4 ML algorithms**: Naive Bayes, Decision Tree, Random Forest, TF-IDF
- **Explainable AI**: each result shows the internal reasoning of the model
- **Educational panels**: learn how each algorithm works with illustrated cards
- Fully in-browser — no backend required

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- Vanilla CSS (design tokens via CSS custom properties)
- Google Fonts: Frank Ruhl Libre, IBM Plex Mono, Nunito

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Sticky stripe header
│   ├── Hero.jsx            # Hero section + illustration
│   ├── ExamplePills.jsx    # Clickable example text pills
│   ├── MethodSelector.jsx  # Algorithm selector cards
│   ├── ResultPanel.jsx     # Result dispatcher
│   ├── results/
│   │   ├── NBResult.jsx    # Naive Bayes result view
│   │   ├── DTResult.jsx    # Decision Tree result view
│   │   ├── RFResult.jsx    # Random Forest result view
│   │   └── TFResult.jsx    # TF-IDF result view
│   ├── EduSection.jsx      # Educational cards per algorithm
│   └── Verdict.jsx         # Shared verdict badge component
├── data/
│   ├── methods.js          # METHODS and MC config
│   ├── examples.js         # EXAMPLES sample texts
│   └── education.js        # EDU content cards
├── hooks/
│   └── useAnalyzer.js      # Analysis state + runner hook
├── utils/
│   └── models.js           # All 4 ML model implementations
├── styles/
│   └── global.css          # All CSS (design tokens + components)
├── App.jsx
└── main.jsx
```

## Notes

The ML models are **pedagogical simulations** — simplified heuristics that mimic how real classifiers behave. Real-world systems use large labeled corpora, semantic embeddings, and rigorous validation. Always consult multiple reliable sources before drawing conclusions about a news article.
