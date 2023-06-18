import { v4 } from "uuid";

import systemPA from "../data/SystemPA";
import { check, noHoles } from "../utils/Engine";

export class Tree {
  constructor(formula, rule = 0, validated = false, children = []) {
    this.id = v4();
    this.formula = formula;
    this.rule = rule;
    this.ruleList = systemPA.filter((rule) => check(formula, rule));
    this.validated = validated;
    this.children = children;
    this.inputEnabled = this.children.some((child) => !noHoles(child.formula));
  }

  toArray() {
    const arr = this.children.map((c) => c.toArray()).flat();
    arr.push(this);
    return arr;
  }

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
    const root = new Tree(this.formula, this.rule, this.validated, this.children);
    root.id = this.id;
    return root;
  }

  setValue(formula) {
    const root = new Tree(formula);
    root.id = this.id;
    return root;
  }
}

export function nodeIndex(root, node) {
  const list = root.toArray();
  return list.findIndex((n) => n.id === node.id) + 1;
}
