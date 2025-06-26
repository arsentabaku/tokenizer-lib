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
