import PropTypes from "prop-types";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Input from "./Input";
import Base from "./Base";
import pretty from "../utils/Pretty";
import { Tree, nodeIndex } from "../utils/Tree";

Line.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  tree: PropTypes.instanceOf(Tree).isRequired,
  setTree: PropTypes.func.isRequired,
};

function Line({ node, tree, setTree }) {
  return (
    <>
      <Collapse in={true} appear>
        <div>
          <Input {...{ node, setTree }} />
          <Navbar>
            <Container className="border-bottom rounded" fluid>
              <Navbar.Brand>
                {nodeIndex(tree, node)}&emsp;⊢&ensp;{pretty(node.value)}
              </Navbar.Brand>
            </Container>
            <Base {...{ node, tree, setTree }} />
          </Navbar>
        </div>
      </Collapse>
    </>
  );
}

export default Line;
