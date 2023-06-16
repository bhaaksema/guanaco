import { v4 } from 'uuid';

import axiomsList from "../data/AxiomsS5EC";
import rulesList from "../data/RulesS5EC";
import shortcuts from "../data/Shortcuts";
import { check, noHoles } from "../utils/Engine";

export class Tree {
  constructor(value, base = 0, validated = false, children = []) {
    this.id = v4();
    this.value = value;
    this.base = base;
    this.baseList = axiomsList
      .filter((axiom) => check(value, axiom, true))
      .concat(
        rulesList.filter((rule) => check(value, rule, false))
      ).concat(
        shortcuts.filter((shortcut) => check(value, shortcut, false))
      );
    this.validated = validated;
    this.children = children;
    this.inputEnabled = this.children.some((child) => !noHoles(child.value));
  }

  toArray() {
    const arr = this.children.map((c) => c.toArray()).flat();
    arr.push(this);
    return arr;
  }

  update(node, base, validated, children) {
    if (this.id === node.id) {
      this.base = base;
      this.validated = validated;
      this.children = children;
    } else {
      this.children = this.children.map(
        (c) => c.update(node, base, validated, children)
      );
    }
    const tree = new Tree(this.value, this.base, this.validated, this.children);
    tree.id = this.id;
    return tree;
  }

  setValue(value) {
    const tree = new Tree(value);
    tree.id = this.id;
    return tree;
  }
}

export function nodeIndex(tree, node) {
  const list = tree.toArray();
  return list.findIndex((n) => n.id === node.id) + 1;
}
