import { Result, Token } from "./types";

export const success = (value: Token[], rest: string): Result => ({
  success: true,
  value: value,
  rest,
});
export const failure = (reason: string): Result => ({ success: false, reason });
