import { Alphabet } from "../module.js";

class Binary extends Alphabet {
	constructor() {
		super("01");
	}
}

export class BinarySingleton extends Binary {
	private static instance: BinarySingleton;

	private constructor() {
		super();
	}

	public static getInstance(): BinarySingleton {
		if (!BinarySingleton.instance)
        BinarySingleton.instance = new BinarySingleton();

		return BinarySingleton.instance;
	}
}
