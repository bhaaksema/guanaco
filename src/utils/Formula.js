import equal from "fast-deep-equal";

const bin = [
  "conjunction",
  "disjunction",
  "implication",
  "equivalence",
  "announcement",
];
const un = ["negation", "K", "E", "C"];
const atom = ["proposition", "variable", "top", "bottom", "hole"];

/**
 * Checks if a formula corresponds to a given reference formula.
 * @param {Object} formula - The formula to check.
 * @param {Object} ref - The reference formula.
 * @param {Object} agents - The agents that have been assigned.
 * @param {Object} holes - The holes that have been assigned.
 * @param {Object} propositions - The propositions that have been assigned.
 * @returns {Array} - Tuple containing boolean result and the assigned agents, holes and propositions.
 * @throws {Error} - If the reference formula is invalid.
 */
export function checkFormula(formula, ref, agents, holes, propositions) {
  if (ref.type === "hole") {
    if (holes[ref.hole] === undefined) holes[ref.hole] = formula;
    return [equal(holes[ref.hole], formula), agents, holes, propositions];
  }

  if (formula.type !== ref.type) return [false, agents, holes, propositions];

  if (bin.includes(ref.type)) {
    let result;
    [result, agents, holes, propositions] = checkFormula(
      formula.left,
      ref.left,
      agents,
      holes,
      propositions
    );
    if (!result) return [false, agents, holes, propositions];
    return checkFormula(formula.right, ref.right, agents, holes, propositions);
  }

  if (un.includes(ref.type)) {
    if (ref.type === "K") {
      if (agents[ref.agent] === undefined) agents[ref.agent] = formula.agent;
      if (agents[ref.agent] !== formula.agent)
        return [false, agents, holes, propositions];
    }
    return checkFormula(formula.value, ref.value, agents, holes, propositions);
  }

  // Holes and propositions are the only atoms in conclusions
  if (ref.type === "proposition") {
    if (propositions[ref.proposition] === undefined)
      propositions[ref.proposition] = formula;
    return [
      equal(propositions[ref.proposition], formula),
      agents,
      holes,
      propositions,
    ];
  }

  throw new Error("Invalid conclusion: " + ref.type);
}

/**
 * Initializes a premise by replacing holes with the assigned values.
 * @param {Object} premise - The formula to initialize.
 * @param {Object} agents - The agents that have been assigned.
 * @param {Object} holes - The holes that have been assigned.
 * @param {Object} propositions - The propositions that have been assigned.
 * @returns {Object} - The initialized formula.
 * @throws {Error} - If the formula type is invalid.
 */
export function initPremise(premise, agents, holes, propositions) {
  if (bin.includes(premise.type))
    return {
      type: premise.type,
      left: initPremise(premise.left, agents, holes),
      right: initPremise(premise.right, agents, holes),
    };

  if (un.includes(premise.type)) {
    if (premise.type === "K")
      return {
        type: premise.type,
        agent: agents[premise.agent],
        value: initPremise(premise.value, agents, holes),
      };
    return {
      type: premise.type,
      value: initPremise(premise.value, agents, holes),
    };
  }

  if (atom.includes(premise.type)) {
    if (premise.type === "hole")
      return holes[premise.hole] ? holes[premise.hole] : premise;
    if (premise.type === "proposition")
      return propositions[premise.proposition];
    return premise;
  }

  throw new Error("Invalid premise: " + premise.type);
}

/**
 * Checks if a formula contains a given type of subformula.
 * @param {Object} formula - The formula to check.
 * @param {string} type - The type of subformula to check for.
 * @returns {boolean} - True if the formula contains the subformula, false otherwise.
 */
export function contains(formula, type) {
  if (formula.type === type) return true;
  if (bin.includes(formula.type))
    return contains(formula.left, type) || contains(formula.right, type);
  if (un.includes(formula.type)) return contains(formula.value, type);
  if (atom.includes(formula.type)) return false;
  throw new Error("Invalid formula: " + formula.type);
}

/**
 * Fills a formula with a given subformula.
 * @param {Object} formula - The formula to fill.
 * @param {Object} hole - The subformula to fill the formula with.
 * @returns {Object} - The filled formula.
 * @throws {Error} - If the formula type is invalid.
 */
export function fill(formula, hole) {
  if (bin.includes(formula.type))
    return {
      type: formula.type,
      left: fill(formula.left, hole),
      right: fill(formula.right, hole),
    };

  if (un.includes(formula.type)) {
    if (formula.type === "K")
      return {
        type: formula.type,
        agent: formula.agent,
        value: fill(formula.value, hole),
      };
    return { type: formula.type, value: fill(formula.value, hole) };
  }

  if (atom.includes(formula.type)) {
    if (formula.type === "hole") return hole;
    return formula;
  }
  throw new Error("Invalid formula: " + formula.type);
}

/**
 * Finds the difference between two formulas.
 * @param {Object} left - The first formula.
 * @param {Object} right - The second formula.
 * @returns {Object} - The difference between the two formulas.
 * @throws {Error} - If the formula type is invalid.
 */
export function diff(left, right) {
  if (left.type !== right.type) return { type: "equivalence", left, right };

  if (bin.includes(left.type)) {
    const resLeft = diff(left.left, right.left);
    const resRight = diff(left.right, right.right);
    if (resLeft && resRight) return { type: left.type, left, right };
    return resLeft ? resLeft : resRight;
  }

  if (un.includes(left.type)) {
    if (left.type === "K" && left.agent !== right.agent)
      return { type: "equivalence", left, right };
    return diff(left.value, right.value);
  }

  if (atom.includes(left.type)) {
    if (left.type === "proposition" || left.type === "variable")
      if (left.value !== right.value)
        return { type: "equivalence", left, right };
    return null;
  }

  throw new Error("Invalid formula: " + left.type);
}
