import { Alphabet } from "../module.js";

class Simple extends Alphabet {
	constructor() {
		super("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
	}
}

export class SimpleSingleton extends Simple {
	private static instance: SimpleSingleton;

	private constructor() {
		super();
	}

	public static getInstance(): SimpleSingleton {
		if (!SimpleSingleton.instance)
			SimpleSingleton.instance = new SimpleSingleton();

		return SimpleSingleton.instance;
	}
}
