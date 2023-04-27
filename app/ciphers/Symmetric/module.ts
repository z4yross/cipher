import { Caesar } from './Caesar.js';

const ciphers = [ Caesar ];

export const ciphersDescriptions = ciphers.map((cipher) => {
    return {
        name: cipher.cipherName,
        description: cipher.description,
        type: cipher.type,
        cipher: cipher
    };
});
