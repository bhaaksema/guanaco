import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";

import { parse } from "../utils/Parser";

GoalInput.propTypes = {
  setRoot: PropTypes.func.isRequired,
  system: PropTypes.object.isRequired,
};

function GoalInput({ setRoot, system }) {
  const input = useRef(null);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  function updateError(message, target, result = { type: "hole" }) {
    target.setCustomValidity(message);
    setError(message);
    // update the root
    setRoot((root) => root.setFormula(result));
  }

  /**
   * Handle the user typing in the input field.
   * @param {EventTarget} target - The input field.
   * @returns {void}
   */
  function handleTyping(target) {
    // enable validation if the user has typed something
    setValidated(target.value !== "");

    try {
      // if the formula is well-formed, remove the error message
      updateError("", target, parse(target.value, system));
    } catch (e) {
      // if the formula is not well-formed, show the error message
      updateError(e.message, target);
    }
  }

  /** Update the input field when the system changes. */
  useEffect(() => {
    handleTyping(input.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [system]);

  /**
   * Render the GoalInput component.
   * @returns {JSX.Element}
   */
  return (
    <Form noValidate validated={validated} className="my-2">
      <FloatingLabel label="Goal">
        <Form.Control
          ref={input}
          placeholder="Goal"
          onChange={(e) => handleTyping(e.target)}
          autoFocus
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </FloatingLabel>
    </Form>
  );
}

export default GoalInput;
