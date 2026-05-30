/**
 * Touch Handler - Manages touch and mouse input events
 */
class TouchHandler {
    constructor(canvas, gameBoard, callbacks = {}) {
        this.canvas = canvas;
        this.gameBoard = gameBoard;
        this.isDrawing = false;
        this.startTime = null;
        this.onTileSelect = callbacks.onTileSelect || (() => {});
        this.onTileDeselect = callbacks.onTileDeselect || (() => {});
        this.onPathEnd = callbacks.onPathEnd || (() => {});
        this.onPathClear = callbacks.onPathClear || (() => {});
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.handlePointerDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handlePointerMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handlePointerUp(e));
        this.canvas.addEventListener('mouseleave', (e) => this.handlePointerUp(e));
        this.canvas.addEventListener('touchstart', (e) => this.handlePointerDown(e));
        this.canvas.addEventListener('touchmove', (e) => this.handlePointerMove(e));
        this.canvas.addEventListener('touchend', (e) => this.handlePointerUp(e));
        this.canvas.addEventListener('touchcancel', (e) => this.handlePointerUp(e));
    }

    handlePointerDown(e) {
        e.preventDefault();
        this.isDrawing = true;
        this.startTime = Date.now();
        const pos = this.getPointerPosition(e);
        const tile = this.getTileAtPosition(pos);
        if (tile) this.onTileSelect(tile);
    }

    handlePointerMove(e) {
        if (!this.isDrawing) return;
        e.preventDefault();
        const pos = this.getPointerPosition(e);
        const tile = this.getTileAtPosition(pos);
        if (tile) this.onTileSelect(tile);
    }

    handlePointerUp(e) {
        if (!this.isDrawing) return;
        e.preventDefault();
        this.isDrawing = false;
        const duration = Date.now() - this.startTime;
        this.onPathEnd(duration);
    }

    getPointerPosition(e) {
        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        const rect = this.canvas.getBoundingClientRect();
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    getTileAtPosition(pos) {
        return canvasManager.getTileAtPixel(pos.x, pos.y);
    }
}
