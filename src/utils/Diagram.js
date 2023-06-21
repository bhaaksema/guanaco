"use strict";

/**
 * Generating syntax diagrams html file.
 * See: https://github.com/chevrotain/chevrotain/tree/master/diagrams for more details
 *
 * usage:
 * - npm install in the parent directory (parser) to install dependencies
 * - Run this in file in node.js (node gen_diagrams.js)
 */
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import chevrotain from "chevrotain";
import { parser } from "./Parser.js";

// extract the serialized grammar.
const serializedGrammar = parser.getSerializedGastProductions();

// create the HTML Text
const htmlText = chevrotain.createSyntaxDiagramsCode(serializedGrammar);

// Write the HTML file to disk
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, "./");
fs.writeFileSync(outPath + "/generated_diagrams.html", htmlText);
