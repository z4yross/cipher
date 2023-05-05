import { Alphabet } from "../module.js";

class SimpleNumbers extends Alphabet {
	constructor() {
		super("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
	}
}

export class SimpleNumbersSingleton extends SimpleNumbers {
	private static instance: SimpleNumbersSingleton;

	private constructor() {
		super();
	}

	public static getInstance(): SimpleNumbersSingleton {
		if (!SimpleNumbersSingleton.instance)
			SimpleNumbersSingleton.instance = new SimpleNumbersSingleton();

		return SimpleNumbersSingleton.instance;
	}
}
