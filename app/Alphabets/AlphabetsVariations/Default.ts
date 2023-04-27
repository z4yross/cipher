import { Alphabet } from "../module.js";

class Default extends Alphabet {
    constructor() {
        super("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ");
    }
}

export class DefaultSingleton extends Default {
    private static instance: DefaultSingleton;

    private constructor() {
        super();
    }

    public static getInstance(): DefaultSingleton {
        if (!DefaultSingleton.instance)
            DefaultSingleton.instance = new DefaultSingleton();

        return DefaultSingleton.instance;
    }
}