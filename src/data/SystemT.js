import Rule from "../utils/Rule";
import systemK from "./SystemK";

const systemT = [
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
];

export default systemT;
