import Rule from "../utils/Rule";
import systemT from "./SystemT";

const systemS4 = [
  ...systemT,
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
];

export default systemS4;
