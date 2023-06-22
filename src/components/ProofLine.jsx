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
  /**
   * Render the ProofLine component.
   * @returns {JSX.Element}
   */
  return (
    <Collapse in={true} appear>
      {/* This div is necessary for smooth animation */}
      <div>
        <HoleInput {...{ node, setRoot }} />
        <Form validated={node.validated} className="d-flex my-3">
          <InputGroup.Text
            className="flex-grow-1 border-0 border-bottom rounded-0"
            style={{
              overflowX: "auto",
              backgroundColor: "white",
              fontSize: "1.2em",
            }}
          >
            {nodeIndex(root, node)}&emsp;⊢&ensp;{pretty(node.formula)}
          </InputGroup.Text>
          <div className="d-flex">
            <InputGroup hasValidation style={{ width: "11em" }}>
              <RuleSelect {...{ node, setRoot, system }} />
              {node.children.length > 0 && (
                <InputGroup.Text style={{ width: "4em" }}>
                  {node.children.map((c) => nodeIndex(root, c)).join(", ")}
                </InputGroup.Text>
              )}
            </InputGroup>
          </div>
        </Form>
      </div>
    </Collapse>
  );
}

export default ProofLine;
