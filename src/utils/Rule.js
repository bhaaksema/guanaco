import { checkFormula, contains, initPremise, diff } from "./Formula";

/**
 * Class representing a rule
 * @class
 * @property {string} name - The name of the rule
 * @property {number} agents - The number of agents in the rule
 * @property {number} holes - The number of holes in the rule
 * @property {number} propositions - The number of propositions in the rule
 * @property {Object} conclusion - The conclusion of the rule
 * @property {Array} premises - The premises of the rule
 * @property {function} check - Checks if a formula is a valid conclusion of the rule
 * @returns {Rule} - A rule
 */
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

  /**
   * Checks if a formula is a valid conclusion of the rule
   * @param {Object} formula - The formula to check
   * @returns {boolean | Array} - False if formula not valid, otherwise an array of premises
   */
  check(formula) {
    // if there are holes in formula, return false
    if (contains(formula, "hole")) return false;

    // check formula against rule conclusion
    const agentArr = Array(this.agents);
    let [result, agents, holes, propositions] = checkFormula(
      formula,
      this.conclusion,
      this.name === "A6" ? [...agentArr.keys()].map((i) => ++i) : agentArr,
      new Array(this.holes),
      new Array(this.propositions)
    );

    // if rule is axiom, return result
    if (this.premises.length === 0) return result;

    // if result is false, return it
    if (!result) return result;

    // substitution is a special case
    if (this.name === "SUB") {
      const res = diff(formula.left, formula.right);
      // if no difference, return the formula
      return [res ? res : formula];
    }

    // if rule is not axiom, init premises
    return this.premises.map((premise) =>
      initPremise(premise, agents, holes, propositions)
    );
  }
}

export default Rule;
