"use strict";

/**
 * Generating syntax diagrams html file.
 * See: https://github.com/chevrotain/chevrotain/tree/master/diagrams for more details
 *
 * usage:
 * - npm install in the parent directory (parser) to install dependencies
 * - Run this file in node.js (node Diagram.js)
 */
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createSyntaxDiagramsCode } from "chevrotain";
import { parser } from "./Parser.js";

// extract the serialized grammar.
const serializedGrammar = parser.getSerializedGastProductions();

// create the HTML Text
const htmlText = createSyntaxDiagramsCode(serializedGrammar);

// Write the HTML file to disk
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, "./");
fs.writeFileSync(outPath + "/generated_diagrams.html", htmlText);
