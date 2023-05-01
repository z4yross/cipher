import { ASCIISingleton } from "./ASCII.js";
import { AlphanumericSingleton } from "./Alphanumeric.js";
import { CustomAlphabetSingleton } from "./CustomAlphabet.js";
import { DefaultSingleton } from "./Default.js";
import { NumbersSingleton } from "./Numbers.js";
import { SpanishSingleton } from "./Spanish.js";

export const alphabets = {
    "Alphanumeric": AlphanumericSingleton,
    "ASCII": ASCIISingleton,
    "Default": DefaultSingleton,
    "Numbers": NumbersSingleton,
    "Spanish": SpanishSingleton,
    "custom": CustomAlphabetSingleton
};


export * from "./Alphanumeric.js";
export * from "./ASCII.js";
export * from "./Default.js";
export * from "./Numbers.js";
export * from "./Spanish.js";