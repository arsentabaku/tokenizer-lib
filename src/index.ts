import {
  parseNumber,
  parseOperator,
  parseOpenParenthesis,
  parseCloseParenthesis,
  parseCharacter,
  parseOpenParenthesis2,
  parseCloseParenthesis2,
  choice,
  parseOperator2,
  choiceN,
  zip,
  doUntil,
  tokenizer,
  Parser,
} from "./parsers";
import { TokenTypes } from "./enums";

function testSection(title: string, parser: Parser, inputs: string[]) {
  console.log(`\n------ ${title.toUpperCase()} ------\n`);

  for (const input of inputs) {
    console.log(parser(input));
  }
}

testSection("Number", parseNumber, ["123", "1 + 2", "+ 2"]);
testSection("Operator", parseOperator, ["+", "1 +", "- 2"]);
testSection("Open Parenthesis", parseOpenParenthesis, ["(", "+ (", ")"]);
testSection("Close Parenthesis", parseCloseParenthesis, [")", "+ )", "()"]);

const parseOpenPar = parseCharacter("(", TokenTypes.OPEN_PARENTHESIS);
testSection("Character", parseOpenPar, ["(2+3", "2+3"]);

testSection("Operator 2", parseOperator2, ["+42", "-42", "*42"]);
testSection("Open Parenthesis 2", parseOpenParenthesis2, ["(2+3", "2+3"]);
testSection("Close Parenthesis 2", parseCloseParenthesis2, [")2+3", "(2+3"]);
testSection("Choice", choice(parseNumber, parseOperator), ["1+2", "+2", "(+"]);

const parseAnyToken = choiceN([
  parseNumber,
  parseOperator,
  parseOpenParenthesis,
]);
testSection("Choice N", parseAnyToken, ["1 + 2", ")1 + 2("]);

const parseNumberAndOperator = zip(parseNumber, parseOperator);
testSection("Zip", parseNumberAndOperator, ["1+", "+1", "1+2+3"]);

testSection("Do Until", doUntil(choiceN([parseNumber, parseOperator])), [
  "1+2",
  "1+(",
]);
testSection("Tokenizer (Full)", tokenizer, ["1+(2-3)", "1+&3", "1+2a"]);
