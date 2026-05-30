/**
 * Slot Machine - Bonus game triggered for 7+ letter words
 */
class SlotMachine {
    constructor(callbacks = {}) {
        this.symbols = GameConfig.SLOT_SYMBOLS;
        this.reels = [
            Math.floor(Math.random() * this.symbols.length),
            Math.floor(Math.random() * this.symbols.length),
            Math.floor(Math.random() * this.symbols.length),
        ];
        this.isSpinning = false;
        this.onSpinStart = callbacks.onSpinStart || (() => {});
        this.onSpinEnd = callbacks.onSpinEnd || (() => {});
        this.onJackpot = callbacks.onJackpot || (() => {});
        this.setupUI();
    }

    setupUI() {
        this.modal = document.getElementById('slotMachineModal');
        this.spinBtn = document.getElementById('spinBtn');
        this.closeBtn = document.getElementById('closeSlotModal');
        this.resultDiv = document.getElementById('slotResult');
        this.resultMessage = document.getElementById('resultMessage');
        this.reelElements = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3'),
        ];
        this.spinBtn.addEventListener('click', () => this.spin());
        this.closeBtn.addEventListener('click', () => this.close());
    }

    show() {
        this.modal.classList.remove('hidden');
        this.resultDiv.classList.add('hidden');
        this.resultMessage.textContent = '';
        this.resetReels();
    }

    close() {
        this.modal.classList.add('hidden');
    }

    resetReels() {
        this.reels = [
            Math.floor(Math.random() * this.symbols.length),
            Math.floor(Math.random() * this.symbols.length),
            Math.floor(Math.random() * this.symbols.length),
        ];
        this.updateDisplay();
        this.spinBtn.disabled = false;
    }

    updateDisplay() {
        for (let i = 0; i < 3; i++) {
            this.reelElements[i].textContent = this.symbols[this.reels[i]];
        }
    }

    spin() {
        if (this.isSpinning) return;
        this.isSpinning = true;
        this.spinBtn.disabled = true;
        this.resultDiv.classList.add('hidden');
        this.onSpinStart();
        const spinPromises = [];
        for (let i = 0; i < 3; i++) {
            spinPromises.push(this.spinReel(i, i * 200));
        }
        Promise.all(spinPromises).then(() => {
            this.isSpinning = false;
            this.checkResult();
        });
    }

    spinReel(reelIndex, delay) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const element = this.reelElements[reelIndex];
                let spins = 0;
                const maxSpins = GameConfig.SPIN_ITERATIONS;
                const spinInterval = setInterval(() => {
                    this.reels[reelIndex] = (this.reels[reelIndex] + 1) % this.symbols.length;
                    element.textContent = this.symbols[this.reels[reelIndex]];
                    element.classList.add('spinning');
                    spins++;
                    if (spins >= maxSpins) {
                        clearInterval(spinInterval);
                        element.classList.remove('spinning');
                        resolve();
                    }
                }, GameConfig.SPIN_SPEED);
            }, delay);
        });
    }

    checkResult() {
        this.resultDiv.classList.remove('hidden');
        if (this.reels[0] === this.reels[1] && this.reels[1] === this.reels[2]) {
            this.resultMessage.textContent = `🎉 JACKPOT! +${GameConfig.JACKPOT_SCORE} Points! 🎉`;
            this.resultMessage.style.color = '#FFD700';
            this.onJackpot();
        } else {
            this.resultMessage.textContent = 'Try again!';
            this.resultMessage.style.color = '#FF6B6B';
        }
        this.onSpinEnd();
        setTimeout(() => {
            this.spinBtn.disabled = false;
        }, 1000);
    }

    getReels() {
        return this.reels.map(i => this.symbols[i]);
    }
}