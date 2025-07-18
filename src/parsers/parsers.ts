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

export const choiceN = (parsers: Parser[]): Parser => {
  return (input: string) => {
    for (const parser of parsers) {
      const result = parser(input);
      if (result.success) {
        return result;
      }
    }
    return failure("No parser matched");
  };
};

export const zip = (p1: Parser, p2: Parser): Parser => {
  return (input: string) => {
    const result1 = p1(input);
    if (!result1.success) {
      return failure("First parser failed");
    }

    const result2 = p2(result1.rest);
    if (!result2.success) {
      return failure("Second parser failed");
    }

    return success([...result1.value, ...result2.value], result2.rest);
  };
};

export const parseOperator2 = choice(
  parseCharacter("+", TokenTypes.OPERATOR),
  parseCharacter("-", TokenTypes.OPERATOR)
);

const isEmpty: Parser = (input: string) => {
  if (input == "") return success([], "");
  else return failure("Not an empty string");
};

export function doUntil(parser: Parser): Parser {
  return (input: string) => {
    const emptyResult = isEmpty(input);
    if (emptyResult.success) {
      return emptyResult;
    }

    const result = parser(input);
    if (!result.success) {
      return failure("Parsing failed before reaching end of input");
    }

    const nextResult = doUntil(parser)(result.rest);
    if (!nextResult.success) {
      return failure("Parsing failed during sequence");
    }

    return success([...result.value, ...nextResult.value], nextResult.rest);
  };
}

export function doUntilWithChoice(parser: Parser): Parser {
  return choice(isEmpty, (input) => {
    const step = zip(parser, doUntilWithChoice(parser))(input);

    if (!step.success) {
      return failure(step.reason);
    }

    return success(step.value, step.rest);
  });
}

export const tokenizer = doUntil(
  choiceN([
    parseNumber,
    parseOperator,
    parseOpenParenthesis,
    parseCloseParenthesis,
  ])
);

export const tokenizerWithChoice = doUntilWithChoice(
  choice(
    parseNumber,
    choice(parseOperator, choice(parseOpenParenthesis, parseCloseParenthesis))
  )
);
