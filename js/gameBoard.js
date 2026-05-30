/**
 * Game Board - Manages the 9x9 grid of tiles
 */
class GameBoard {
    constructor(gridSize = GameConfig.GRID_SIZE) {
        this.gridSize = gridSize;
        this.tiles = [];
        this.initializeBoard();
    }

    initializeBoard() {
        this.tiles = [];
        for (let row = 0; row < this.gridSize; row++) {
            this.tiles[row] = [];
            for (let col = 0; col < this.gridSize; col++) {
                this.tiles[row][col] = {
                    letter: letterPool.getRandomLetter(),
                    row: row,
                    col: col,
                    is_selected: false,
                    position_index: row * this.gridSize + col,
                };
            }
        }
    }

    getTile(row, col) {
        if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) {
            return null;
        }
        return this.tiles[row][col];
    }

    getAllTiles() {
        return this.tiles;
    }

    clearSelection() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                this.tiles[row][col].is_selected = false;
            }
        }
    }

    reset() {
        this.clearSelection();
        this.initializeBoard();
    }
}