/**
 * Pretty-print a formula
 * @param {Object} formula - The formula to pretty-print
 * @param {boolean} top - Whether the formula is at the top level
 * @returns {string} - The pretty-printed formula
 * @throws {Error} - If the formula type is unknown
 */
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
      return `${formula.type}${pretty(formula.value, false)}`;
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

/**
 * Pretty-print a binary formula
 * @param {boolean} top - Whether the formula is at the top level
 * @param {Object} formula - The formula to pretty-print
 * @returns {string} - The pretty-printed formula
 */
function binary(top, formula) {
  const bin = {
    conjunction: "∧",
    disjunction: "∨",
    implication: "→",
    equivalence: "↔",
  };
  const left = pretty(formula.left, false);
  const right = pretty(formula.right, false);
  const op = bin[formula.type];
  return top ? `${left} ${op} ${right}` : `(${left} ${op} ${right})`;
}

/**
 * Pretty-print a knowledge formula
 * @param {Object} formula - The formula to pretty-print
 * @returns {string} - The pretty-printed formula
 */
function knowledge(formula) {
  const subformula = pretty(formula.value, false);
  return `${formula.type}${formula.agent} ${subformula}`;
}

export default pretty;
