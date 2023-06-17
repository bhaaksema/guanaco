import Justification from "../utils/Justification";
import systemK from "./SystemK";

const systemS5 = [
  ...systemK,
  // A3: Knowledge implies truth
  // Ki p -> p
  new Justification("A3", 1, 1, {
    type: "implication",
    left: {
      type: "K",
      agent: 0,
      formula: { type: "hole", hole: 0 },
    },
    right: { type: "hole", hole: 0 },
  }),
  // A4: Positive introspection
  // Ki p -> Ki Ki p
  new Justification("A4", 1, 1, {
    type: "implication",
    left: {
      type: "K",
      agent: 0,
      formula: { type: "hole", hole: 0 },
    },
    right: {
      type: "K",
      agent: 0,
      formula: {
        type: "K",
        agent: 0,
        formula: { type: "hole", hole: 0 },
      },
    },
  }),
  // A5: Negative introspection
  // ! Ki p -> Ki ! Ki p
  new Justification("A5", 1, 1, {
    type: "implication",
    left: {
      type: "negation",
      formula: {
        type: "K",
        agent: 0,
        formula: { type: "hole", hole: 0 },
      },
    },
    right: {
      type: "K",
      agent: 0,
      formula: {
        type: "negation",
        formula: {
          type: "K",
          agent: 0,
          formula: { type: "hole", hole: 0 },
        },
      },
    },
  }),
];

export default systemS5;
