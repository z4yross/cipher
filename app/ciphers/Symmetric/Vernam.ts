import { SymmetricCipher } from "../module.js";
import { Alphabet, DefaultSingleton } from "../../module.js";

export class Vernam implements SymmetricCipher {
	alphabet: Alphabet;
	secret: string;
	binary: boolean;

	constructor(
		secret: string,
		binary: boolean = true,
		alphabet: Alphabet = DefaultSingleton.getInstance(),
		addjustBitsOnKey: boolean = false
	) {
		this.alphabet = alphabet;
		this.secret = secret;

		if (alphabet) this.alphabet = alphabet;

		this.binary = binary;
		if (!binary)
			this.secret = this.textToBinaryAlphabet(secret, addjustBitsOnKey);
	}

	modulus(A: number, C: number): number {
		if (A >= 0) return A % C;
		else return C + (A % C);
	}

	dec2bin(dec: number) {
		return (dec >>> 0).toString(2);
	}

	bin2dec(bin: string) {
		return parseInt(bin, 2);
	}

	bitsInAlphabet(): number {
		return Math.ceil(Math.log2(this.alphabet.getLength()));
	}

	textToBinary(text: string): string {
		let binary = "";
		for (let i = 0; i < text.length; i++) {
			const charCode = text.charCodeAt(i);
			const binaryCode = charCode.toString(2);
			binary += binaryCode.padStart(8, "0");
		}
		return binary;
	}

	binaryToText(binary: string): string {
		let text = "";
		for (let i = 0; i < binary.length; i += 8) {
			const binaryCode = binary.substring(i, i + 8);
			const charCode = parseInt(binaryCode, 2);
			const char = String.fromCharCode(charCode);
			text += char;
		}
		return text;
	}

	textToBinaryAlphabet(text: string, adjustBits = false): string {
		const bitsInAlphabet = adjustBits ? this.bitsInAlphabet() : 8;
		const wordIndexes = this.alphabet.indexString(text);

		const binary = wordIndexes.map((index) => {
			return this.dec2bin(index).padStart(bitsInAlphabet, "0");
		});

		return binary.join("");
	}

	binaryToTextAlphabet(binary: string, adjustBits = false): string {
		const bitsInAlphabet = adjustBits ? this.bitsInAlphabet() : 8;
		const wordIndexes = [];

		for (let i = 0; i < binary.length; i += bitsInAlphabet) {
			const binaryCode = binary.substring(i, i + bitsInAlphabet);
			const index = this.bin2dec(binaryCode);
			wordIndexes.push(this.modulus(index, this.alphabet.getLength()));
		}

		const text = this.alphabet.letterString(wordIndexes);

		return text;
	}

	encryptText(text: string): string {
		try {
			const wordIndexes = this.alphabet.indexString(text);
			const keyIndexes = this.alphabet.indexString(this.secret);

			const res = wordIndexes.map((index, i) => {
				const key_index = keyIndexes[i];
				const r = index ^ key_index;
				return this.modulus(r, this.alphabet.getLength());
			});

			return this.alphabet.letterString(res);
		} catch (error) {
			throw error;
		}
	}

	decryptText(text: string): string {
		try {
			return this.encryptText(text);
		} catch (error) {
			throw error;
		}
	}

	encrypt(text: string): string {
		try {
			const n = text.length;
			const m = this.secret.length;

			const word_indexes = text.split("").map((char) => Number(char));
			const key_indexes = this.secret
				.split("")
				.map((char) => Number(char));

			// bit-wise XOR
			const res = word_indexes.map((index, i) => {
				const key_index = key_indexes[i];
				const r = index ^ key_index;
				return this.modulus(r, this.alphabet.getLength());
			});

			return res.join("");
		} catch (error) {
			throw error;
		}
	}

	decrypt(text: string): string {
		try {
			return this.encrypt(text);
		} catch (error) {
			throw error;
		}
	}
}
