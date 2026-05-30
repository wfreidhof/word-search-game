/**
 * Global Configuration for Word Search Game
 */
const GameConfig = {
    // Grid Configuration
    GRID_SIZE: 7,
    TILE_SIZE: 50,
    GRID_GAP: 2,
    
    // Canvas Settings
    CANVAS_PADDING: 20,
    LINE_WIDTH: 3,
    LINE_COLOR: '#667eea',
    SELECTED_TILE_OPACITY: 0.7,
    
    // Touch/Mouse Settings
    TAP_TOLERANCE: 5, // pixels
    ADJACENCY_DISTANCE: 50, // pixels
    
    // Game Mechanics
    MIN_WORD_LENGTH: 2,
    SLOT_MACHINE_TRIGGER_LENGTH: 6,
    JACKPOT_SCORE: 1000,
    BASE_WORD_SCORE: 10, // 10 points per letter
    
    // Slot Machine
    SLOT_SYMBOLS: ['🍒', '🍋', '💎', '⭐', '🍀'],
    SPIN_ITERATIONS: 15,
    SPIN_SPEED: 50, // milliseconds
};
