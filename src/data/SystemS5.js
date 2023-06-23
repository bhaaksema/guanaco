import Rule from "../utils/Rule";
import systemS4 from "./SystemS4";

const systemS5 = [
  ...systemS4,
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
