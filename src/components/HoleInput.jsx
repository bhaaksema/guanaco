import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Button, Collapse, Form, InputGroup } from "react-bootstrap";

import { Tree } from "../utils/Tree";
import { fill } from "../utils/Formula";
import { parse } from "../utils/Parser";

HoleInput.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  setRoot: PropTypes.func.isRequired,
  system: PropTypes.object.isRequired,
};

function HoleInput({ node, setRoot, system }) {
  const input = useRef(null);
  const [error, setError] = useState("");

  function updateError(message, target) {
    target.setCustomValidity(message);
    setError(message);
  }

  /**
   * Handle the user typing in the input field.
   * @param {EventTarget} target - The input field.
   * @returns {Object | null} - The parsed result.
   */
  function handleTyping(target) {
    let result = null;
    try {
      result = parse(target.value, system);
      // Parsing has succeeded, remove error
      updateError("", target);
    } catch (e) {
      // Parsing has failed, show error
      updateError(e.message, target);
    }

    // Update the tree
    setRoot((root) =>
      root.update(node, node.rule, target.value !== "", node.children)
    );
    return result;
  }

  /**
   * Handle the user submitting the formula.
   * @param {Event} event - The submit event.
   * @returns {void}
   */
  function handleSubmit(event) {
    // Parse the current input
    const hole = handleTyping(input.current);

    // If the input is valid, fill the holes in the tree
    if (hole) {
      node.children = node.children.map((child) =>
        child.setFormula(fill(child.formula, hole))
      );
    }

    // Update the tree and prevent the page from reloading
    setRoot((root) => root.update(node, node.rule, true, node.children));
    event.preventDefault();
  }

  /**
   * Render the HoleInput component.
   * @returns {JSX.Element}
   */
  return (
    <Collapse
      in={node.inputEnabled}
      mountOnEnter
      unmountOnExit
      className="mt-1 m-3"
    >
      {/* This div is necessary for smooth animation */}
      <div>
        <Form noValidate validated={node.validated} onSubmit={handleSubmit}>
          <InputGroup hasValidation>
            <InputGroup.Text>? =</InputGroup.Text>
            <Form.Control
              placeholder="enter formula"
              onChange={(e) => handleTyping(e.target)}
              ref={input}
            />
            <Button type="submit" variant="outline-secondary">
              Enter
            </Button>
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </InputGroup>
        </Form>
      </div>
    </Collapse>
  );
}

export default HoleInput;
