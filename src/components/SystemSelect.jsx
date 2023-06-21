import PropTypes from "prop-types";
import { Form, InputGroup } from "react-bootstrap";

import { Tree } from "../utils/Tree";
import systems from "../utils/Systems";

SystemSelect.propTypes = {
  root: PropTypes.instanceOf(Tree).isRequired,
  setRoot: PropTypes.func.isRequired,
  system: PropTypes.object.isRequired,
  setSystem: PropTypes.func.isRequired,
};

function SystemSelect({ root, setRoot, system, setSystem }) {
  /**
   * Handle the user selecting a system.
   * @param {string} value - The name of the system.
   * @returns {void}
   */
  function handleSelect(value) {
    // update the system
    setSystem({
      name: value,
      agents: system.agents,
      rules: systems(system.agents)[value],
    });
    // reset the proof tree
    setRoot(root.setFormula(root.formula));
  }

  /**
   * Handle the user entering the number of agents.
   * @param {string} value - The number of agents.
   * @returns {void}
   */
  function handleInput(value) {
    let m = parseInt(value, 10);
    m = m < 1 ? 1 : m;
    // update the system
    setSystem({
      name: system.name,
      agents: m,
      rules: systems(m)[system.name],
    });
    // reset the proof tree
    setRoot(root.setFormula(root.formula));
  }

  return (
    <InputGroup style={{ width: "20em" }}>
      <InputGroup.Text>System</InputGroup.Text>
      <Form.Select
        onChange={(event) => handleSelect(event.target.value)}
        value={system.name}
      >
        {Object.keys(systems(system.agents)).map((key) => (
          <option key={key}>{key}</option>
        ))}
      </Form.Select>
      <InputGroup.Text>Agents</InputGroup.Text>
      <Form.Control
        type="number"
        min="1"
        value={isNaN(system.agents) ? "" : system.agents}
        onChange={(event) => handleInput(event.target.value)}
        placeholder="(m)"
      />
    </InputGroup>
  );
}

export default SystemSelect;
