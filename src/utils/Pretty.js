const un = { K: "K", E: "E", C: "C" };

const bin = {
  conjunction: "∧",
  disjunction: "∨",
  implication: "→",
  equivalence: "↔",
};

/** Pretty-print a formula */
function pretty(formula, top = true) {
  switch (formula.type) {
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
      return binary(top, formula);
    case "negation":
      return `¬${pretty(formula.value, false)}`;
    case "E":
    case "C":
      return `${un[formula.type]} ${pretty(formula.value, false)}`;
    case "K":
      return knowledge(formula);
    case "announcement":
      return `[${pretty(formula.left, false)}] ${pretty(formula.right, false)}`;
    case "proposition":
    case "formula":
      return formula.value;
    case "top":
      return "⊤";
    case "bottom":
      return "⊥";
    case "hole":
      return "?";
    default:
      throw new Error(`Unknown formula type: ${formula.type}`);
  }
}

/** Pretty-print a binary formula */
function binary(top, formula) {
  const left = pretty(formula.left, false);
  const right = pretty(formula.right, false);
  const op = bin[formula.type];
  return top ? `${left} ${op} ${right}` : `(${left} ${op} ${right})`;
}

/** Pretty-print a knowledge formula */
function knowledge(formula) {
  const subformula = pretty(formula.value, false);
  return `${un[formula.type]}${formula.agent} ${subformula}`;
}

export default pretty;
