<template>
    <div class="conway-logo-container">
        <canvas ref="canvasRef" class="conway-canvas"></canvas>
        <div class="letter-text">VPASCU.RO</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

class ConwayLogoGame {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private pixelSize: number
    private cols: number = 0
    private rows: number = 0
    private grid: Array<Array<boolean>>
    private ages: Array<Array<number>>
    private generation: number = 0
    private stableSteps: number = 0
    private maxStableSteps: number = 5
    private lastGrid: string = ''
    private animationId: number | null = null
    private frameTime: number = 1000 / 24 // 24 FPS
    private resetTimerId: number | null = null // eslint-disable-line @typescript-eslint/no-unused-vars
    private resetInterval: number = 10000 // 10 seconds

    constructor(canvas: HTMLCanvasElement, pixelSizeEm: number = 0.05) {
        this.canvas = canvas
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Could not get canvas context')
        this.ctx = ctx

        // Calculate pixel size in pixels (1em from current font size)
        const emInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize)
        this.pixelSize = pixelSizeEm * emInPixels

        // Set canvas size based on viewport
        this.updateCanvasSize()

        this.cols = Math.floor(this.canvas.width / this.pixelSize)
        this.rows = Math.floor(this.canvas.height / this.pixelSize)

        this.grid = this.createRandomGrid()
        this.ages = Array.from({ length: this.rows }, () => Array(this.cols).fill(0))

        // Create letter mask
        this.applyLetterMask()

        window.addEventListener('resize', () => this.handleResize())
    }

    private updateCanvasSize() {
        // Make canvas match the container
        const container = this.canvas.parentElement
        if (container) {
            this.canvas.width = container.offsetWidth || 300
            this.canvas.height = container.offsetHeight || 60
        } else {
            this.canvas.width = 300
            this.canvas.height = 60
        }
    }

    private handleResize() {
        const oldCols = this.cols
        const oldRows = this.rows

        this.updateCanvasSize()
        this.cols = Math.floor(this.canvas.width / this.pixelSize)
        this.rows = Math.floor(this.canvas.height / this.pixelSize)

        if (oldCols !== this.cols || oldRows !== this.rows) {
            this.grid = this.createRandomGrid()
            this.ages = Array.from({ length: this.rows }, () => Array(this.cols).fill(0))
            this.applyLetterMask()
        }
    }

    private createRandomGrid(): Array<Array<boolean>> {
        return Array.from({ length: this.rows }, () =>
            Array.from({ length: this.cols }, () => Math.random() > 0.7)
        )
    }

    private applyLetterMask() {
        // No masking needed - display full game
    }

    private resetGame() {
        this.grid = this.createRandomGrid()
        this.ages = Array.from({ length: this.rows }, () => Array(this.cols).fill(0))
        this.stableSteps = 0
        this.generation = 0
        this.lastGrid = ''
    }

    private countNeighbors(row: number, col: number): number {
        let count = 0
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue
                const newRow = (row + i + this.rows) % this.rows
                const newCol = (col + j + this.cols) % this.cols
                if (this.grid[newRow]![newCol]) count++
            }
        }
        return count
    }

    private gridToString(): string {
        let result = ''
        for (const row of this.grid) {
            for (const cell of row) {
                result += cell ? '1' : '0'
            }
            result += '|'
        }
        return result
    }

    private step() {
        const newGrid = Array.from({ length: this.rows }, () => Array(this.cols).fill(false))

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.countNeighbors(row, col)
                const isAlive = this.grid[row]![col]
                const agesRow = this.ages[row]!

                if (isAlive && (neighbors === 2 || neighbors === 3)) {
                    newGrid[row]![col] = true
                    agesRow![col] = (agesRow![col] || 0) + 1
                } else if (!isAlive && neighbors === 3) {
                    newGrid[row]![col] = true
                    agesRow![col] = 1
                } else {
                    agesRow![col] = 0
                }
            }
        }

        const newGridString = this.gridToString()
        if (newGridString === this.lastGrid) {
            this.stableSteps++
            if (this.stableSteps >= this.maxStableSteps) {
                this.grid = this.createRandomGrid()
                this.ages = Array.from({ length: this.rows }, () => Array(this.cols).fill(0))
                this.applyLetterMask()
                this.stableSteps = 0
                this.generation = 0
            }
        } else {
            this.stableSteps = 0
        }

        this.grid = newGrid
        this.lastGrid = newGridString
        this.generation++
    }

    private colorLerp(age: number, maxAge: number): string {
        const goldR = 250, goldG = 167, goldB = 0
        const blueR = 102, blueG = 153, blueB = 255

        const ratio = Math.min(age / Math.max(maxAge, 20), 1)

        const r = Math.round(goldR + (blueR - goldR) * ratio)
        const g = Math.round(goldG + (blueG - goldG) * ratio)
        const b = Math.round(goldB + (blueB - goldB) * ratio)

        return `rgb(${r},${g},${b})`
    }

    private render() {
        // Transparent background
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        const maxAge = 50

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                // Render all alive cells (no masking)
                if (this.grid[row]![col]) {
                    const x = col * this.pixelSize
                    const y = row * this.pixelSize
                    const age = this.ages[row]![col] || 0
                    const color = this.colorLerp(age, maxAge)

                    this.ctx.fillStyle = color
                    this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize)
                }
            }
        }
    }

    public start() {
        let lastFrameTime = Date.now()

        const animate = () => {
            const now = Date.now()
            const deltaTime = now - lastFrameTime

            if (deltaTime >= this.frameTime) {
                this.step()
                this.render()
                lastFrameTime = now
            }

            this.animationId = requestAnimationFrame(animate)
        }

        this.animationId = requestAnimationFrame(animate)

        // Reset game every 10 seconds
        this.resetTimerId = window.setInterval(() => {
            this.resetGame()
        }, this.resetInterval)
    }

    public stop() {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId)
        }
        if (this.resetTimerId !== null) {
            clearInterval(this.resetTimerId)
        }
    }

    public destroy() {
        this.stop()
        window.removeEventListener('resize', () => this.handleResize())
    }
}

onMounted(() => {
    if (canvasRef.value) {
        const game = new ConwayLogoGame(canvasRef.value, 0.20)
        game.start()
            ; (canvasRef.value as any).__conwayGame = game
    }
})

onUnmounted(() => {
    if (canvasRef.value && (canvasRef.value as any).__conwayGame) {
        ; (canvasRef.value as any).__conwayGame.destroy()
    }
})
</script>

<style scoped>
.conway-logo-container {
    display: inline-block;
    min-width: 300px;
    height: 60px;
    position: relative;
    overflow: visible;
}

.conway-canvas {
    display: block;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: transparent;
    border-radius: 0.5rem;
    border: 1px solid rgba(102, 153, 255, 0.3);
}

.letter-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    font-size: 48px;
    font-weight: 900;
    mix-blend-mode: subtract;
    color: #ffffffd5;
    text-shadow: 1px 1px 7px #000000;
    pointer-events: none;
    white-space: nowrap;
    z-index: 2;
    font-family: Arial, sans-serif;
    letter-spacing: 0.02em;
    line-height: 1;
    margin: 0;
    padding: 0;
}
</style>
