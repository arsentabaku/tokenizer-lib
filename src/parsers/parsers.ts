import { TokenTypes } from "../enums";
import { success, failure } from "./result";
import { Parser, Token } from "./types";

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

export const parseCharacter = (
  char: string,
  tokenType: Token["type"]
): Parser => {
  return (input: string) => {
    if (input[0] === char) {
      return success([{ type: tokenType, value: input[0] }], input.slice(1));
    }
    return failure(`Expected ${char}`);
  };
};

export const parseOpenParenthesis2 = parseCharacter(
  "(",
  TokenTypes.OPEN_PARENTHESIS
);
export const parseCloseParenthesis2 = parseCharacter(
  ")",
  TokenTypes.CLOSE_PARENTHESIS
);

export const choice = (p1: Parser, p2: Parser): Parser => {
  return (input: string) => {
    const result1 = p1(input);
    const result2 = p2(input);

    return result1.success ? result1 : result2;
  };
};
export const parseOperator2 = choice(
  parseCharacter("+", TokenTypes.OPERATOR),
  parseCharacter("-", TokenTypes.OPERATOR)
);
