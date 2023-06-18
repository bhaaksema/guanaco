import PropTypes from "prop-types";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import HoleInput from "./HoleInput";
import RuleSelect from "./RuleSelect";
import pretty from "../utils/Pretty";
import { Tree, nodeIndex } from "../utils/Tree";

ProofLine.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  root: PropTypes.instanceOf(Tree).isRequired,
  setRoot: PropTypes.func.isRequired,
};

function ProofLine({ node, root, setRoot }) {
  return (
    <>
      <Collapse in={true} appear>
        <div>
          <HoleInput {...{ node, setRoot }} />
          <Navbar>
            <Container className="border-bottom rounded" fluid>
              <Navbar.Brand>
                {nodeIndex(root, node)}&emsp;⊢&ensp;{pretty(node.formula)}
              </Navbar.Brand>
            </Container>
            <RuleSelect {...{ node, root, setRoot }} />
          </Navbar>
        </div>
      </Collapse>
    </>
  );
}

export default ProofLine;
