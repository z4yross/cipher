import { AlphabetInterface } from "./module.js";

export class Alphabet implements AlphabetInterface.Alphabet {
	constructor(private alphabet: string) {}

	getAlphabet(): string {
		return this.alphabet;
	}

	getLetter(index: number): string {
		if (index < 0 || index >= this.alphabet.length)
			throw new Error(`Index out of bounds. ${index}`);

		return this.alphabet[index];
	}

	getIndex(letter: string): number {
		const index = this.alphabet.indexOf(letter);
		if (index === -1) throw new Error(`Letter not found in alphabet. ${letter}`);
		return index;
	}

	getLength(): number {
		return this.alphabet.length;
	}

	indexString(text: string): number[] {
		try {
			const idexes = text
				.split("")
				.map((letter) => this.getIndex(letter));

			return idexes;
		} catch (error) {
			throw error;
		}
	}

	letterString(text: number[]): string {
		try {
            const str = text.map((index) => this.getLetter(index)).join("");
            return str;
        } catch (error) {
            throw error;
        }

	}

	indexAllLetters(): [number, string][] {
		return this.alphabet.split("").map((letter, index) => [index, letter]);
	}
}
