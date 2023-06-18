import { useState } from "react";
import { Card, Form } from "react-bootstrap";

import { Tree } from "../utils/Tree";
import ProofLine from "./ProofLine";
import GoalInput from "./GoalInput";

function Proof() {
  const [root, setRoot] = useState(new Tree({ type: "hole" }));

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
          <ProofLine key={node.id} {...{ node, root, setRoot }} />
        ))}
      </Card.Body>
      <Card.Footer>
        <Form.Select disabled style={{ width: "8em" }}>
          <option>System PA</option>
        </Form.Select>
        <GoalInput {...{ setRoot }} />
      </Card.Footer>
    </Card>
  );
}

export default Proof;
