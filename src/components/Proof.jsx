import { useState } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";

import systems from "../utils/Systems";
import { Tree } from "../utils/Tree";
import ProofLine from "./ProofLine";
import GoalInput from "./GoalInput";

function Proof() {
  const title = "A Syntactic Proof Guide for Epistemic Logic";
  // initialize the proof tree and the system
  const [root, setRoot] = useState(new Tree({ type: "hole" }));
  const [system, setSystem] = useState({
    name: "K",
    agents: NaN,
    rules: systems(NaN)["K"],
  });

  /**
   * Handle the user selecting a system.
   * @param {string} value - The name of the system.
   * @returns {void}
   */
  function handleSelect(value) {
    // update the system
    setSystem({
      name: value,
      agents: system.agents,
      rules: systems(system.agents)[value],
    });
    // reset the proof tree
    setRoot(root.setFormula(root.formula));
  }

  /**
   * Handle the user entering the number of agents.
   * @param {string} value - The number of agents.
   * @returns {void}
   */
  function handleInput(value) {
    let m = parseInt(value, 10);
    m = m < 1 ? 1 : m;
    // update the system
    setSystem({
      name: system.name,
      agents: m,
      rules: systems(m)[system.name],
    });
    // reset the proof tree
    setRoot(root.setFormula(root.formula));
  }

  /**
   * Render the Proof component.
   * @returns {JSX.Element}
   */
  return (
    <Card border="dark" className="mt-3 mb-1">
      <Card.Header>
        <Card.Title as="h3">{title}</Card.Title>
        <Card.Text>
          The strategy that Guanaco employs is building proofs bottom-up. This
          means that users start with the formula that they wish to derive. If
          this formula can only be derived by a rule, then Guanaco exploits the
          properties of this formula to extract new formulas the relevant rule
          is applied to. If the formula is an instantiation of an axiom, no new
          formulas are extracted. The same process is then applied until each
          formula has a justification and no new ones are produced. At that
          point, the proof is complete. Currently, axiom A1 for propositional
          tautologies is not yet validated automatically.
        </Card.Text>
      </Card.Header>
      <Card.Body>
        {root.toArray().map((node) => (
          <ProofLine key={node.id} {...{ node, root, setRoot, system }} />
        ))}
      </Card.Body>
      <Card.Footer>
        <InputGroup style={{ width: "20em" }}>
          <InputGroup.Text>System</InputGroup.Text>
          <Form.Select
            onChange={(event) => handleSelect(event.target.value)}
            value={system.name}
          >
            {Object.keys(systems(system.agents)).map((key) => (
              <option key={key}>{key}</option>
            ))}
          </Form.Select>
          <InputGroup.Text>Agents</InputGroup.Text>
          <Form.Control
            type="number"
            min="1"
            value={isNaN(system.agents) ? "" : system.agents}
            onChange={(event) => handleInput(event.target.value)}
            placeholder="(m)"
          />
        </InputGroup>
        <GoalInput {...{ setRoot }} />
      </Card.Footer>
    </Card>
  );
}

export default Proof;
