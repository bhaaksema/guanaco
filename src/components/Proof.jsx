import { useState } from "react";
import { Card } from "react-bootstrap";

import systems from "../utils/Systems";
import { Tree } from "../utils/Tree";
import ProofLine from "./ProofLine";
import SystemSelect from "./SystemSelect";
import GoalInput from "./GoalInput";
import SyntaxTable from "./SyntaxTable";

function Proof() {
  // initialize the proof tree and the system
  const [root, setRoot] = useState(new Tree({ type: "hole" }));
  const [system, setSystem] = useState({
    name: "K",
    agents: NaN,
    rules: systems(NaN)["K"],
  });

  /**
   * Render the Proof component.
   * @returns {JSX.Element}
   */
  return (
    <Card border="dark" className="mt-3 mb-1">
      <Card.Body>
        {root.toArray().map((node) => (
          <ProofLine key={node.id} {...{ node, root, setRoot, system }} />
        ))}
      </Card.Body>
      <Card.Footer>
        <SystemSelect {...{ root, setRoot, system, setSystem }} />
        <GoalInput {...{ setRoot, system }} />
        <SyntaxTable />
      </Card.Footer>
    </Card>
  );
}

export default Proof;
