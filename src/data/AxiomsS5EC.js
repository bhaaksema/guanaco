import AxiomsKEC from "./AxiomsKEC";

const AxiomsS5EC = [
  ...AxiomsKEC,
  // A3: Knowledge implies truth
  // Ki p -> p
  {
    name: "A3",
    agents: 1,
    holes: 1,
    formula: {
      type: "implication",
      left: {
        type: "K",
        agent: 0,
        formula: { type: "hole", hole: 0 },
      },
      right: { type: "hole", hole: 0 },
    },
  },
  // A4: Positive introspection
  // Ki p -> Ki Ki p
  {
    name: "A4",
    agents: 1,
    holes: 1,
    formula: {
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
    },
  },
  // A5: Negative introspection
  // ! Ki p -> Ki ! Ki p
  {
    name: "A5",
    agents: 1,
    holes: 1,
    formula: {
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
    },
  },
];

export default AxiomsS5EC;
