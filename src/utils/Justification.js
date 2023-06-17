class Justification {
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
}

export default Justification;
