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
} from "./parsers";
import { TokenTypes } from "./enums";

console.log("\n--- PARSE NUMBER ---\n");
console.log(parseNumber("123"));
console.log(parseNumber("1 + 2"));
console.log(parseNumber("+ 2"));

console.log("\n--- PARSE OPERATOR ---\n");
console.log(parseOperator("+"));
console.log(parseOperator("1 +"));
console.log(parseOperator("- 2"));

console.log("\n--- PARSE OPEN PARENTHESIS ---\n");
console.log(parseOpenParenthesis("("));
console.log(parseOpenParenthesis("+ ("));
console.log(parseOpenParenthesis(")"));

console.log("\n--- PARSE CLOSE PARENTHESIS ---\n");
console.log(parseCloseParenthesis(")"));
console.log(parseCloseParenthesis("+ )"));
console.log(parseCloseParenthesis("()"));

console.log("\n--- CHOICE ---\n");
console.log(choice(parseNumber, parseOperator)("1+2"));
console.log(choice(parseNumber, parseOperator)("+2"));
console.log(choice(parseNumber, parseOperator)("*2"));

console.log("\n--- PARSE OPEN PARENTHESIS (FUNCTIONAL) ---\n");
const parseOpenPar = parseCharacter("(", TokenTypes.OPEN_PARENTHESIS);
console.log(parseOpenPar("(2+3"));
console.log(parseOpenPar("2+3"));

console.log("\n--- PARSE OPEN PARENTHESIS 2 (FUNCTIONAL) ---\n");
console.log(parseOpenParenthesis2("(2+3"));
console.log(parseOpenParenthesis2("2+3"));
console.log(parseCloseParenthesis2(")2+3"));
console.log(parseCloseParenthesis2("(2+3"));

console.log("\n--- PARSE OPERATOR 2 (FUNCTIONAL) ---\n");
console.log(parseOperator2("+42"));
console.log(parseOperator2("-42"));
console.log(parseOperator2("*42"));
