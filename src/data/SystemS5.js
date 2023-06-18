import Rule from "../utils/Rule";
import systemK from "./SystemK";

const systemS5 = [
  ...systemK,
  // A3: Knowledge implies truth
  // Ki p -> p
  new Rule("A3", 1, 1, {
    type: "implication",
    left: {
      type: "K",
      agent: 0,
      value: { type: "hole", hole: 0 },
    },
    right: { type: "hole", hole: 0 },
  }),
  // A4: Positive introspection
  // Ki p -> Ki Ki p
  new Rule("A4", 1, 1, {
    type: "implication",
    left: {
      type: "K",
      agent: 0,
      value: { type: "hole", hole: 0 },
    },
    right: {
      type: "K",
      agent: 0,
      value: {
        type: "K",
        agent: 0,
        value: { type: "hole", hole: 0 },
      },
    },
  }),
  // A5: Negative introspection
  // ! Ki p -> Ki ! Ki p
  new Rule("A5", 1, 1, {
    type: "implication",
    left: {
      type: "negation",
      value: {
        type: "K",
        agent: 0,
        value: { type: "hole", hole: 0 },
      },
    },
    right: {
      type: "K",
      agent: 0,
      value: {
        type: "negation",
        value: {
          type: "K",
          agent: 0,
          value: { type: "hole", hole: 0 },
        },
      },
    },
  }),
];

export default systemS5;
