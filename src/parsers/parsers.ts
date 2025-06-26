import { TokenTypes } from "../enums";

export type Token = {
  type: TokenTypes;
  value: string;
};

export type Success = {
  success: true;
  value: Token[];
  rest: string;
};

export type Failure = {
  success: false;
  reason: string;
};

export type Result = Success | Failure;
export const success = (value: Token[], rest: string): Result => ({
  success: true,
  value: value,
  rest,
});
export const failure = (reason: string): Result => ({ success: false, reason });
export type Parser = (input: string) => Result;

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
