import { SymmetricCipher } from "../module.js";
import { Alphabet, DefaultSingleton } from "../../module.js";

export class Vigenere implements SymmetricCipher {
	alphabet: Alphabet;
	secret: string;
	forward: boolean;

	constructor(
		secret: string,
		forward: boolean = true,
		alphabet: Alphabet = DefaultSingleton.getInstance()
	) {
		this.alphabet = alphabet;
		this.secret = secret;

		if (alphabet) this.alphabet = alphabet;

		this.forward = forward;
	}

	modulus(A: number, C: number): number {
		if (A >= 0) return A % C;
		else return C + (A % C);
	}

	encrypt(text: string): string {
		try {
			const n = text.length;
			const m = this.secret.length;

			const word_indexes = this.alphabet.indexString(text);
			const key_indexes = this.alphabet.indexString(this.secret);

			// if (n < m)
			// 	throw new Error("Key length must be less than word length");

			const res = word_indexes.map((index, i) => {
				const key_index = key_indexes[i % m];
				return this.modulus(
					index + key_index,
					this.alphabet.getLength()
				);
			});

			return this.alphabet.letterString(res);
		} catch (error) {
			throw error;
		}
	}

	decrypt(text: string): string {
		try {
			const n = text.length;
			const m = this.secret.length;

			const word_indexes = this.alphabet.indexString(text);
			const key_indexes = this.alphabet.indexString(this.secret);

			// if (n < m)
			// 	throw new Error("Key length must be less than word length");

			const res = word_indexes.map((index, i) => {
				const key_index = key_indexes[i % m];
				return this.modulus(
					index - key_index,
					this.alphabet.getLength()
				);
			});

			return this.alphabet.letterString(res);
		} catch (error) {
			throw error;
		}
	}
}
