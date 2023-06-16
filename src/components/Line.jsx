import PropTypes from "prop-types";

import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";

import Input from "./Input";
import rulesList from "../data/RulesS5EC";
import shortcuts from "../data/Shortcuts";
import { check, noHoles } from "../utils/Engine";
import pretty from "../utils/Pretty";
import Tree from "../utils/Tree";

Line.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  index: PropTypes.number.isRequired,
  setTree: PropTypes.func.isRequired,
};

function Line({ node, index, setTree }) {
  function handleSelect(target) {
    // set validity to true
    target.setCustomValidity("");

    // notify the user that A1 requires manual validation
    const base = target.value;
    if (base === "A1") {
      // set validity to false
      target.setCustomValidity("Manual validation of A1 is required.");
    }

    // find the selected rule
    const rule = rulesList.concat(shortcuts).find((rule) => rule.name === base);

    // update the tree
    if (rule) {
      const premises = check(node.value, rule, false);
      const children = premises.map((premise) => new Tree(premise));
      const validated = premises.length === 1 || premises.every(noHoles);
      setTree((tree) => tree.update(node, base, validated, children));
    } else {
      setTree((tree) => tree.update(node, base, true, []));
    }
  }

  return (
    <Collapse in={true} appear>
      <div>
        <Input {...{ node, setTree }} />
        <Navbar>
          <Container className="border-bottom rounded" fluid>
            <Navbar.Brand>
              {index + 1}&emsp;⊢&ensp;{pretty(node.value)}
            </Navbar.Brand>
          </Container>
          <Form validated={node.validated} className="d-flex w-25">
            <InputGroup hasValidation>
              <Form.Select
                onChange={(event) => handleSelect(event.target)}
                value={node.base}
                disabled={node.baseList.length === 0}
              >
                <option disabled value={0}>
                  Base
                </option>
                {node.baseList.map((base) => (
                  <option key={base.name}>{base.name}</option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form>
        </Navbar>
      </div>
    </Collapse>
  );
}

export default Line;
