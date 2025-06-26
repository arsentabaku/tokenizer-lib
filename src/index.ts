import {
  parseNumber,
  parseOperator,
  parseOpenParenthesis,
  parseCloseParenthesis,
} from "./parsers";

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
