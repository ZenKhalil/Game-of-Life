export class GameOfLifeModel {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.generation = 0;
    this.grid = this._createGrid();
  }

  // Create a 2D array initialized with zeros (dead cells)
  _createGrid() {
    const grid = [];
    for (let r = 0; r < this.rows; r++) {
      grid[r] = new Array(this.cols).fill(0);
    }
    return grid;
  }

  // Count live neighbors of a cell
  countLiveNeighbors(row, col) {
    let count = 0;
    const dirs = [-1, 0, 1];

    for (let dr of dirs) {
      for (let dc of dirs) {
        if (dr === 0 && dc === 0) continue; // Skip the cell itself
        const r = row + dr;
        const c = col + dc;
        if (this._isValidPosition(r, c) && this.grid[r][c] === 1) {
          count++;
        }
      }
    }
    return count;
  }

  // Decide if a cell lives or dies based on Game of Life rules
  nextCellState(row, col) {
    const liveNeighbors = this.countLiveNeighbors(row, col);
    const cell = this.grid[row][col];

    if (cell === 1) {
      if (liveNeighbors < 2) return 0; // Underpopulation
      if (liveNeighbors === 2 || liveNeighbors === 3) return 1; // Lives on
      if (liveNeighbors > 3) return 0; // Overpopulation
    } else {
      if (liveNeighbors === 3) return 1; // Reproduction
    }
    return 0;
  }

  // Compute the next generation
  computeNextGeneration() {
    const newGrid = this._createGrid();

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        newGrid[r][c] = this.nextCellState(r, c);
      }
    }

    this.grid = newGrid;
    this.generation++;
  }

  // Helper method to check if position is valid
  _isValidPosition(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  // Clear the grid
  clearGrid() {
    this.grid = this._createGrid();
    this.generation = 0;
  }

  // Add random live cells to the grid
  addRandomCells(percentage = 0.1) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (Math.random() < percentage) {
          this.grid[r][c] = 1;
        }
      }
    }
  }

  // Serialize the grid state to a JSON string
  serializeGrid() {
    return JSON.stringify({
      rows: this.rows,
      cols: this.cols,
      generation: this.generation,
      grid: this.grid
    });
  }

  // Load the grid state from a JSON string
  deserializeGrid(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (
        data.rows === this.rows &&
        data.cols === this.cols &&
        Array.isArray(data.grid)
      ) {
        this.grid = data.grid;
        this.generation = data.generation || 0;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error parsing grid data:', error);
      return false;
    }
  }
}
