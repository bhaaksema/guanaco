import { useState } from "react";

import { Tree } from "../utils/Tree";
import Line from "./Line";
import Goal from "./Goal";

function Proof() {
  const [tree, setTree] = useState(new Tree({ type: "hole" }));

  return (
    <>
      {tree &&
        tree
          .toArray()
          .map((node) => <Line key={node.id} {...{ node, tree, setTree }} />)}
      <Goal {...{ setTree }} />
    </>
  );
}

export default Proof;
