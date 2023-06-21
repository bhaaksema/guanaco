import equal from "fast-deep-equal";

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

  let result;
  switch (ref.type) {
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
    case "announcement":
      [result, agents, holes, propositions] = checkFormula(
        formula.left,
        ref.left,
        agents,
        holes,
        propositions
      );
      if (!result) return [false, agents, holes, propositions];
      return checkFormula(
        formula.right,
        ref.right,
        agents,
        holes,
        propositions
      );
    case "negation":
    case "E":
    case "C":
      return checkFormula(
        formula.value,
        ref.value,
        agents,
        holes,
        propositions
      );
    case "K":
      if (agents[ref.agent] === undefined) agents[ref.agent] = formula.agent;
      if (agents[ref.agent] !== formula.agent)
        return [false, agents, holes, propositions];
      return checkFormula(
        formula.value,
        ref.value,
        agents,
        holes,
        propositions
      );
    case "proposition":
      if (propositions[ref.proposition] === undefined)
        propositions[ref.proposition] = formula;
      return [
        equal(propositions[ref.proposition], formula),
        agents,
        holes,
        propositions,
      ];
    case "top":
    case "bottom":
      return [true, agents, holes, propositions];
    default:
      throw new Error("Invalid conclusion: " + ref.type);
  }
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
  switch (premise.type) {
    case "hole":
      return holes[premise.hole] ? holes[premise.hole] : premise;
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
    case "announcement":
      return {
        type: premise.type,
        left: initPremise(premise.left, agents, holes),
        right: initPremise(premise.right, agents, holes),
      };
    case "negation":
    case "E":
    case "C":
      return {
        type: premise.type,
        value: initPremise(premise.value, agents, holes),
      };
    case "K":
      return {
        type: premise.type,
        agent: agents[premise.agent],
        value: initPremise(premise.value, agents, holes),
      };
    case "proposition":
      return propositions[premise.proposition];
    case "top":
    case "bottom":
      return premise;
    default:
      throw new Error("Invalid premise: " + premise.type);
  }
}

/**
 * Checks if a formula is fully initialized.
 * @param {Object} formula - The formula to check.
 * @returns {boolean} - True if the formula is fully initialized, false otherwise.
 * @throws {Error} - If the formula type is invalid.
 * @see {@link initPremise}
 */
export function noHoles(formula) {
  switch (formula.type) {
    case "hole":
      return false;
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
    case "announcement":
      return noHoles(formula.left) && noHoles(formula.right);
    case "negation":
    case "K":
    case "E":
    case "C":
      return noHoles(formula.value);
    case "proposition":
    case "formula":
    case "top":
    case "bottom":
      return true;
    default:
      throw new Error("Invalid formula: " + formula.type);
  }
}

/**
 * Fills a formula with a given subformula.
 * @param {Object} formula - The formula to fill.
 * @param {Object} hole - The subformula to fill the formula with.
 * @returns {Object} - The filled formula.
 * @throws {Error} - If the formula type is invalid.
 */
export function fill(formula, hole) {
  switch (formula.type) {
    case "hole":
      return hole;
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
    case "announcement":
      return {
        type: formula.type,
        left: fill(formula.left, hole),
        right: fill(formula.right, hole),
      };
    case "negation":
    case "E":
    case "C":
      return {
        type: formula.type,
        value: fill(formula.value, hole),
      };
    case "K":
      return {
        type: formula.type,
        agent: formula.agent,
        value: fill(formula.value, hole),
      };
    case "proposition":
    case "formula":
    case "top":
    case "bottom":
      return formula;
    default:
      throw new Error("Invalid formula: " + formula.type);
  }
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

  let resLeft, resRight;
  switch (left.type) {
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
    case "announcement":
      resLeft = diff(left.left, right.left);
      resRight = diff(left.right, right.right);
      if (resLeft && resRight) return { type: left.type, left, right };
      return resLeft ? resLeft : resRight;
    case "negation":
    case "E":
    case "C":
      return diff(left.value, right.value);
    case "K":
      if (left.agent !== right.agent)
        return { type: "equivalence", left, right };
      return diff(left.value, right.value);
    case "proposition":
    case "formula":
      return left.value === right.value
        ? null
        : { type: "equivalence", left, right };
    case "top":
    case "bottom":
      return null;
    default:
      throw new Error("Invalid formula: " + left.type);
  }
}
