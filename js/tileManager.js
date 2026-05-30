/**
 * Tile Manager - Tracks selected tiles and current word path
 */
class TileManager {
    constructor() {
        this.selectedTiles = [];
        this.selectedPath = [];
    }

    selectTile(tile) {
        if (!this.isSelected(tile)) {
            this.selectedTiles.push(tile);
            this.selectedPath.push({ row: tile.row, col: tile.col });
            tile.is_selected = true;
        }
    }

    isSelected(tile) {
        return this.selectedTiles.some(t => t.row === tile.row && t.col === tile.col);
    }

    getCurrentWord() {
        return this.selectedTiles.map(tile => tile.letter).join('');
    }

    getSelection() {
        return this.selectedTiles;
    }

    getLastTile() {
        return this.selectedTiles.length > 0 ? this.selectedTiles[this.selectedTiles.length - 1] : null;
    }

    clear() {
        this.selectedTiles.forEach(tile => {
            tile.is_selected = false;
        });
        this.selectedTiles = [];
        this.selectedPath = [];
    }

    getWordLength() {
        return this.selectedTiles.length;
    }

    getPath() {
        return this.selectedPath;
    }
}

const tileManager = new TileManager();