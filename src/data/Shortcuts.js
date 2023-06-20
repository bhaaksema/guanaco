import Rule from "../utils/Rule";

const shortcuts = [
  // K-distribution
  new Rule(
    "KD",
    1,
    2,
    {
      type: "implication",
      left: { type: "K", agent: 0, value: { type: "hole", hole: 0 } },
      right: { type: "K", agent: 0, value: { type: "hole", hole: 1 } },
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
  new Rule(
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
  new Rule(
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
  new Rule(
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
  new Rule(
    "KD↔",
    1,
    2,
    {
      type: "equivalence",
      left: { type: "K", agent: 0, value: { type: "hole", hole: 0 } },
      right: { type: "K", agent: 0, value: { type: "hole", hole: 1 } },
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
  new Rule(
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
  new Rule(
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
  new Rule(
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
  new Rule(
    "CP",
    0,
    2,
    {
      type: "implication",
      left: { type: "negation", value: { type: "hole", hole: 1 } },
      right: { type: "negation", value: { type: "hole", hole: 0 } },
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
  new Rule(
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
          right: { type: "negation", value: { type: "hole", hole: 1 } },
        },
        right: { type: "bottom" },
      },
    ]
  ),
  // Combining
  new Rule(
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
  new Rule(
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
  // Substitution
  new Rule(
    "SUB",
    0,
    2,
    {
      type: "equivalence",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 1 },
    },
    [
      {
        // Custom premise, see src/utils/Rule.js
      },
    ]
  ),
  // No contradiction 2
  new Rule(
    "NC'",
    0,
    1,
    {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: { type: "negation", value: { type: "hole", hole: 1 } },
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
];

export default shortcuts;
