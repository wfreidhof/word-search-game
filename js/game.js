/**
 * Main Game Controller - Orchestrates all game systems
 */
class WordSearchGame {
    constructor() {
        this.gameBoard = new GameBoard(GameConfig.GRID_SIZE);
        this.score = 0;
        this.moves = 0;
        this.setupUI();
        this.setupEventHandlers();
        this.setupSlotMachine();
        this.draw();
    }

    setupUI() {
        this.scoreDisplay = document.getElementById('score');
        this.movesDisplay = document.getElementById('moves');
        this.currentWordDisplay = document.getElementById('currentWord');
        this.clearBtn = document.getElementById('clearBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.toast = document.getElementById('toast');
    }

    setupEventHandlers() {
        this.clearBtn.addEventListener('click', () => this.clear());
        this.submitBtn.addEventListener('click', () => this.submitWord());
        this.resetBtn.addEventListener('click', () => this.reset());
        const touchCallbacks = {
            onTileSelect: (tile) => this.selectTile(tile),
            onPathEnd: (duration) => this.endPath(duration),
        };
        this.touchHandler = new TouchHandler(
            canvasManager.getCanvas(),
            this.gameBoard,
            touchCallbacks
        );
    }

    setupSlotMachine() {
        const slotCallbacks = {
            onSpinStart: () => console.log('Spin started'),
            onSpinEnd: () => console.log('Spin ended'),
            onJackpot: () => this.addScore(GameConfig.JACKPOT_SCORE),
        };
        this.slotMachine = new SlotMachine(slotCallbacks);
    }

    selectTile(tileCoords) {
        const tile = this.gameBoard.getTile(tileCoords.row, tileCoords.col);
        if (!tile) return;
        const lastTile = tileManager.getLastTile();
        const selectedTiles = tileManager.getSelection();
        if (PathValidator.isValidNextTile(tile, lastTile, selectedTiles)) {
            tileManager.selectTile(tile);
            this.updateDisplay();
            this.draw();
        }
    }

    clear() {
        tileManager.clear();
        this.updateDisplay();
        this.draw();
        this.showToast('Selection cleared');
    }

    endPath(duration) {
        const wordLength = tileManager.getWordLength();
        if (wordLength <= 1) {
            this.clear();
            return;
        }
        if (wordLength > GameConfig.SLOT_MACHINE_TRIGGER_LENGTH) {
            this.triggerSlotBonus();
        }
    }

    submitWord() {
        const word = tileManager.getCurrentWord();
        const wordLength = tileManager.getWordLength();
        if (wordLength < GameConfig.MIN_WORD_LENGTH) {
            this.showToast('Word too short!');
            return;
        }
        if (wordValidator.isValidWord(word)) {
            const points = wordLength * GameConfig.BASE_WORD_SCORE;
            this.addScore(points);
            this.moves++;
            this.showToast(`✓ ${word} (+${points} points)`);
            this.clear();
        } else {
            this.showToast(`✗ ${word} not found`);
        }
        this.updateDisplay();
    }

    triggerSlotBonus() {
        this.slotMachine.show();
    }

    addScore(points) {
        this.score += points;
        this.scoreDisplay.textContent = this.score;
    }

    updateDisplay() {
        const word = tileManager.getCurrentWord();
        this.currentWordDisplay.textContent = word || 'Select letters...';
        this.movesDisplay.textContent = this.moves;
    }

    draw() {
        const selectedTiles = tileManager.getSelection();
        canvasManager.update(this.gameBoard, selectedTiles);
    }

    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('show');
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 2000);
    }

    reset() {
        this.gameBoard.reset();
        tileManager.clear();
        this.score = 0;
        this.moves = 0;
        this.updateDisplay();
        this.scoreDisplay.textContent = 0;
        this.movesDisplay.textContent = 0;
        this.draw();
        this.showToast('New game started!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new WordSearchGame();
});