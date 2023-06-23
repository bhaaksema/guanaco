import Rule from "../utils/Rule";
import systemS5 from "./SystemS5";

const systemPA = [
  ...systemS5,
  // A11: Atomic permanence
  // [f] p <-> (f -> p)
  new Rule(
    "A11",
    0,
    1,
    {
      type: "equivalence",
      left: {
        type: "announcement",
        left: { type: "hole", hole: 0 },
        right: { type: "proposition", proposition: 0 },
      },
      right: {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "proposition", proposition: 0 },
      },
    },
    [],
    1
  ),
  // A12: Announcement and negation
  // [f1] !f2 <-> (f1 -> ![f1] f2)
  new Rule("A12", 0, 2, {
    type: "equivalence",
    left: {
      type: "announcement",
      left: { type: "hole", hole: 0 },
      right: {
        type: "negation",
        value: { type: "hole", hole: 1 },
      },
    },
    right: {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: {
        type: "negation",
        value: {
          type: "announcement",
          left: { type: "hole", hole: 0 },
          right: { type: "hole", hole: 1 },
        },
      },
    },
  }),
  // A13: Announcement and conjunction
  // [f1] (f2 & f3) <-> ([f1] f2 & [f1] f3)
  new Rule("A13", 0, 3, {
    type: "equivalence",
    left: {
      type: "announcement",
      left: { type: "hole", hole: 0 },
      right: {
        type: "conjunction",
        left: { type: "hole", hole: 1 },
        right: { type: "hole", hole: 2 },
      },
    },
    right: {
      type: "conjunction",
      left: {
        type: "announcement",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
      right: {
        type: "announcement",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 2 },
      },
    },
  }),
  // A14: Announcement and knowledge
  // [f1] Ka f2 <-> (f1 -> Ka [f1] f2)
  new Rule("A14", 1, 2, {
    type: "equivalence",
    left: {
      type: "announcement",
      left: { type: "hole", hole: 0 },
      right: {
        type: "K",
        agent: 0,
        value: { type: "hole", hole: 1 },
      },
    },
    right: {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: {
        type: "K",
        agent: 0,
        value: {
          type: "announcement",
          left: { type: "hole", hole: 0 },
          right: { type: "hole", hole: 1 },
        },
      },
    },
  }),
  // A15: Announcement and composition
  // [f1] (f2 & f3) <-> ([f1] f2 & [f1] f3)
  new Rule("A15", 0, 3, {
    type: "equivalence",
    left: {
      type: "announcement",
      left: { type: "hole", hole: 0 },
      right: {
        type: "conjunction",
        left: { type: "hole", hole: 1 },
        right: { type: "hole", hole: 2 },
      },
    },
    right: {
      type: "conjunction",
      left: {
        type: "announcement",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
      right: {
        type: "announcement",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 2 },
      },
    },
  }),
];

export default systemPA;
