import { SymmetricCipher } from "../module.js";
import { Alphabet, DefaultSingleton } from "../../module.js";


export class Caesar implements SymmetricCipher {
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
