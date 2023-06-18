import PropTypes from "prop-types";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import parse from "../utils/Parser";

GoalInput.propTypes = {
  setTree: PropTypes.func.isRequired,
};

function GoalInput({ setTree }) {
  const [validated, setValidated] = useState(false);

  function handleTyping(target) {
    // enable validation if the user has typed something
    setValidated(target.value !== "");

    // update the tree
    setTree((tree) => {
      try {
        // if the formula is well-formed, remove the error message
        target.setCustomValidity("");
        return tree.setValue(parse(target.value));
      } catch (e) {
        // if the formula is not well-formed, show the error message
        target.setCustomValidity("This formula is not well-formed");
        return tree.setValue({ type: "hole" });
      }
    });
  }

  return (
    <Form noValidate validated={validated} className="mt-3">
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
