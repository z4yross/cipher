import { Caesar } from "./Caesar.js";

describe("Caesar", () => {

    // Tests that decrypt method returns the expected result when given a single character. 
    it("test_decrypt_single_character", () => {
        const caesar = new Caesar("3");
        const result = caesar.decrypt("d");
        expect(result).toBe("a");
    });

    // Tests that encrypt method returns the expected result with valid input. 
    it("test_encrypt_valid_input", () => {
        const caesar = new Caesar("5");
        const result = caesar.encrypt("hello world");
        expect(result).toBe("mjqqteBtwqi");
    });

    // Tests that decrypt method returns the expected result with valid input. 
    it("test_decrypt_valid_input", () => {
        const caesar = new Caesar("5");
        const result = caesar.decrypt("mjqqteBtwqi");
        expect(result).toBe("hello world");
    });

    // Tests that encrypt method returns an empty string when given an empty string. 
    it("test_encrypt_empty_string", () => {
        const caesar = new Caesar("7");
        const result = caesar.encrypt("");
        expect(result).toBe("");
    });

    // Tests that decrypt method returns an empty string when given an empty string. 
    it("test_decrypt_empty_string", () => {
        const caesar = new Caesar("7");
        const result = caesar.decrypt("");
        expect(result).toBe("");
    });

    // Tests that encrypt method returns the expected result when given a single character. 
    it("test_encrypt_single_character", () => {
        const caesar = new Caesar("2");
        const result = caesar.encrypt("a");
        expect(result).toBe("c");
    });
});
