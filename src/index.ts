import { parseNumber } from "./parsers";

console.log("\n--- PARSE NUMBER ---\n");
console.log(parseNumber("123"));
console.log(parseNumber("1 + 2"));
console.log(parseNumber("+ 2"));
