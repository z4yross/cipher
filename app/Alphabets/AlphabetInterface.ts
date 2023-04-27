export interface Alphabet {
	getAlphabet: () => string;
	getLetter: (index: number) => string;
	getIndex: (letter: string) => number;
	getLength: () => number;
	indexString: (text: string) => number[];
	letterString: (text: number[]) => string;
	indexAllLetters: () => [number, string][];
}
