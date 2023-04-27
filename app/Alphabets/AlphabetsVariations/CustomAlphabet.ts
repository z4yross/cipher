import {Alphabet} from "../module.js";

export class CustomAlphabet extends Alphabet {
    constructor(alphabet: string) {
        super(alphabet);
    }
}

export class CustomAlphabetSingleton extends CustomAlphabet {
    private static instance: CustomAlphabetSingleton;

    private constructor(alphabet: string) {
        super(alphabet);
    }
    
    public static getInstance(alphabet?: string): CustomAlphabetSingleton {
        if (!CustomAlphabetSingleton.instance && alphabet)
            CustomAlphabetSingleton.instance = new CustomAlphabetSingleton(alphabet);
        if (!CustomAlphabetSingleton.instance && !alphabet)
            throw new Error("CustomAlphabetSingleton instance not created yet. Use CustomAlphabetSingleton.getInstance(alphabet: string) to create one.");

        return CustomAlphabetSingleton.instance;
    }

    public static resetInstance(): void {
        CustomAlphabetSingleton.instance = undefined;
    }
}