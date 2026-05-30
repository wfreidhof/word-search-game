/**
 * Path Validator - Validates tile adjacency and path rules
 */
class PathValidator {
    static isAdjacent(tile1, tile2) {
        const rowDiff = Math.abs(tile1.row - tile2.row);
        const colDiff = Math.abs(tile1.col - tile2.col);
        return (rowDiff <= 1 && colDiff <= 1) && (rowDiff + colDiff > 0);
    }

    static isValidNextTile(newTile, lastTile, selectedTiles) {
        if (selectedTiles.some(tile => tile.row === newTile.row && tile.col === newTile.col)) {
            return false;
        }
        if (!lastTile) {
            return true;
        }
        return this.isAdjacent(newTile, lastTile);
    }

    static getAdjacentTiles(centerTile, gameBoard, excludeTiles = []) {
        const adjacent = [];
        const { row, col } = centerTile;
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r === row && c === col) continue;
                const tile = gameBoard.getTile(r, c);
                if (tile && !excludeTiles.some(t => t.row === tile.row && t.col === tile.col)) {
                    adjacent.push(tile);
                }
            }
        }
        return adjacent;
    }

    static isValidPath(path) {
        if (path.length < 1) return true;
        for (let i = 1; i < path.length; i++) {
            if (!this.isAdjacent(path[i - 1], path[i])) {
                return false;
            }
        }
        return true;
    }
}