import { Playfair } from './Playfair.js';

describe("Playfair", () => {
	// Tests that encrypt method returns the expected result with valid input.
	it("test_encrypt_valid_input", () => {
		const playfair = new Playfair("NORIA");
		const result = playfair.encrypt("ATAQUECEROHORAS");
		expect(result).toBe("IUOUTFDFIRQCINR");
	});

	// Tests that decrypt method returns the expected result with valid input.
	it("test_decrypt_valid_input", () => {
        const playfair = new Playfair("NORIA");
		const result = playfair.decrypt("IUOUTFDFIRQCINR");
		expect(result).toBe("ATAQUECEROHORAS");
	});

	// // Tests that encrypt method returns an empty string when given an empty string.
	// it("test_encrypt_empty_string", () => {
	// 	const playfair = new Playfair("7");
	// 	const result = playfair.encrypt("");
	// 	expect(result).toBe("");
	// });

	// // Tests that decrypt method returns an empty string when given an empty string.
	// it("test_decrypt_empty_string", () => {
	// 	const playfair = new Playfair("7");
	// 	const result = playfair.decrypt("");
	// 	expect(result).toBe("");
	// });

	// // Tests that encrypt method returns the expected result when given a single character.
	// it("test_encrypt_single_character", () => {
	// 	const playfair = new Playfair("2");
	// 	const result = playfair.encrypt("a");
	// 	expect(result).toBe("c");
	// });

	// // Tests that encryption with valid secret and alphabet returns the expected result.
	// it("test_playfair_encrypt_valid_secret_alphabet", () => {
	// 	const playfair = new Playfair("5", false);
	// 	const plaintext = "hello world";
	// 	const ciphertext = playfair.encrypt(plaintext);
	// 	expect(ciphertext).toEqual("c ggjVrjmgZ");
	// });

	// // Tests that decryption with valid secret and alphabet returns the expected result.
	// it("test_playfair_decrypt_valid_secret_alphabet", () => {
	// 	const playfair = new Playfair("5", false);
	// 	const ciphertext = "c ggjVrjmgZ";
	// 	const plaintext = playfair.decrypt(ciphertext);
	// 	expect(plaintext).toEqual("hello world");
	// });
});
