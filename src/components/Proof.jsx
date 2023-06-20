import { useState } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";

import systems from "../utils/Systems";
import { Tree } from "../utils/Tree";
import ProofLine from "./ProofLine";
import GoalInput from "./GoalInput";

function Proof() {
  const [root, setRoot] = useState(new Tree({ type: "hole" }));
  const [system, setSystem] = useState({
    name: "PAC",
    agents: 2,
    rules: systems(2)["PAC"],
  });

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

  function handleInput(value) {
    const m = parseInt(value, 10);
    // update the system
    setSystem({
      name: system.name,
      agents: m,
      rules: systems(m)[system.name],
    });
    // reset the proof tree
    setRoot(root.setFormula(root.formula));
  }

  return (
    <Card border="dark" className="mt-3 mb-1">
      <Card.Header>
        <Card.Title as="h3">
          A Syntactic Proof Guide for Epistemic Logic
        </Card.Title>
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
            defaultValue={system.name}
          >
            {Object.keys(systems(system.agents)).map((key) => (
              <option key={key}>{key}</option>
            ))}
          </Form.Select>
          <InputGroup.Text>Agents</InputGroup.Text>
          <Form.Control
            type="number"
            min="1"
            defaultValue={system.agents}
            onChange={(event) => handleInput(event.target.value)}
          />
        </InputGroup>
        <GoalInput {...{ setRoot }} />
      </Card.Footer>
    </Card>
  );
}

export default Proof;
