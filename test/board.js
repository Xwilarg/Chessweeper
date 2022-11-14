import { fillPositions } from '../src/Game.js';
import { strict as assert } from 'assert';

const R = 'R';
const B = 'B';
const Q = 'Q';
const N = 'N';
const K = 'K';
const P = 'P';
const D = 'D';

describe('Board tests', () => {
    it('Empty board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]);
    });

    it('Rook board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, R, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            0, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0, 0,
            1, 1, 1, R, 1, 1, 1, 1,
            0, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0, 0
        ]);
    });

    it('Bishop board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, B, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            1, 0, 0, 0, 0, 0, 1, 0,
            0, 1, 0, 0, 0, 1, 0, 0,
            0, 0, 1, 0, 1, 0, 0, 0,
            0, 0, 0, B, 0, 0, 0, 0,
            0, 0, 1, 0, 1, 0, 0, 0,
            0, 1, 0, 0, 0, 1, 0, 0,
            1, 0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 1
        ]);
    });

    it('Queen board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, Q, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            1, 0, 0, 1, 0, 0, 1, 0,
            0, 1, 0, 1, 0, 1, 0, 0,
            0, 0, 1, 1, 1, 0, 0, 0,
            1, 1, 1, Q, 1, 1, 1, 1,
            0, 0, 1, 1, 1, 0, 0, 0,
            0, 1, 0, 1, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0,
            0, 0, 0, 1, 0, 0, 0, 1
        ]);
    });

    it('King board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, K, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 1, 1, 0, 0,
            0, 0, 0, 1, K, 1, 0, 0,
            0, 0, 0, 1, 1, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]);
    });

    it('Pawn board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, P, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 1, 0, 0,
            0, 0, 0, 0, P, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]);
    });

    it('Black Pawn board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, D, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, D, 0, 0, 0,
            0, 0, 0, 1, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]);
    });

    it('Horse board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, N, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 1, 0, 0,
            0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 0, 0, N, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 0, 1, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]);
    });

    it('Horse on border board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, N,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            N, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            0, 0, 0, 0, 0, 0, 0, N,
            0, 0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 0,
            0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0, 0,
            N, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0, 0
        ]);
    });

    it('Overlap board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, R, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, B, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            0, 0, 0, 1, 0, 0, 0, 0,
            2, 1, 1, R, 1, 1, 1, 1,
            0, 1, 0, 1, 0, 0, 0, 1,
            0, 0, 1, 1, 0, 0, 1, 0,
            0, 0, 0, 2, 0, 1, 0, 0,
            0, 0, 0, 1, B, 0, 0, 0,
            0, 0, 0, 2, 0, 1, 0, 0,
            0, 0, 1, 1, 0, 0, 1, 0
        ]);
    });

    it('Complex board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, R, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, N, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, Q, 0, 0, B, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, N, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]), [
            1, 1, 0, 1, 0, 2, 0, 1,
            1, 3, 1, R, 3, 1, 1, 1,
            0, 1, 1, 2, 0, 0, N, 0,
            1, 1, 1, 2, 1, 1, 0, 0,
            1, Q, 1, 3, B, 1, 0, 1,
            2, 1, 1, 2, 1, 1, 0, 0,
            0, 1, N, 2, 0, 0, 1, 0,
            1, 1, 0, 1, 2, 0, 0, 1
        ]);
    });

    it('Small board', () => {
        assert.deepStrictEqual(fillPositions([
            0, 0, N, K,
            0, R, 0, 0,
            0, 0, 0, 0,
            0, 0, B, 0
        ]), [
            0, 1, N, K,
            3, R, 2, 2,
            0, 3, 0, 2,
            0, 1, B, 0
        ]);
    });
});