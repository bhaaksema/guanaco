import PropTypes from "prop-types";
import { Collapse, Form, InputGroup } from "react-bootstrap";

import HoleInput from "./HoleInput";
import RuleSelect from "./RuleSelect";
import pretty from "../utils/Pretty";
import { Tree, nodeIndex } from "../utils/Tree";

ProofLine.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  root: PropTypes.instanceOf(Tree).isRequired,
  setRoot: PropTypes.func.isRequired,
  system: PropTypes.object.isRequired,
};

function ProofLine({ node, root, setRoot, system }) {
  /** @type {CSSProperties} */
  const formulaStyle = {
    overflowX: "auto",
    backgroundColor: "rgba(0, 0, 0, 0)",
    fontSize: "1.2em",
  };

  /**
   * Render the ProofLine component.
   * @returns {JSX.Element}
   */
  return (
    <Collapse in={true} appear>
      {/* This div is necessary for smooth animation */}
      <div>
        <HoleInput {...{ node, setRoot, system }} />
        <Form validated={node.validated} className="d-flex my-3">
          <InputGroup.Text
            className="flex-grow-1 border-0 border-bottom rounded-0"
            style={formulaStyle}
          >
            {nodeIndex(root, node)}&emsp;⊢&ensp;{pretty(node.formula)}
          </InputGroup.Text>
          <InputGroup style={{ width: "auto", minWidth: "168px" }}>
            <RuleSelect {...{ node, setRoot, system }} />
            {node.children.length > 0 && (
              <InputGroup.Text
                className="justify-content-center"
                style={{ minWidth: "54px" }}
              >
                {node.children.map((c) => nodeIndex(root, c)).join(", ")}
              </InputGroup.Text>
            )}
          </InputGroup>
        </Form>
      </div>
    </Collapse>
  );
}

export default ProofLine;
