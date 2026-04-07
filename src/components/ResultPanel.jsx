import { METHODS, MC } from "../data/methods";
import NBResult from "./results/NBResult";
import DTResult from "./results/DTResult";
import RFResult from "./results/RFResult";
import TFResult from "./results/TFResult";

const RESULT_COMPONENTS = {
  naive_bayes:   NBResult,
  decision_tree: DTResult,
  random_forest: RFResult,
  tfidf:         TFResult,
};

export default function ResultPanel({ result }) {
  if (!result) return null;

  const ResultComponent = RESULT_COMPONENTS[result.method];
  const methodLabel     = METHODS.find(m => m.id === result.method)?.name;

  return (
    <>
      <hr className="divider bold" />
      <div className="section-label" style={{ marginBottom: 20 }}>
        <span style={{ background: MC[result.method].tag }}>RESULTADO</span>
        {methodLabel}
      </div>
      <ResultComponent r={result} />
    </>
  );
}
