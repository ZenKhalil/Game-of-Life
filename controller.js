import { GameOfLifeModel } from './model.js';
import { GameOfLifeView } from './view.js';
import { patterns } from './patterns.js'; // Import patterns

class GameOfLifeController {
  constructor(rows, cols, containerId) {
    this.model = new GameOfLifeModel(rows, cols);
    this.view = new GameOfLifeView(rows, cols, containerId);

    this.isRunning = false;
    this.intervalId = null;

    // Initial speed in milliseconds
    this.speed = 200;

    this.selectedPattern = null; // To store the currently selected pattern

    // Populate pattern selector
    this.view.populatePatternSelector(patterns);

    // Bind event handlers
    this.view.bindCellClick(this.handleCellClick.bind(this));
    this.view.bindControls(
      this.handleClearGrid.bind(this),
      this.handleAddRandomCells.bind(this),
      this.handlePauseResume.bind(this),
      this.handleSpeedChange.bind(this),
      this.handleSaveGrid.bind(this),
      this.handleLoadGrid.bind(this),
      this.handlePatternSelect.bind(this) // Pattern select handler
    );

    // Bind Start button
    this.bindStartButton();

    // Do not start the game loop automatically
    // this.start();
  }

  // Start the game loop
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.model.computeNextGeneration();
        this.view.update(this.model.grid);
        this.view.updateGeneration(this.model.generation);
      }, this.speed);
      document.getElementById('pause-btn').textContent = 'Pause';
    }
  }

  // Stop the game loop
  stop() {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      document.getElementById('pause-btn').textContent = 'Resume';
    }
  }

  // Bind the Start button
  bindStartButton() {
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
      // Hide the overlay
      document.getElementById('overlay').classList.add('hidden');
      // Start the simulation
      this.start();
    });
  }

  // Handle cell clicks to toggle cell state or place pattern
  handleCellClick(row, col) {
    if (this.selectedPattern) {
      this.placePattern(row, col, this.selectedPattern);
      this.view.update(this.model.grid);
      // Optionally clear the selected pattern after placement
      // this.selectedPattern = null;
      // document.getElementById('pattern-select').value = '';
    } else {
      const cellValue = this.model.grid[row][col];
      this.model.grid[row][col] = cellValue === 1 ? 0 : 1;
      this.view.update(this.model.grid);
    }
  }

  // Clear the grid
  handleClearGrid() {
    this.model.clearGrid();
    this.view.update(this.model.grid);
    this.view.updateGeneration(this.model.generation);
  }

  // Add random live cells
  handleAddRandomCells() {
    this.model.addRandomCells(0.2); // 20% chance for each cell
    this.view.update(this.model.grid);
  }

  // Handle pause and resume
  handlePauseResume() {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  // **Updated Method: Handle speed change with linear mapping**
  handleSpeedChange(newSpeed) {
    const minSlider = 50;    // Slider minimum value
    const maxSlider = 1000;  // Slider maximum value
    const minInterval = 50;  // Fastest speed (minimum interval)
    const maxInterval = 1000; // Slowest speed (maximum interval)

    // Linear inversion mapping
    // When newSpeed = minSlider (50), interval = maxInterval (1000 ms)
    // When newSpeed = maxSlider (1000), interval = minInterval (50 ms)
    this.speed = maxInterval - ((newSpeed - minSlider) * (maxInterval - minInterval)) / (maxSlider - minSlider);

    // Clamp the speed within the min and max interval
    this.speed = Math.max(minInterval, Math.min(this.speed, maxInterval));

    // Update the speed display
    this.view.updateSpeedDisplay(this.speed);

    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  // Save the grid to a file
  handleSaveGrid() {
    const dataStr = this.model.serializeGrid();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `game_of_life_generation_${this.model.generation}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Load the grid from a file
  handleLoadGrid(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonString = e.target.result;
      const success = this.model.deserializeGrid(jsonString);
      if (success) {
        this.view.update(this.model.grid);
        this.view.updateGeneration(this.model.generation);
        // Reset the file input
        event.target.value = '';
      } else {
        alert('Failed to load the grid. Please ensure the file is valid and matches the current grid size.');
      }
    };
    reader.readAsText(file);
  }

  // Handle pattern selection
  handlePatternSelect(patternName) {
    if (patternName && patterns[patternName]) {
      this.selectedPattern = patterns[patternName];
    } else {
      this.selectedPattern = null;
    }
  }

  // Method to place a pattern onto the grid
  placePattern(row, col, pattern) {
    for (let [dx, dy] of pattern) {
      const r = row + dx;
      const c = col + dy;
      if (this.model._isValidPosition(r, c)) {
        this.model.grid[r][c] = 1;
      }
    }
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  let rows = 30;
  let cols = 50;

  if (window.innerWidth < 800) {
    cols = 30;
  }
  if (window.innerWidth < 500) {
    cols = 20;
  }

  new GameOfLifeController(rows, cols, 'grid-container');
});
