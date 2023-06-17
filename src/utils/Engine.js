import equal from "fast-deep-equal";

export function check(formula, base) {
  // if there are holes in formula, return false
  if (!noHoles(formula)) return false;

  // check formula against base conclusion
  let [result, agents, holes, propositions] = checkFormula(
    formula,
    base.conclusion,
    new Array(base.agents),
    new Array(base.holes),
    new Array(base.propositions)
  );

  // if base is axiom, return result
  if (base.premises.length === 0) return result;

  // if result is false, return it
  if (!result) return false;

  // if base is not axiom, init premises
  return base.premises.map((premise) =>
    initPremise(premise, agents, holes, propositions)
  );
}

function checkFormula(formula, ref, agents, holes, propositions) {
  if (ref.type === "hole") {
    if (holes[ref.hole] === undefined) {
      holes[ref.hole] = formula;
      return [true, agents, holes, propositions];
    } else {
      return [equal(holes[ref.hole], formula), agents, holes, propositions];
    }
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
        formula.formula,
        ref.formula,
        agents,
        holes,
        propositions
      );
    case "K":
      if (agents[ref.agent] === undefined) {
        agents[ref.agent] = formula.agent;
        return checkFormula(
          formula.formula,
          ref.formula,
          agents,
          holes,
          propositions
        );
      } else if (agents[ref.agent] !== formula.agent) {
        return [false, agents, holes, propositions];
      } else {
        return checkFormula(
          formula.formula,
          ref.formula,
          agents,
          holes,
          propositions
        );
      }
    case "proposition":
      if (propositions[ref.proposition] === undefined) {
        propositions[ref.proposition] = formula;
        return [true, agents, holes, propositions];
      } else {
        return [
          equal(propositions[ref.proposition], formula),
          agents,
          holes,
          propositions,
        ];
      }
    case "bottom":
      // TODO: check if formula is bottom
      return [false, agents, holes, propositions];
    default:
      throw new Error("Invalid reference: " + ref);
  }
}

function initPremise(premise, agents, holes, propositions) {
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
        formula: initPremise(premise.formula, agents, holes),
      };
    case "K":
      return {
        type: premise.type,
        agent: agents[premise.agent],
        formula: initPremise(premise.formula, agents, holes),
      };
    case "proposition":
      return propositions[premise.proposition];
    case "bottom":
      return premise;
    default:
      throw new Error("Invalid premise: " + premise.type);
  }
}

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
      return noHoles(formula.formula);
    case "proposition":
    case "formula":
    case "bottom":
      return true;
    default:
      throw new Error("Invalid formula: " + formula);
  }
}

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
        formula: fill(formula.formula, hole),
      };
    case "K":
      return {
        type: formula.type,
        agent: formula.agent,
        formula: fill(formula.formula, hole),
      };
    case "proposition":
    case "formula":
    case "bottom":
      return formula;
    default:
      throw new Error("Invalid formula: " + formula);
  }
}
