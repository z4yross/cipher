import { Alphabet } from "../module.js";

class Spanish extends Alphabet {
    constructor() {
        super("aábcdeéfghiíjklmnñoópqrstuúüvwxyzAÁBCDEÉFGHIÍJKLMNÑOÓPQRSTUÚÜVWXYZ ");
    }
}

export class SpanishSingleton extends Spanish {
    private static instance: SpanishSingleton;

    private constructor() {
        super();
    }

    public static getInstance(): SpanishSingleton {
        if (!SpanishSingleton.instance)
            SpanishSingleton.instance = new SpanishSingleton();

        return SpanishSingleton.instance;
    }
}