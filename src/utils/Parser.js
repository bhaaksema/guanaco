import { EmbeddedActionsParser } from "chevrotain";
import { tokens, lex } from "./Lexer.js";
import { agents, contains } from "./Formula.js";

/**
 * A parser for Epistemic Logic formulas.
 * @see {@link https://chevrotain.io/docs/tutorial/step3b_adding_actions_embedded.html}
 * @see {@link https://chevrotain.io/docs/features/backtracking.html}
 */
class FormulaParser extends EmbeddedActionsParser {
  // prettier-ignore
  constructor() {
    super(tokens);

    // formula ::= binary | unary | atom
    this.RULE("formula", () => {
      return this.OR([
        {
          GATE: this.BACKTRACK(this.binary),
          ALT: () => { return this.SUBRULE(this.binary); },
        },
        { ALT: () => { return this.SUBRULE(this.unary); }, },
        { ALT: () => { return this.SUBRULE(this.atom); }, },
      ]);
    });

    // subformula ::= ( binary ) | unary | atom
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

    // unary ::= ( ! | K agent subformula | E | C | [ subformula ] ) subformula
    this.RULE("unary", () => {
      let left, agent;
      const type = this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.Not);
            return "negation";
          },
        },
        {
          ALT: () => {
            const type = this.CONSUME(tokens.K).tokenType.name;
            const agentImage = this.CONSUME(tokens.Agent).image;
            const agentVal = parseInt(agentImage, 10);
            agent = isNaN(agentVal) ? agentImage : agentVal;
            return type;
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
      if (type === "K") return { type: type, agent: agent, value: right };
      if (type === "announcement") return { type, left, right };
      return { type: type, value: right };
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
            const value = this.CONSUME(tokens.Variable).image;
            return { type: "variable", value: value };
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
export function parse(inputText, system) {
  // Set parser input to the tokenized inputText
  try {
    parser.input = lex(inputText).tokens;
  } catch (e) {
    throw Error(e.message);
  }

  // Invoke the parser
  const ast = parser.formula();

  // Throw an error if there are any parsing errors
  if (parser.errors.length > 0) throw Error("This formula is not well-formed");

  // Throw an error if the formula is not in the language of the system
  if (!system.name.includes("C")) {
    if (contains(ast, "E"))
      throw Error(
        `The language of ${system.name} does not contain the operator E`
      );
    if (contains(ast, "C"))
      throw Error(
        `The language of ${system.name} does not contain the operator C`
      );
  }
  if (!system.name.includes("PA")) {
    if (contains(ast, "announcement"))
      throw Error(
        `The language of ${system.name} does not contain the announcement operator`
      );
  }
  if (
    !isNaN(system.agents) &&
    agents(ast).some((agent) => isNaN(agent) || agent > system.agents)
  ) {
    throw Error(
      `This formula contains an agent that is not in system ${system.name}(${system.agents})`
    );
  }

  // Otherwise, return the AST
  return ast;
}
