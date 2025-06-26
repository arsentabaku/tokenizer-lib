import { TokenTypes } from "../enums";
import { success, failure } from "./result";
import { Parser } from "./types";

export const parseNumber: Parser = (input: string) => {
  const match = /^\d+/.exec(input);

  if (match) {
    return success(
      [{ type: TokenTypes.NUMBER, value: match[0] }],
      input.slice(match[0].length)
    );
  }

  return failure("Not a number");
};

export const parseOperator: Parser = (input: string) => {
  const firstChar = input[0];

  if (firstChar === "+" || firstChar === "-") {
    return success(
      [{ type: TokenTypes.OPERATOR, value: firstChar }],
      input.slice(1)
    );
  }

  return failure("Expected '+ or -'");
};

export const parseOpenParenthesis: Parser = (input: string) => {
  const firstChar = input[0];

  if (firstChar === "(") {
    return success(
      [{ type: TokenTypes.OPEN_PARENTHESIS, value: firstChar }],
      input.slice(1)
    );
  }

  return failure("Expected '('");
};

export const parseCloseParenthesis: Parser = (input: string) => {
  const firstChar = input[0];

  if (firstChar === ")") {
    return success(
      [{ type: TokenTypes.CLOSE_PARENTHESIS, value: firstChar }],
      input.slice(1)
    );
  }

  return failure("Expected ')'");
};
