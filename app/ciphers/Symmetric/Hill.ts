import { SymmetricCipher } from "../module.js";
import { Alphabet, SimpleSingleton } from "../../module.js";

import * as math from "mathjs";

export class Hill implements SymmetricCipher {
	alphabet: Alphabet;
	secret: string;
	forward: boolean;

	size: number;
	secretList: number[];

	constructor(
		secret: string,
		forward: boolean = true,
		alphabet: Alphabet = SimpleSingleton.getInstance()
	) {
		this.alphabet = alphabet;
		this.secret = secret;

		if (alphabet) this.alphabet = alphabet;

		this.secretList = this.secret.split(",").map((n) => parseInt(n));

		let len = Math.sqrt(this.secretList.length);
		if (len != Math.floor(len))
			throw new Error("Secret must be a square matrix");

		this.size = Math.floor(len);
	}

	modulus(A: number, C: number): number {
		if (A >= 0) return A % C;
		else return C + (A % C);
	}

	minorMatrix(matrix: math.Matrix, A: number, B: number): math.Matrix {
		const size = this.size - 1;
		let res = math.zeros(size, size) as math.Matrix;

		let i = 0;
		let j = 0;

		for (let row = 0; row < this.size; row++) {
			if (row === A) continue;
			for (let col = 0; col < this.size; col++) {
				if (col === B) continue;
				res = math.subset(res, math.index(i, j), matrix.get([row, col]));
				j++;
			}
			i++;
			j = 0;
		}

		return res;
	}

	coffactorMatrix(matrix: math.Matrix): math.Matrix {
		let res = math.matrix(matrix.valueOf());

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				const minor = this.minorMatrix(matrix, i, j);
				const minorDet = math.det(minor);
                const sign = Math.pow(-1, i + j);
				res = math.subset(res, math.index(i, j), minorDet * sign);
			}
		}

		return res;
	}

	adjointMatrix(matrix: math.Matrix): math.Matrix {
		const cofactor = this.coffactorMatrix(matrix);
		return math.transpose(cofactor);
	}

	inverseMatrix(matrix: math.Matrix): math.Matrix {
		const detMod = this.modulus(
			math.det(matrix),
			this.alphabet.getLength()
		);

		const modularInverse = this.modularInverse(
			detMod,
			this.alphabet.getLength()
		);

		if (modularInverse === undefined)
			throw new Error("No modular inverse found");

		const adjoint = this.adjointMatrix(matrix);
		const inv = math.multiply(adjoint, modularInverse);

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				const val = inv.get([i, j]);
				math.subset(
					inv,
					math.index(i, j),
					this.modulus(val, this.alphabet.getLength())
				);
			}
		}

		return inv;
	}

	modularInverse(A: number, C: number): number {
		let B = 0;

		for (B; B < C; B++) if ((A * B) % C == 1) return B;

		return undefined;
	}

	vectorByMatrix(vector: math.Matrix, matrix: math.Matrix): math.Matrix {
		return math.multiply(vector, matrix);
	}

	secretToMatrix(secret: number[]): number[][] {
		const matrix = [];
		for (let i = 0; i < this.size; i++) {
			const row = [];
			for (let j = 0; j < this.size; j++) {
				row.push(secret[i * this.size + j]);
			}
			matrix.push(row);
		}
		return matrix;
	}

	encrypt(text: string): string {
		try {
			const K = math.matrix(this.secretToMatrix(this.secretList));

			const P_f = text
				.split("")
				.map((char) => this.alphabet.indexString(char));

			const C_f = [];
			for (let i = 0; i < P_f.length; i += this.size) {
				const P_I = P_f.slice(i, i + this.size);

                if (P_I.length === 0) break;
                while (P_I.length < this.size) P_I.push([0]);

				const P = math.transpose(math.matrix(P_I));

				const K_P = math.multiply(P, K);
				const K_P_list = K_P.valueOf();

				const C = (K_P_list[0] as number[]).map((n) =>
					this.modulus(n, this.alphabet.getLength())
				);

				C_f.push(...C);
			}

			const C = this.alphabet.letterString(C_f);
			return C;
		} catch (error) {
			throw error;
		}
	}

	decrypt(text: string): string {
		try {
			const K = math.matrix(this.secretToMatrix(this.secretList));
			const K_inv = this.inverseMatrix(K);

			const P_f = text
				.split("")
				.map((char) => this.alphabet.indexString(char));

			const C_f = [];
			for (let i = 0; i < P_f.length; i += this.size) {
				const P_I = P_f.slice(i, i + this.size);

                if (P_I.length === 0) break;
                while (P_I.length < this.size) P_I.push([0]);

				const P = math.transpose(math.matrix(P_I));

				const P_Kinv = math.multiply(P, K_inv);
				const P_K_list = P_Kinv.valueOf();

				const C = (P_K_list[0] as number[]).map((n) =>
					this.modulus(n, this.alphabet.getLength())
				);

				C_f.push(...C);
			}

			const C = this.alphabet.letterString(C_f);
			return C;
		} catch (error) {
			throw error;
		}
	}
}
