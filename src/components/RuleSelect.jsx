import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

import { contains } from "../utils/Formula";
import { Tree } from "../utils/Tree";

RuleSelect.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  setRoot: PropTypes.func.isRequired,
  system: PropTypes.object.isRequired,
};

function RuleSelect({ node, setRoot, system }) {
  const ruleList = system.rules.filter((rule) => rule.check(node.formula));

  /**
   * Handle the user selecting a rule.
   * @param {EventTarget} target - The select field.
   * @returns {void}
   */
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
      const validated =
        premises.length === 1 || !premises.some((p) => contains(p, "hole"));
      // update the root
      setRoot((root) => root.update(node, ruleName, validated, children));
    } else {
      // rule is an axiom, enable validation possibly for A1
      setRoot((root) => root.update(node, ruleName, true, []));
    }
  }

  /** @type {CSSProperties} */
  const selectStyle = {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  };

  /**
   * Render the RuleSelect component.
   * @returns {JSX.Element}
   */
  return (
    <Form.Select
      value={node.rule}
      disabled={ruleList.length === 0}
      style={selectStyle}
      onChange={(event) => handleSelect(event.target)}
    >
      <option disabled value={0}>
        Rule
      </option>
      {ruleList.map((rule) => (
        <option key={rule.name}>{rule.name}</option>
      ))}
    </Form.Select>
  );
}

export default RuleSelect;
