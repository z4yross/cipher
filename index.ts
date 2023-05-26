import * as Cipher from './app/module.js';

export default Cipher;

const simpleAlphabet = Cipher.SimpleSingleton.getInstance();

const hill = new Cipher.Hill('17,17,5,21,18,21,2,2,19', true, simpleAlphabet);
const res = hill.encrypt('PAYMOREMONEY');
const decrypt = hill.decrypt("RRLMWBKASPDH");
console.log(res);
console.log(decrypt);

const hill2 = new Cipher.Hill('3, 2, 8, 5', true, simpleAlphabet);
const res2 = hill2.encrypt('HILLCIPHER');
const decrypt2 = hill2.decrypt("HCRZSSXNSP");
console.log(res2);
console.log(decrypt2);

const customAlphabet = Cipher.CustomAlphabetSingleton.getInstance('abcdefghijklmnopqrstuvwxyz ');

const vigenere = new Cipher.Vigenere('pxlmvmsydofuyrvzwc tnlebnecvgdupahfzzlmnyih', true, customAlphabet);
const res3 = vigenere.encrypt('mr mustard with the candlestick in the hall');
const decrypt3 = vigenere.decrypt("ankyodkyurepfjbyojdsplreyiunofdoiuerfpluyts");
console.log(res3);
console.log(decrypt3);

const vigenere2 = new Cipher.Vigenere('pftgpmiydgaxgoufhklllmhsqdqogtewbqfgyovuhwt', true, customAlphabet);
const res4 = vigenere2.encrypt('mr mustard with the candlestick in the hall');
const decrypt4 = vigenere2.decrypt("ankyodkyurepfjbyojdsplreyiunofdoiuerfpluyts");
console.log(res4);
console.log(decrypt4);

const binaryAlphabet = Cipher.BinarySingleton.getInstance();

const vernan = new Cipher.Vernam('gravity', false, customAlphabet, true);
const res5 = vernan.encrypt(vernan.textToBinaryAlphabet('tonto es el que hace tonterias', true));
const decrypt5 = vernan.decrypt(res5);
console.log(res5, vernan.binaryToTextAlphabet(res5, true));
console.log(decrypt5, vernan.binaryToTextAlphabet(decrypt5, true));

const vernan2 = new Cipher.Vernam('gravity', true, customAlphabet);
const res6 = vernan2.encryptText('tonto es el que hace tonterias');
const decrypt6 = vernan2.decryptText(res6);
console.log(res6);
console.log(decrypt6);

// console.log(vernan2.textToBinaryAlphabet('hola', true));
// console.log(vernan2.binaryToTextAlphabet('001101001010010011000011', true));

// console.log('ANKYODKYUREPFJBYOJDSPLREYIUNOFDOIUERFPLUYTS'.toLowerCase());