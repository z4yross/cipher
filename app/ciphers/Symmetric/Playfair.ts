import { SymmetricCipher } from "../module.js";
import { Alphabet, SimpleSingleton } from "../../module.js";

export class Playfair implements SymmetricCipher {
	alphabet: Alphabet;
	secret: string;
	forward: boolean;

	private grid: string[][];
	private diagrams: string[][];

	private EMPTY_LETTER = "X";
    private GRID_SIZE: number;
	private letterMap: Map<string, [number, number]>;

	constructor(
		secret: string,
		forward: boolean = true,
		alphabet: Alphabet = SimpleSingleton.getInstance()
	) {
		this.alphabet = alphabet;
		this.secret = secret;

		if (alphabet) this.alphabet = alphabet;
        
        // the grid size must be the square root of the alphabet length floored
        this.GRID_SIZE = Math.floor(Math.sqrt(this.alphabet.getLength()));       

		this.forward = forward;
		this.grid = this.createGrid(secret);
	}

	private createGrid(secret: string): string[][] {
		const plainGrid = this.createPlainGrid(secret);
		const grid = [];

		let currentX = 0;
		let currentY = 0;

		plainGrid.forEach((letter) => {
			if (currentY > this.GRID_SIZE - 1) return;
			if (!grid[currentY]) grid[currentY] = [];
			grid[currentY][currentX] = letter;

            if (!this.letterMap) this.letterMap = new Map<string, [number, number]>();
			this.letterMap.set(letter, [currentX, currentY]);

			currentX++;
			if (currentX > this.GRID_SIZE - 1) {
				currentX = 0;
				currentY++;
			}
		});

		return grid;
	}

	private createPlainGrid(secret: string): string[] {
		const plainGrid = [];

		for (let i = 0; i < secret.length; i++) {
			const letter = secret[i] == "J" ? "I" : secret[i];
			if (!this.checkIfLetterInAlphabet(letter)) continue;
			if (plainGrid.includes(letter)) continue;
			plainGrid.push(letter);
		}

		if (plainGrid.length >= this.GRID_SIZE * this.GRID_SIZE) return plainGrid;

		for (let i = 0; i < this.alphabet.getAlphabet().length; i++) {
			const currentAlphabetLetter = this.alphabet.getLetter(i);
			const letter =
				currentAlphabetLetter == "J" ? "I" : currentAlphabetLetter;
			if (!this.checkIfLetterInAlphabet(letter)) continue;
			if (plainGrid.includes(letter)) continue;
			plainGrid.push(letter);
		}

		return plainGrid;
	}

	checkIfLetterInAlphabet(letter: string): boolean {
		if (this.alphabet.getIndex(letter) === -1) return false;
		return true;
	}

	createDiagrams(text: string): string[][] {
		const diagrams = [];
		let currentX = 0;

		for (let i = 0; i < text.length; i++) {
			const letter = text[i];
			if (!diagrams[currentX]) diagrams[currentX] = [];
			if (
				diagrams[currentX].length === 1 &&
				letter === diagrams[currentX][0]
			) {
				diagrams[currentX].push(this.EMPTY_LETTER);
				continue;
			}

			diagrams[currentX].push(letter);

			if (diagrams[currentX].length >= 2) {
				currentX++;
			}
		}

		if (diagrams[diagrams.length - 1].length === 1) {
			diagrams[diagrams.length - 1].push(this.EMPTY_LETTER);
		}

		return diagrams;
	}

    shifLeft(diagram: string[]): string[] {
        const result = [];
        let index0 = (this.letterMap.get(diagram[0])[0] - 1) % this.grid.length;
        let index1 = (this.letterMap.get(diagram[1])[0] - 1) % this.grid.length;

        if (index0 < 0) index0 = this.grid.length + index0;
        if (index1 < 0) index1 = this.grid.length + index1;

        result[0] = this.grid[this.letterMap.get(diagram[0])[1]][index0];
        result[1] = this.grid[this.letterMap.get(diagram[1])[1]][index1];
        return result;
    }

	ShiftRight(diagram: string[]): string[] {
		const result = [];
        const index0 = (this.letterMap.get(diagram[0])[0] + 1) % this.grid.length;
        const index1 = (this.letterMap.get(diagram[1])[0] + 1) % this.grid.length;

        result[0] = this.grid[this.letterMap.get(diagram[0])[1]][index0];
        result[1] = this.grid[this.letterMap.get(diagram[1])[1]][index1];
        return result;
	}

    shiftUp(diagram: string[]): string[] {
        const result = [];
        let index0 = (this.letterMap.get(diagram[0])[1] - 1) % this.grid.length;
        let index1 = (this.letterMap.get(diagram[1])[1] - 1) % this.grid.length;

        if (index0 < 0) index0 = this.grid.length + index0;
        if (index1 < 0) index1 = this.grid.length + index1;

        result[0] = this.grid[index0][this.letterMap.get(diagram[0])[0]];
        result[1] = this.grid[index1][this.letterMap.get(diagram[1])[0]];
        return result;
    }

	shitftDown(diagram: string[]): string[] {
        const result = [];
        let index0 = (this.letterMap.get(diagram[0])[1] + 1) % this.grid.length;
        let index1 = (this.letterMap.get(diagram[1])[1] + 1) % this.grid.length;

        result[0] = this.grid[index0][this.letterMap.get(diagram[0])[0]];
        result[1] = this.grid[index1][this.letterMap.get(diagram[1])[0]];
        return result;
    }

	shiftRectangle(diagram: string[]): string[] {
        const result = [];
        const index0 = this.letterMap.get(diagram[0]);
        const index1 = this.letterMap.get(diagram[1]);

        const index2 = [index0[0], index1[1]];
        const index3 = [index1[0], index0[1]];
        
        result[1] = this.grid[index2[1]][index2[0]];
        result[0] = this.grid[index3[1]][index3[0]];
        return result;
    }

	encrypt(text: string): string {
		try {
			const diagrams = this.createDiagrams(text);
            const resultDiagrams = diagrams.map((diagram) => {

                if (this.letterMap.get(diagram[0])[0] === this.letterMap.get(diagram[1])[0]) {
                    return this.shitftDown(diagram);
                }

                if (this.letterMap.get(diagram[0])[1] === this.letterMap.get(diagram[1])[1]) {
                    return this.ShiftRight(diagram);
                }

                return this.shiftRectangle(diagram);
            });

            const result = resultDiagrams.map((diagram) => {
                return diagram.join("");
            }).join("").replace(/X/g, "");

            return result;
		} catch (error) {
			throw error;
		}
	}

	decrypt(text: string): string {
		try {
			const diagrams = this.createDiagrams(text);
            const resultDiagrams = diagrams.map((diagram) => {
                if (this.letterMap.get(diagram[0])[0] === this.letterMap.get(diagram[1])[0]) {
                    return this.shiftUp(diagram);
                }

                if (this.letterMap.get(diagram[0])[1] === this.letterMap.get(diagram[1])[1]) {
                    return this.shifLeft(diagram);
                }

                return this.shiftRectangle(diagram);
            });

            const result = resultDiagrams.map((diagram) => {
                return diagram.join("");
            }).join("").replace(/X/g, "");

            return result;
		} catch (error) {
			throw error;
		}
	}
}
