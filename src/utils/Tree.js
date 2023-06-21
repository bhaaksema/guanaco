import { v4 } from "uuid";
import { noHoles } from "./Formula";

/**
 * Class representing a proof tree
 * @class
 * @property {string} id - The id of the tree
 * @property {Object} formula - The formula of the tree
 * @property {string} rule - The justification rule
 * @property {boolean} validated - Whether the justification is validated
 * @property {Array} children - The children of the tree node
 * @property {boolean} inputEnabled - Whether the input is enabled
 * @method setFormula - Sets the formula of the tree
 * @method toArray - Returns the tree as an array
 * @method copy - Returns a copy of the tree
 * @method update - Updates the tree
 * @function nodeIndex - Returns the index of a node in the tree
 */
export class Tree {
  constructor(formula, rule = 0, validated = false, children = []) {
    this.id = v4();
    this.formula = formula;
    this.rule = rule;
    this.validated = validated;
    this.children = children;
    this.inputEnabled = this.children.some((child) => !noHoles(child.formula));
  }

  /**
   * Sets the formula of the tree
   * @param {Object} formula - The formula to set
   * @returns {Tree} - The tree with the new formula
   */
  setFormula(formula) {
    const root = new Tree(formula);
    root.id = this.id;
    return root;
  }

  /**
   * Returns the tree as an array
   * @returns {Array}
   */
  toArray() {
    const arr = this.children.map((c) => c.toArray()).flat();
    arr.push(this);
    return arr;
  }

  /**
   * Returns a copy of the tree
   * @returns {Tree}
   */
  copy() {
    const tree = new Tree(
      this.formula,
      this.rule,
      this.validated,
      this.children
    );
    tree.id = this.id;
    return tree;
  }

  /**
   * Updates the tree
   * @param {Tree} node - The node to update
   * @param {string} rule - The justification rule
   * @param {boolean} validated - Whether the justification is validated
   * @param {Array} children - The children of the tree node
   * @returns {Tree} - The updated tree
   */
  update(node, rule, validated, children) {
    if (this.id === node.id) {
      this.rule = rule;
      this.validated = validated;
      this.children = children;
    } else {
      this.children = this.children.map((c) =>
        c.update(node, rule, validated, children)
      );
    }
    return this.copy();
  }
}

/**
 * Returns the index of a node in the tree
 * @param {Tree} root - The root of the tree
 * @param {Tree} node - The node to find
 * @returns {number} - The index of the node
 */
export function nodeIndex(root, node) {
  const list = root.toArray();
  return list.findIndex((n) => n.id === node.id) + 1;
}
