import { EmbeddedActionsParser } from "chevrotain";
import { tokens, lex } from "./Lexer.js";

/**
 * A parser for Epistemic Logic formulas.
 * @see {@link https://chevrotain.io/docs/tutorial/step3b_adding_actions_embedded.html}
 * @see {@link https://chevrotain.io/docs/features/backtracking.html}
 */
class FormulaParser extends EmbeddedActionsParser {
  // prettier-ignore
  constructor() {
    super(tokens);

    // formula ::= binary | unary | knowledge | atom
    this.RULE("formula", () => {
      return this.OR([
        {
          GATE: this.BACKTRACK(this.binary),
          ALT: () => { return this.SUBRULE(this.binary); },
        },
        { ALT: () => { return this.SUBRULE(this.unary); }, },
        { ALT: () => { return this.SUBRULE(this.knowledge); }, },
        { ALT: () => { return this.SUBRULE(this.atom); }, },
      ]);
    });

    // subformula ::= ( binary ) | unary | knowledge | atom
    this.RULE("subformula", () => {
      return this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.LPar);
            let formula = this.SUBRULE(this.binary);
            this.CONSUME(tokens.RPar);
            return formula;
          },
        },
        { ALT: () => { return this.SUBRULE(this.unary); }, },
        { ALT: () => { return this.SUBRULE(this.knowledge); }, },
        { ALT: () => { return this.SUBRULE(this.atom); }, },
      ]);
    });

    // binary ::= subformula ( & | \| | -> | <-> ) subformula
    this.RULE("binary", () => {
      const left = this.SUBRULE(this.subformula);
      const type = this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.And);
            return "conjunction";
          },
        },
        {
          ALT: () => {
            this.CONSUME(tokens.Or);
            return "disjunction";
          },
        },
        {
          ALT: () => {
            this.CONSUME(tokens.To);
            return "implication";
          },
        },
        {
          ALT: () => {
            this.CONSUME(tokens.Equiv);
            return "equivalence";
          },
        },
      ]);

      const right = this.SUBRULE1(this.subformula);
      return { type, left, right };
    });

    // unary ::= ( ! | E | C | [ subformula ] ) subformula
    this.RULE("unary", () => {
      let left;
      const type = this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.Not);
            return "negation";
          },
        },
        { ALT: () => { return this.CONSUME(tokens.E).tokenType.name; }, },
        { ALT: () => { return this.CONSUME(tokens.C).tokenType.name; }, },
        {
          ALT: () => {
            this.CONSUME(tokens.LSay);
            left = this.SUBRULE(this.subformula);
            this.CONSUME(tokens.RSay);
            return "announcement";
          },
        },
      ]);

      const right = this.SUBRULE1(this.subformula);
      if (type === "announcement") return { type, left, right };
      return { type: type, value: right };
    });

    // knowledge ::= K agent subformula
    this.RULE("knowledge", () => {
      this.CONSUME(tokens.K);
      const agentImage = this.CONSUME(tokens.Agent).image;
      const agentVal = parseInt(agentImage, 10);
      const agent = isNaN(agentVal) ? agentImage : agentVal;
      const value = this.SUBRULE(this.subformula);
      return { type: "K", agent, value };
    });

    // atom ::= proposition | variable | top | bottom
    this.RULE("atom", () => {
      return this.OR([
        {
          ALT: () => {
            const value = this.CONSUME(tokens.Proposition).image;
            return { type: "proposition", value: value };
          },
        },
        {
          ALT: () => {
            const value = this.CONSUME(tokens.Formula).image;
            return { type: "formula", value: value };
          },
        },
        {
          ALT: () => {
            this.CONSUME(tokens.Top);
            return { type: "top" };
          },
        },
        {
          ALT: () => {
            this.CONSUME(tokens.Bottom);
            return { type: "bottom" };
          },
        },
      ]);
    });

    this.performSelfAnalysis();
  }
}

/** Constant reuseable parser instance */
export const parser = new FormulaParser();

/**
 * Parses the input text.
 * @param {string} inputText - The input text.
 * @returns {Object} - The Abstract Syntax Tree.
 * @throws {Error} - If there are any parsing errors.
 * @see {@link https://chevrotain.io/docs/tutorial/step2_parsing.html}
 */
export function parse(inputText) {
  // Set parser input to the tokenized inputText
  parser.input = lex(inputText).tokens;

  // Invoke the parser
  const ast = parser.formula();

  // Throw an error if there are any parsing errors
  if (parser.errors.length > 0) {
    throw Error("Parsing errors detected!" + parser.errors[0].message);
  }

  // Otherwise, return the AST
  return ast;
}
