/**
 * Canvas Manager - Handles all drawing operations
 */
class CanvasManager {
    constructor(canvasId = 'gameCanvas') {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.tileSize = GameConfig.TILE_SIZE;
        this.gap = GameConfig.GRID_GAP;
        this.padding = GameConfig.CANVAS_PADDING;
        this.setupCanvas();
    }

    setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const gridPixels = GameConfig.GRID_SIZE * this.tileSize + (GameConfig.GRID_SIZE - 1) * this.gap;
        const canvasSize = gridPixels + this.padding * 2;
        this.canvas.width = canvasSize * dpr;
        this.canvas.height = canvasSize * dpr;
        this.canvas.style.width = canvasSize + 'px';
        this.canvas.style.height = canvasSize + 'px';
        this.ctx.scale(dpr, dpr);
    }

    getTilePixelCoords(row, col) {
        const x = this.padding + col * (this.tileSize + this.gap);
        const y = this.padding + row * (this.tileSize + this.gap);
        return { x, y };
    }

    getTileAtPixel(pixelX, pixelY) {
        for (let row = 0; row < GameConfig.GRID_SIZE; row++) {
            for (let col = 0; col < GameConfig.GRID_SIZE; col++) {
                const { x, y } = this.getTilePixelCoords(row, col);
                if (pixelX >= x && pixelX <= x + this.tileSize && pixelY >= y && pixelY <= y + this.tileSize) {
                    return { row, col };
                }
            }
        }
        return null;
    }

    drawBoard(gameBoard) {
        this.ctx.clearRect(0, 0, this.canvas.width / (window.devicePixelRatio || 1), this.canvas.height / (window.devicePixelRatio || 1));
        const tiles = gameBoard.getAllTiles();
        for (let row = 0; row < GameConfig.GRID_SIZE; row++) {
            for (let col = 0; col < GameConfig.GRID_SIZE; col++) {
                this.drawTile(tiles[row][col]);
            }
        }
    }

    drawTile(tile) {
        const { x, y } = this.getTilePixelCoords(tile.row, tile.col);
        this.ctx.fillStyle = tile.is_selected ? '#667eea' : '#f0f0f0';
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 2;
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        this.ctx.strokeRect(x, y, this.tileSize, this.tileSize);
        this.ctx.fillStyle = tile.is_selected ? '#fff' : '#333';
        this.ctx.font = 'bold 28px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(tile.letter, x + this.tileSize / 2, y + this.tileSize / 2);
    }

    drawConnectionLine(selectedTiles) {
        if (selectedTiles.length < 2) return;
        this.ctx.strokeStyle = GameConfig.LINE_COLOR;
        this.ctx.lineWidth = GameConfig.LINE_WIDTH;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        const firstTile = selectedTiles[0];
        const firstCoords = this.getTilePixelCoords(firstTile.row, firstTile.col);
        this.ctx.moveTo(firstCoords.x + this.tileSize / 2, firstCoords.y + this.tileSize / 2);
        for (let i = 1; i < selectedTiles.length; i++) {
            const coords = this.getTilePixelCoords(selectedTiles[i].row, selectedTiles[i].col);
            this.ctx.lineTo(coords.x + this.tileSize / 2, coords.y + this.tileSize / 2);
        }
        this.ctx.stroke();
        this.ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
        for (let i = 0; i < selectedTiles.length; i++) {
            const coords = this.getTilePixelCoords(selectedTiles[i].row, selectedTiles[i].col);
            this.ctx.beginPath();
            this.ctx.arc(coords.x + this.tileSize / 2, coords.y + this.tileSize / 2, this.tileSize / 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    update(gameBoard, selectedTiles) {
        this.drawBoard(gameBoard);
        this.drawConnectionLine(selectedTiles);
    }

    getCanvas() {
        return this.canvas;
    }
}

const canvasManager = new CanvasManager();