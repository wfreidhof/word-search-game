/**
 * Word Validator - Validates words against dictionary
 */
class WordValidator {
    constructor() {
        this.validWords = new Set([
            'CAT', 'CAR', 'ART', 'RAT', 'TAR', 'ACE', 'ARE', 'EAR', 'ERA',
            'DOG', 'GOD', 'RAN', 'TAN', 'AND', 'CAN', 'FAN', 'MAN', 'PAN',
            'HAT', 'BAT', 'MAT', 'SAT', 'FAT', 'RAG', 'TAG', 'BAG', 'LAP',
            'MAP', 'NAP', 'SAP', 'TAP', 'CAP', 'GAP', 'HIT', 'BIT', 'SIT',
            'FIT', 'PIT', 'LIT', 'HOT', 'POT', 'LOT', 'NOT', 'GOT', 'DOT',
            'CUT', 'BUT', 'GUT', 'HUT', 'JUT', 'NUT', 'PUT', 'RUT', 'TUT',
            'RED', 'BED', 'FED', 'LED', 'WED', 'MUD', 'BUD', 'CUD', 'DUD',
            'BIG', 'DIG', 'FIG', 'GIG', 'JIG', 'PIG', 'RIG', 'WIG', 'BUG',
            'DUG', 'HUG', 'JUG', 'MUG', 'PUG', 'RUG', 'TUG', 'BAD', 'DAD',
            'GAD', 'HAD', 'LAD', 'MAD', 'PAD', 'SAD', 'TAD', 'WAD',
            'CARD', 'CART', 'CAST', 'CATS', 'CARS', 'CARE', 'DARE', 'DARK',
            'ARTS', 'RATS', 'RATE', 'RAGE', 'RACE', 'CRATE', 'TRADE', 'GREAT',
            'DEAR', 'FEAR', 'GEAR', 'HEAR', 'LEAR', 'NEAR', 'PEAR', 'REAR',
            'TEAR', 'WEAR', 'CLEAR', 'DREAM', 'CREAM', 'STEAM', 'STREAM',
            'SAND', 'LAND', 'HAND', 'BAND', 'STAND', 'GRAND', 'BRAND',
            'END', 'FEND', 'MEND', 'REND', 'SEND', 'TEND', 'TREND', 'BLEND',
            'FAST', 'LAST', 'PAST', 'VAST', 'CAST', 'MAST',
            'TRAIN', 'GRAIN', 'RAIN', 'PAIN', 'GAIN', 'MAIN',
            'LATE', 'GATE', 'MATE', 'RATE', 'DATE', 'FATE', 'HATE',
            'GAME', 'CAME', 'FAME', 'LAME', 'NAME', 'SAME', 'TAME',
            'MADE', 'FADE', 'JADE', 'WADE', 'TRADE',
            'FACE', 'PACE', 'RACE', 'PLACE', 'SPACE', 'GRACE', 'TRACE',
            'NICE', 'RICE', 'MICE', 'SLICE', 'PRICE', 'TWICE',
            'RIDE', 'HIDE', 'SIDE', 'TIDE', 'WIDE', 'BRIDE', 'PRIDE',
            'TAKE', 'MAKE', 'BAKE', 'CAKE', 'FAKE', 'LAKE', 'RAKE', 'SAKE',
            'SHAKE', 'SNAKE', 'STAKE', 'BRAKE',
            'LIKE', 'BIKE', 'HIKE', 'MIKE', 'PIKE', 'STRIKE',
            'HOME', 'SOME', 'COME', 'DOME', 'ROME', 'TONE', 'BONE', 'CONE',
            'DONE', 'GONE', 'LONE', 'ZONE', 'STONE', 'PHONE',
            'BLUE', 'CLUE', 'GLUE', 'TRUE', 'CRUDE', 'PRUDE',
            'FIRE', 'HIRE', 'WIRE', 'TIRE', 'DIRE', 'MIRE', 'SIRE', 'SPIRE',
            'TALE', 'SCALE', 'STALE', 'WHALE', 'SNAIL', 'TRAIL', 'FRAIL',
        ]);
    }

    isValidWord(word) {
        const upperWord = word.toUpperCase();
        return this.validWords.has(upperWord) && upperWord.length >= GameConfig.MIN_WORD_LENGTH;
    }

    addWord(word) {
        this.validWords.add(word.toUpperCase());
    }

    getRandomWord() {
        const words = Array.from(this.validWords);
        return words[Math.floor(Math.random() * words.length)];
    }
}

const wordValidator = new WordValidator();