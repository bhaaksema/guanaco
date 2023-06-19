import { noHoles, checkFormula, initPremise } from "./Engine";

class Rule {
  constructor(
    name,
    agents,
    holes,
    conclusion,
    premises = [],
    propositions = 0
  ) {
    this.name = name;
    this.agents = agents;
    this.holes = holes;
    this.propositions = propositions;
    this.conclusion = conclusion;
    this.premises = premises;
  }

  check(formula) {
    // if there are holes in formula, return false
    if (!noHoles(formula)) return false;

    // check formula against rule conclusion
    let [result, agents, holes, propositions] = checkFormula(
      formula,
      this.conclusion,
      new Array(this.agents),
      new Array(this.holes),
      new Array(this.propositions)
    );

    // if rule is axiom, return result
    if (this.premises.length === 0) return result;

    // if result is false, return it
    if (!result) return false;

    // if rule is not axiom, init premises
    return this.premises.map((premise) =>
      initPremise(premise, agents, holes, propositions)
    );
  }
}

export default Rule;
