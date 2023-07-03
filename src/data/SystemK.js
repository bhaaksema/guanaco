import Rule from "../utils/Rule";

const systemK = [
  // A1: Propositional tautologies
  new Rule("A1", 0, 0, {
    // Custom conclusion, see src/utils/Rule.js
    type: "hole",
    hole: 0,
  }),
  // A2: Modus ponens for knowledge
  // (Ka f1 & Ka (f1 -> f2)) -> Ka f2
  new Rule("A2", 1, 2, {
    type: "implication",
    left: {
      type: "conjunction",
      left: { type: "K", agent: 0, value: { type: "hole", hole: 0 } },
      right: {
        type: "K",
        agent: 0,
        value: {
          type: "implication",
          left: { type: "hole", hole: 0 },
          right: { type: "hole", hole: 1 },
        },
      },
    },
    right: { type: "K", agent: 0, value: { type: "hole", hole: 1 } },
  }),
  // A2': Distribution of K over ->
  // Ka (f1 -> f2) -> (Ka f1 -> Ka f2)
  new Rule("A2'", 1, 2, {
    type: "implication",
    left: {
      type: "K",
      agent: 0,
      value: {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    },
    right: {
      type: "implication",
      left: { type: "K", agent: 0, value: { type: "hole", hole: 0 } },
      right: { type: "K", agent: 0, value: { type: "hole", hole: 1 } },
    },
  }),
  // Modus Ponens
  new Rule("R1", 0, 2, { type: "hole", hole: 1 }, [
    { type: "hole", hole: 0 },
    {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 1 },
    },
  ]),
  // Necessitation of knowledge
  new Rule(
    "R2",
    1,
    1,
    {
      type: "K",
      agent: 0,
      value: { type: "hole", hole: 0 },
    },
    [{ type: "hole", hole: 0 }]
  ),
];

export default systemK;
