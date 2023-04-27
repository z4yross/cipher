import { Alphabet } from "./Alphabet.js";

describe("Alphabet", () => {

    // Tests that calling getLetter(index) returns the correct letter at the given index. 
    it("test_get_letter_returns_correct_letter", () => {
        const alphabet = new Alphabet("abcde");
        expect(alphabet.getLetter(2)).toBe("c");
        expect(() => alphabet.getLetter(-1)).toThrow();
        expect(() => alphabet.getLetter(5)).toThrow();
    });

    // Tests that calling getIndex(letter) returns the correct index of the given letter. 
    it("test_get_index_returns_correct_index", () => {
        const alphabet = new Alphabet("abcde");
        expect(alphabet.getIndex("c")).toBe(2);
        expect(() => alphabet.getIndex("f")).toThrow();
    });

    // Tests that calling indexString(text) returns an array of correct indexes for each letter in the given text. 
    it("test_index_string_returns_correct_indexes", () => {
        const alphabet = new Alphabet("abcde");
        expect(alphabet.indexString("abc")).toEqual([0, 1, 2]);
        expect(() => alphabet.indexString("fgh")).toThrow();
    });

    // Tests that calling letterString(text) returns the correct string for the given array of indexes. 
    it("test_letter_string_returns_correct_string", () => {
        const alphabet = new Alphabet("abcde");
        expect(alphabet.letterString([0, 1, 2])).toBe("abc");
        expect(() => alphabet.letterString([0, 1, 5])).toThrow();
    });

    // Tests that calling indexAllLetters() returns an array of tuples with correct index-letter pairs. 
    it("test_index_all_letters_returns_correct_pairs", () => {
        const alphabet = new Alphabet("abcde");
        expect(alphabet.indexAllLetters()).toEqual([[0, "a"], [1, "b"], [2, "c"], [3, "d"], [4, "e"]]);
    });

    // Tests that calling getAlphabet() returns the alphabet string. 
    it("test_get_alphabet_returns_alphabet_string", () => {
        const alphabet = new Alphabet("abcde");
        expect(alphabet.getAlphabet()).toBe("abcde");
    });
});
