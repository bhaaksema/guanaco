import PropTypes from "prop-types";
import { useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";

import { parse } from "../utils/Parser";

GoalInput.propTypes = {
  setRoot: PropTypes.func.isRequired,
};

function GoalInput({ setRoot }) {
  const [validated, setValidated] = useState(false);

  /**
   * Handle the user typing in the input field.
   * @param {EventTarget} target - The input field.
   * @returns {void}
   */
  function handleTyping(target) {
    // enable validation if the user has typed something
    setValidated(target.value !== "");

    // update the root
    setRoot((root) => {
      try {
        // if the formula is well-formed, remove the error message
        target.setCustomValidity("");
        return root.setFormula(parse(target.value));
      } catch (e) {
        // if the formula is not well-formed, show the error message
        target.setCustomValidity("This formula is not well-formed");
        return root.setFormula({ type: "hole" });
      }
    });
  }

  /**
   * Render the GoalInput component.
   * @returns {JSX.Element}
   */
  return (
    <Form noValidate validated={validated} className="my-2">
      <FloatingLabel label="Goal">
        <Form.Control
          placeholder="enter goal"
          onChange={(e) => handleTyping(e.target)}
          autoFocus
        />
        <Form.Control.Feedback type="invalid">
          This formula is not well-formed
        </Form.Control.Feedback>
      </FloatingLabel>
    </Form>
  );
}

export default GoalInput;
