import { SymmetricCipher } from "../module.js";
import { Alphabet, SimpleSingleton } from "../../module.js";

export class Hill implements SymmetricCipher {
	alphabet: Alphabet;
	secret: string;
	forward: boolean;

	constructor(
		secret: string,
		forward: boolean = true,
		alphabet: Alphabet = SimpleSingleton.getInstance()
	) {
		this.alphabet = alphabet;
		this.secret = secret;

		if (alphabet) this.alphabet = alphabet;
	}

    modulus(A: number, C: number): number{
        if(A >= 0) return A % C;
        else return C + (A % C);
    }

    det(matrix: number[][]): number {
        return 0;
    }

    coffactorMatrix(matrix: number[][], A: number, B: number): number[][] {
        return undefined
    }

    inverseMatrix(matrix: number[][]): number[][] {
        // for every cofactor
        // coff_x(A)^t * det(A)^-1 
        // det(A)^-1 is the modular
        return undefined;
    }

    modularInverse(A: number, C:number): number {
        let B = 0;

        for(B; B < C; B++)
            if(((A * B) % C) == 1) return B

        return undefined;
    }

    vectorByMatrix(vector: number[], matrix: number[][]) {
        let res = [];

        matrix.forEach((value) => {
            let factor = 0;
            value.forEach((v, i) => factor += v*vector[i])
            res.push(factor)
        })

        return res;
    }

	encrypt(text: string): string {
		try {
            // P is text divided in n tokens echa of 3 chars, a token is a vector len 3
            // C = PK
			return '';
		} catch (error) {
			throw error;
		}
	}

	decrypt(text: string): string {
		try {
            // P = CK^-1
            return '';
		} catch (error) {
			throw error;
		}
	}
}
