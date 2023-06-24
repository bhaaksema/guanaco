import { Accordion, Col, Row, Table } from "react-bootstrap";
import "./Accordion.css";

function SyntaxTable() {
  const syntax = [
    [
      {
        name: "Proposition",
        input: ["pn", "qn", "rn", "sn"],
        pretty: ["pn", "qn", "rn", "sn"],
      },
      {
        name: "Formula Variable",
        input: ["fn", "gn", "hn"],
        pretty: ["fn", "gn", "hn"],
      },
      { name: "Negation", input: "!x", pretty: "¬x" },
      { name: "Conjunction", input: "x & y", pretty: "x ∧ y" },
      { name: "Disjunction", input: "x | y", pretty: "x ∨ y" },
      { name: "Implication", input: "x -> y", pretty: "x → y" },
      { name: "Equivalence", input: "x <-> y", pretty: "x ↔ y" },
    ],
    [
      {
        name: "Knowledge for Agent Variable",
        input: ["Kan x", "Kin x", "Kjn x"],
        pretty: ["Kan x", "Kin x", "Kjn x"],
      },
      { name: "Knowledge for Specific Agent", input: "Kn x", pretty: "Kn x" },
      { name: "Everybody Knows", input: "Ex", pretty: "Ex" },
      { name: "Common Knowledge", input: "Cx", pretty: "Cx" },
      { name: "Public Announcement", input: "[x] y", pretty: "[x] y" },
      { name: "Tautology", input: "T", pretty: "⊤" },
      { name: "Contradiction", input: "F", pretty: "⊥" },
    ],
  ];

  const table = (col, i) => (
    <Table striped bordered hover size="sm" responsive="sm">
      <thead>
        <tr>
          <th>Syntax{i === 1 && " (cont.)"}</th>
          <th className="text-center" colSpan={4 - i}>
            Input
          </th>
          <th className="text-center" colSpan={4 - i}>
            Displayed
          </th>
        </tr>
      </thead>
      <tbody>
        {col.map((row, j) => (
          <tr key={j}>
            <td>{row.name}</td>
            {Array.isArray(row.input) ? (
              row.input.map((input, k) => (
                <td key={k} className="text-center text-nowrap">
                  <samp>{input}</samp>
                  <code>*</code>
                </td>
              ))
            ) : (
              <td className="text-center text-nowrap" colSpan={4 - i}>
                <samp>{row.input}</samp>
              </td>
            )}
            {Array.isArray(row.input) && row.input.length < 4 - i && (
              <td
                className="text-center text-nowrap"
                colSpan={4 - i - row.input.length}
              ></td>
            )}
            {Array.isArray(row.pretty) ? (
              row.pretty.map((pretty, k) => (
                <td key={k} className="text-center text-nowrap">
                  {pretty}
                </td>
              ))
            ) : (
              <td className="text-center text-nowrap" colSpan={4 - i}>
                {row.pretty}
              </td>
            )}
            {Array.isArray(row.pretty) && row.pretty.length < 4 - i && (
              <td
                className="text-center text-nowrap"
                colSpan={4 - i - row.pretty.length}
              ></td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Syntax Overview</Accordion.Header>
        <Accordion.Body>
          <Row>
            {syntax.map((col, i) => (
              <Col key={i}>{table(col, i)}</Col>
            ))}
          </Row>
          (<code>*</code>) denotes that integer <samp>n</samp> is optional.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default SyntaxTable;
