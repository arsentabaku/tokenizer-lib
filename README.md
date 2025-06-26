# Functional Tokenizer

A simple recursive tokenizer written in TypeScript using functional programming principles. It parses arithmetic expressions (e.g. `1+(2-3)`) into structured tokens — without mutation or regular parsing libraries.

---

## What This Project Demonstrates

- **Recursive token parsing** — breaking down input character-by-character into `NUMBER`, `OPERATOR`, `OPEN_PARENTHESIS`, and `CLOSE_PARENTHESIS`
- **Composable parser combinators** — using `choice`, `choiceN`, `zip`, and `doUntil` to build complex parsers from simple ones
- **Higher-order abstractions** — like `parseCharacter` to eliminate redundancy
- **Clean separation of concerns** — token logic, result types, and test structure kept modular and functional

---

## 🚀 How to Run

1. Install dependencies: **npm install**
2. Compile and run: **npm run build**
3. Output is printed via index.ts
