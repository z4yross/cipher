import { Alphabet } from "../module.js";

class Alphanumeric extends Alphabet {
    constructor() {
        super("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ");
    }
}

export class AlphanumericSingleton extends Alphanumeric {
    private static instance: AlphanumericSingleton;

    private constructor() {
        super();
    }

    public static getInstance(): AlphanumericSingleton {
        if (!AlphanumericSingleton.instance)
            AlphanumericSingleton.instance = new AlphanumericSingleton();

        return AlphanumericSingleton.instance;
    }
}