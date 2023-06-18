import Rule from "../utils/Rule";
import systemK from "./SystemK";

const systemKEC = [
  ...systemK,
  // A6: Definition of E
  // TODO: implement

  // A7: Common knowledge implies truth
  new Rule("A7", 0, 1, {
    type: "implication",
    left: { type: "C", value: { type: "hole", hole: 0 } },
    right: { type: "hole", hole: 0 },
  }),
  // A8: Mix of common knowledge
  new Rule("A8", 0, 1, {
    type: "implication",
    left: { type: "C", value: { type: "hole", hole: 0 } },
    right: {
      type: "E",
      value: { type: "C", value: { type: "hole", hole: 0 } },
    },
  }),
  // A9: Modus ponens for common knowledge
  new Rule("A9", 0, 2, {
    type: "implication",
    left: {
      type: "conjunction",
      left: { type: "C", value: { type: "hole", hole: 0 } },
      right: {
        type: "C",
        value: {
          type: "implication",
          left: { type: "hole", hole: 0 },
          right: { type: "hole", hole: 1 },
        },
      },
    },
    right: { type: "C", value: { type: "hole", hole: 1 } },
  }),
  // A9': Distribution of C over ->
  new Rule("A9'", 0, 2, {
    type: "implication",
    left: {
      type: "C",
      value: {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    },
    right: {
      type: "implication",
      left: { type: "C", value: { type: "hole", hole: 0 } },
      right: { type: "C", value: { type: "hole", hole: 1 } },
    },
  }),
  // A10: Induction for common knowledge
  new Rule("A10", 0, 1, {
    type: "implication",
    left: {
      type: "C",
      value: {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: {
          type: "E",
          value: { type: "hole", hole: 0 },
        },
      },
    },
    right: {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: {
        type: "C",
        value: { type: "hole", hole: 1 },
      },
    },
  }),
  // Necessitation of common knowledge
  new Rule(
    "R3",
    0,
    1,
    {
      type: "C",
      value: { type: "hole", hole: 0 },
    },
    [{ type: "hole", hole: 0 }]
  ),
];

export default systemKEC;
