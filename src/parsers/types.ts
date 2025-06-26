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
export type Parser = (input: string) => Result;
