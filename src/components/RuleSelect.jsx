import PropTypes from "prop-types";
import { Form, InputGroup } from "react-bootstrap";

import { noHoles } from "../utils/Engine";
import { Tree, nodeIndex } from "../utils/Tree";

RuleSelect.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  root: PropTypes.instanceOf(Tree).isRequired,
  setRoot: PropTypes.func.isRequired,
  system: PropTypes.object.isRequired,
};

function RuleSelect({ node, root, setRoot, system }) {
  const ruleList = system.rules.filter((rule) => rule.check(node.formula));

  function handleSelect(target) {
    // rules are always valid when selected
    target.setCustomValidity("");

    // find the selected rule
    const ruleName = target.value;
    const rule = ruleList.find((rule) => rule.name === ruleName);

    // update data model of the proof tree
    if (rule.premises.length > 0) {
      // rule is not an axiom, obtain premises
      const premises = rule.check(node.formula);
      // generate children nodes from premises
      const children = premises.map((premise) => new Tree(premise));
      // validate the node if there are no holes or if there is only one premise
      const validated = premises.length === 1 || premises.every(noHoles);
      // update the root
      setRoot((root) => root.update(node, ruleName, validated, children));
    } else {
      // rule is an axiom, enable validation except for A1
      setRoot((root) => root.update(node, ruleName, ruleName !== "A1", []));
    }
  }

  return (
    <Form validated={node.validated} className="d-flex">
      <InputGroup hasValidation>
        <Form.Select
          onChange={(event) => handleSelect(event.target)}
          value={node.rule}
          disabled={ruleList.length === 0}
          style={
            node.children.length > 0 ? { width: "7em" } : { width: "11em" }
          }
        >
          <option disabled value={0}>
            Rule
          </option>
          {ruleList.map((rule) => (
            <option key={rule.name}>{rule.name}</option>
          ))}
        </Form.Select>
      </InputGroup>
      {node.children.length > 0 && (
        <InputGroup.Text style={{ width: "4em" }}>
          {node.children.map((c) => nodeIndex(root, c)).join(", ")}
        </InputGroup.Text>
      )}
    </Form>
  );
}

export default RuleSelect;
