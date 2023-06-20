import Rule from "../utils/Rule";
import systemS5EC from "./SystemS5EC";
import systemPA from "./SystemPA";

const systemPAC = (m) => [
  ...new Set([...systemS5EC(m), ...systemPA]),
  // R4: Necessitation of announcements
  new Rule(
    "R4",
    0,
    2,
    {
      type: "announcement",
      left: { type: "hole", hole: 1 },
      right: { type: "hole", hole: 0 },
    },
    [{ type: "hole", hole: 0 }]
  ),
  // R5: Announcement and common knowledge
  new Rule(
    "R5",
    0,
    3,
    {
      type: "implication",
      left: { type: "hole", hole: 2 },
      right: {
        type: "announcement",
        left: { type: "hole", hole: 0 },
        right: {
          type: "C",
          value: { type: "hole", hole: 1 },
        },
      },
    },
    [
      {
        type: "implication",
        left: { type: "hole", hole: 2 },
        right: {
          type: "announcement",
          left: { type: "hole", hole: 0 },
          right: { type: "hole", hole: 1 },
        },
      },
      {
        type: "conjunction",
        left: { type: "hole", hole: 2 },
        right: {
          type: "implication",
          left: { type: "hole", hole: 0 },
          right: {
            type: "E",
            value: { type: "hole", hole: 2 },
          },
        },
      },
    ]
  ),
];

export default systemPAC;
