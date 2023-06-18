import { useState } from "react";

import { Tree } from "../utils/Tree";
import ProofLine from "./ProofLine";
import GoalInput from "./GoalInput";

function Proof() {
  const [root, setRoot] = useState(new Tree({ type: "hole" }));

  return (
    <>
      {root.toArray().map((node) => (
        <ProofLine key={node.id} {...{ node, root, setRoot }} />
      ))}
      <GoalInput {...{ setRoot }} />
    </>
  );
}

export default Proof;
