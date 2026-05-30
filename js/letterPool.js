/**
 * Letter Pool using Scrabble-weighted frequency distribution
 */
class LetterPool {
    constructor() {
        this.letters = this.buildLetterDistribution();
        this.vowelRatio = 0.40;
    }

    buildLetterDistribution() {
        const distribution = {
            'A': 9, 'E': 12, 'I': 9, 'O': 8, 'U': 4,
            'L': 4, 'N': 6, 'S': 4, 'T': 6, 'R': 6, 'D': 4,
            'G': 3, 'H': 2, 'C': 3, 'M': 2, 'P': 2, 'B': 2, 'F': 2, 'Y': 2, 'W': 2, 'K': 1, 'V': 1,
            'X': 1, 'Z': 1, 'Q': 1, 'J': 1,
        };

        const pool = [];
        for (const [letter, count] of Object.entries(distribution)) {
            for (let i = 0; i < count; i++) {
                pool.push(letter);
            }
        }
        return pool;
    }

    getRandomLetter() {
        const randomIndex = Math.floor(Math.random() * this.letters.length);
        return this.letters[randomIndex];
    }

    getRandomLetters(count) {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(this.getRandomLetter());
        }
        return result;
    }

    static isVowel(letter) {
        return ['A', 'E', 'I', 'O', 'U'].includes(letter.toUpperCase());
    }
}

const letterPool = new LetterPool();