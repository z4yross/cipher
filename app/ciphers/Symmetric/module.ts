import { Caesar } from "./Caesar.js";
import { Playfair } from "./Playfair.js";

export const ciphers = [
	{
		cipherName: "Caesar",
		description: "In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on. The method is named after Julius Caesar, who used it in his private correspondence.",
		type: "Symmetric",
		cipher: Caesar,
		allowedAlphabets: ["Alphanumeric", "ASCII", "Default", "Numbers", "Spanish", "Simple", "SimpleNumbers", "custom"],
	},
	{
		cipherName: "Playfair",
		description: "The Playfair cipher or Playfair square or Wheatstone–Playfair cipher is a manual symmetric encryption technique and was the first literal digram substitution cipher. The scheme was invented in 1854 by Charles Wheatstone, but bears the name of Lord Playfair for promoting its use.",
		type: "Symmetric",
		cipher: Playfair,
		allowedAlphabets: ["Simple", "SimpleNumbers"],
	}
];

export * from "./Caesar.js";
export * from "./Playfair.js";
