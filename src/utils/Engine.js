import equal from "fast-deep-equal";

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
        propositions[ref.proposition] === formula,
        agents,
        holes,
        propositions,
      ];
    case "bottom":
      return [true, agents, holes, propositions];
    default:
      throw new Error("Invalid conclusion: " + ref.type);
  }
}

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
      return noHoles(formula.value);
    case "proposition":
    case "formula":
    case "bottom":
      return true;
    default:
      throw new Error("Invalid formula: " + formula.type);
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
    case "bottom":
      return formula;
    default:
      throw new Error("Invalid formula: " + formula.type);
  }
}

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
    case "bottom":
      return null;
    default:
      throw new Error("Invalid formula: " + left.type);
  }
}
