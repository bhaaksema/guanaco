const RulesS5EC = [
  // Modus Ponens
  {
    name: "R1",
    agents: 0,
    holes: 2,
    premises: [
      { type: "hole", hole: 0 },
      {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
    ],
    conclusion: { type: "hole", hole: 1 },
  },
  // Necessitation of knowledge
  {
    name: "R2",
    agents: 1,
    holes: 1,
    premises: [{ type: "hole", hole: 0 }],
    conclusion: {
      type: "K",
      agent: 0,
      formula: { type: "hole", hole: 0 },
    },
  },
  // Necessitation of common knowledge
  {
    name: "R3",
    agents: 0,
    holes: 1,
    premises: [{ type: "hole", hole: 0 }],
    conclusion: { type: "C", formula: { type: "hole", hole: 0 } },
  }
];

export default RulesS5EC;
