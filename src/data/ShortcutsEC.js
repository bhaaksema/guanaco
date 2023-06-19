import Rule from "../utils/Rule";

const shortcutsEC = [
  // E-distribution
  new Rule(
    "ED",
    0,
    2,
    {
      type: "implication",
      left: { type: "E", value: { type: "hole", hole: 0 } },
      right: { type: "E", value: { type: "hole", hole: 1 } },
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
  new Rule(
    "CD",
    0,
    2,
    {
      type: "implication",
      left: { type: "C", value: { type: "hole", hole: 0 } },
      right: { type: "C", value: { type: "hole", hole: 1 } },
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

export default shortcutsEC;
