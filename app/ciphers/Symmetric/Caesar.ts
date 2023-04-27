import { SymmetricCipher } from "../module.js";
import { Alphabet, DefaultSingleton } from "../../module.js";

const caesarDescription =
	"In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on. The method is named after Julius Caesar, who used it in his private correspondence.";

export class Caesar implements SymmetricCipher {
	static cipherName: string = "Caesar";
	static description: string = caesarDescription;
	static type: string = "Symmetric";

	alphabet: Alphabet;
	secret: string;
	forward: boolean;

	constructor(
		secret: string,
		alphabet: Alphabet = DefaultSingleton.getInstance(),
		forward: boolean = true
	) {
		this.alphabet = alphabet;

		if (isNaN(+secret)) throw new Error("Secret must be a number");

		this.secret = secret;
		if (alphabet) this.alphabet = alphabet;

		this.forward = forward;
	}

	encrypt(text: string): string {
		try {
			const shift = +this.secret;

			const indexes = this.alphabet.indexString(text);
			const resultNumbers = indexes.map((index) => {
				if (this.forward) index += shift;
				else index -= shift;
				index %= this.alphabet.getLength();
				return index;
			});

			const result = this.alphabet.letterString(resultNumbers);
			return result;
		} catch (error) {
			throw error;
		}
	}

	decrypt(text: string): string {
		try {
			const shift = +this.secret;

			const indexes = this.alphabet.indexString(text);
			const resultNumbers = indexes.map((index) => {
				if (this.forward) index -= shift;
				else index += shift;
				index -= shift;
				index %= this.alphabet.getLength();
				if (index < 0) index += this.alphabet.getLength();
				return index;
			});

			const result = this.alphabet.letterString(resultNumbers);
			return result;
		} catch (error) {
			throw error;
		}
	}
}
