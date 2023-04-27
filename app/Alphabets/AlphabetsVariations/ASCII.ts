import { Alphabet } from "../module.js";

class ASCII extends Alphabet {
	constructor() {
		const alphabet = [];
		for (let i = 32; i < 256; i++) alphabet.push(String.fromCharCode(i));

        super(alphabet.join(""));
	}
}

export class ASCIISingleton extends ASCII {
	private static instance: ASCIISingleton;

	private constructor() {
		super();
	}

	public static getInstance(): ASCIISingleton {
		if (!ASCIISingleton.instance)
			ASCIISingleton.instance = new ASCIISingleton();

		return ASCIISingleton.instance;
	}
}
