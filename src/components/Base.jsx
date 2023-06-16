import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import rulesList from "../data/RulesS5EC";
import shortcuts from "../data/Shortcuts";
import { check, noHoles } from "../utils/Engine";
import { Tree, nodeIndex } from "../utils/Tree";

Base.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  tree: PropTypes.instanceOf(Tree).isRequired,
  setTree: PropTypes.func.isRequired,
};

function Base({ node, tree, setTree }) {
  function handleSelect(target) {
    // bases are always valid when selected
    target.setCustomValidity("");

    // find the selected rule
    const base = target.value;
    const rule = rulesList.concat(shortcuts).find((rule) => rule.name === base);

    // update data model of the proof tree
    if (rule) {
      // base is a rule, obtain premises
      const premises = check(node.value, rule, false);
      // generate children nodes from premises
      const children = premises.map((premise) => new Tree(premise));
      // validate the node if there are no holes or if there is only one premise
      const validated = premises.length === 1 || premises.every(noHoles);
      // update the tree
      setTree((tree) => tree.update(node, base, validated, children));
    } else {
      // base is an axiom, enable validation except for A1
      setTree((tree) => tree.update(node, base, base !== "A1", []));
    }
  }

  return (
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
      {node.children.length > 0 && (
        <InputGroup.Text>
          {node.children.map((c) => nodeIndex(tree, c)).join(", ")}
        </InputGroup.Text>
      )}
    </Form>
  );
}

export default Base;
