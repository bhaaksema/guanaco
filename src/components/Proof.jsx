import { useState } from "react";

import { Tree } from "../utils/Tree";
import ProofLine from "./ProofLine";
import GoalInput from "./GoalInput";

function Proof() {
  const [tree, setTree] = useState(new Tree({ type: "hole" }));

  return (
    <>
      {tree &&
        tree
          .toArray()
          .map((node) => (
            <ProofLine key={node.id} {...{ node, tree, setTree }} />
          ))}
      <GoalInput {...{ setTree }} />
    </>
  );
}

export default Proof;
