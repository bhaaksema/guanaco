import equal from "fast-deep-equal";
import { getItems } from "./Formula";

/**
 * Checks if a formula is a tautology.
 * @param {Object} formula - The formula to check.
 * @param {Array} todo - The items with unknown truth values.
 * @param {Array} done - The items with known truth values.
 * @param {Array} values - The truth values of the items.
 * @returns {boolean} - True if the formula is a tautology, false otherwise.
 * @throws {Error} - If the formula type is invalid.
 */
function tautology(formula, todo = getItems(formula), done = [], values = []) {
  if (todo.length === 0) return evaluate(formula, done, values);
  return (
    tautology(
      formula,
      todo.slice(1),
      done.concat([todo[0]]),
      values.concat([true])
    ) &&
    tautology(
      formula,
      todo.slice(1),
      done.concat([todo[0]]),
      values.concat([false])
    )
  );
}

/**
 * Evaluates a formula.
 * @param {Object} formula - The formula to evaluate.
 * @param {Array} keys - The formula's items.
 * @param {Array} values - The truth values of the formula's items.
 * @returns {Boolean} - The truth value of the formula.
 * @throws {Error} - If the formula type is invalid.
 */
function evaluate(formula, keys, values) {
  if (
    formula.type === "conjunction" ||
    formula.type === "disjunction" ||
    formula.type === "implication" ||
    formula.type === "equivalence"
  ) {
    const left = evaluate(formula.left, keys, values);
    const right = evaluate(formula.right, keys, values);
    if (formula.type === "conjunction") return left && right;
    if (formula.type === "disjunction") return left || right;
    if (formula.type === "implication") return !left || right;
    if (formula.type === "equivalence") return left === right;
  }

  if (formula.type === "negation")
    return !evaluate(formula.value, keys, values);
  if (formula.type === "top") return true;
  if (formula.type === "bottom") return false;
  if (formula.type === "hole") throw new Error("Invalid formula: " + formula);
  return values[keys.findIndex((key) => equal(key, formula))];
}

export default tautology;
