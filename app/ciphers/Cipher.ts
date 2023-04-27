import { Alphabet } from "../module.js";

export interface SymmetricCipher {
    alphabet: Alphabet;
    secret: string;
    encrypt: (text: string) => string;
    decrypt: (text: string) => string;
}

export interface AsymmetricCipher {
    alphabet: Alphabet;
    publicKey: string;
    privateKey: string;
    encrypt: (text: string) => string;
    decrypt: (text: string) => string;
}