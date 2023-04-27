import { Alphabet } from "../module.js";

class Numbers extends Alphabet {
    constructor() {
        super("0123456789");
    }
}

export class NumbersSingleton extends Numbers {
    private static instance: NumbersSingleton;

    private constructor() {
        super();
    }

    public static getInstance(): NumbersSingleton {
        if (!NumbersSingleton.instance)
            NumbersSingleton.instance = new NumbersSingleton();

        return NumbersSingleton.instance;
    }
}