import Justification from "../utils/Justification";

const shortcuts = [
  // K-distribution
  new Justification(
    "KD",
    1,
    2,
    {
      type: "implication",
      left: { type: "K", agent: 0, formula: { type: "hole", hole: 0 } },
      right: { type: "K", agent: 0, formula: { type: "hole", hole: 1 } },
    },
    [
      {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    ]
  ),
  // Equivalence introduction
  new Justification(
    "EI",
    0,
    2,
    {
      type: "equivalence",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 1 },
    },
    [
      {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
      {
        type: "implication",
        left: { type: "hole", hole: 1 },
        right: { type: "hole", hole: 0 },
      },
    ]
  ),
  // Equivalence elimination
  new Justification(
    "EE",
    0,
    2,
    {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 1 },
    },
    [
      {
        type: "equivalence",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    ]
  ),
  // Equivalence elimination
  new Justification(
    "EE'",
    0,
    2,
    {
      type: "implication",
      left: { type: "hole", hole: 1 },
      right: { type: "hole", hole: 0 },
    },
    [
      {
        type: "equivalence",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    ]
  ),
  // K-distribution <->
  new Justification(
    "KD↔",
    1,
    2,
    {
      type: "equivalence",
      left: { type: "K", agent: 0, formula: { type: "hole", hole: 0 } },
      right: { type: "K", agent: 0, formula: { type: "hole", hole: 1 } },
    },
    [
      {
        type: "equivalence",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    ]
  ),
  // Hypothetical syllogism
  new Justification(
    "HS",
    0,
    3,
    {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 2 },
    },
    [
      {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
      {
        type: "implication",
        left: { type: "hole", hole: 1 },
        right: { type: "hole", hole: 2 },
      },
    ]
  ),
  // Hypothetical syllogism <->
  new Justification(
    "HS↔",
    0,
    3,
    {
      type: "equivalence",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 2 },
    },
    [
      {
        type: "equivalence",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
      {
        type: "equivalence",
        left: { type: "hole", hole: 1 },
        right: { type: "hole", hole: 2 },
      },
    ]
  ),
  // Left-right strengthening
  new Justification(
    "LR",
    0,
    3,
    {
      type: "implication",
      left: {
        type: "conjunction",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 2 },
      },
      right: {
        type: "conjunction",
        left: { type: "hole", hole: 1 },
        right: { type: "hole", hole: 2 },
      },
    },
    [
      {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    ]
  ),
  // Contraposition
  new Justification(
    "CP",
    0,
    2,
    {
      type: "implication",
      left: { type: "negation", formula: { type: "hole", hole: 1 } },
      right: { type: "negation", formula: { type: "hole", hole: 0 } },
    },
    [
      {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    ]
  ),
  // No Contradiction 1
  new Justification(
    "NC",
    0,
    1,
    {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 1 },
    },
    [
      {
        type: "implication",
        left: {
          type: "conjunction",
          left: { type: "hole", hole: 0 },
          right: { type: "negation", formula: { type: "hole", hole: 1 } },
        },
        right: { type: "bottom" },
      },
    ]
  ),
  // Combining
  new Justification(
    "CO",
    0,
    4,
    {
      type: "implication",
      left: {
        type: "conjunction",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
      right: {
        type: "conjunction",
        left: { type: "hole", hole: 2 },
        right: { type: "hole", hole: 3 },
      },
    },
    [
      {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 2 },
      },
      {
        type: "implication",
        left: { type: "hole", hole: 1 },
        right: { type: "hole", hole: 3 },
      },
    ]
  ),
  // Combining <->
  new Justification(
    "CO↔",
    0,
    4,
    {
      type: "equivalence",
      left: {
        type: "conjunction",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
      right: {
        type: "conjunction",
        left: { type: "hole", hole: 2 },
        right: { type: "hole", hole: 3 },
      },
    },
    [
      {
        type: "equivalence",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 2 },
      },
      {
        type: "equivalence",
        left: { type: "hole", hole: 1 },
        right: { type: "hole", hole: 3 },
      },
    ]
  ),
  // TODO: Substitution

  // No contradiction 2
  new Justification(
    "NC'",
    0,
    1,
    {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: { type: "negation", formula: { type: "hole", hole: 1 } },
    },
    [
      {
        type: "implication",
        left: {
          type: "conjunction",
          left: { type: "hole", hole: 0 },
          right: { type: "hole", hole: 1 },
        },
        right: { type: "bottom" },
      },
    ]
  ),
  // E-distribution
  new Justification(
    "ED",
    0,
    2,
    {
      type: "implication",
      left: { type: "E", formula: { type: "hole", hole: 0 } },
      right: { type: "E", formula: { type: "hole", hole: 1 } },
    },
    [
      {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    ]
  ),
  // C-distribution
  new Justification(
    "CD",
    0,
    2,
    {
      type: "implication",
      left: { type: "C", formula: { type: "hole", hole: 0 } },
      right: { type: "C", formula: { type: "hole", hole: 1 } },
    },
    [
      {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    ]
  ),
];

export default shortcuts;
