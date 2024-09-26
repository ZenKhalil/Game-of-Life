export class GameOfLifeView {
  constructor(rows, cols, containerId) {
    this.rows = rows;
    this.cols = cols;
    this.container = document.getElementById(containerId);
    this.gridElements = [];
    this._createGrid();
  }

  // Create the visual grid
  _createGrid() {
    const gridElement = document.createElement('div');
    gridElement.classList.add('game-grid');

    // Set CSS Grid properties dynamically
    gridElement.style.display = 'grid';
    gridElement.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;

    for (let r = 0; r < this.rows; r++) {
      this.gridElements[r] = [];
      for (let c = 0; c < this.cols; c++) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.row = r;
        cellDiv.dataset.col = c;
        this.gridElements[r][c] = cellDiv;
        gridElement.appendChild(cellDiv);
      }
    }
    this.container.innerHTML = '';
    this.container.appendChild(gridElement);
  }

  // Update the visual grid based on the model's grid
  update(modelGrid) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.gridElements[r][c];
        if (modelGrid[r][c] === 1) {
          cell.classList.add('alive');
        } else {
          cell.classList.remove('alive');
        }
      }
    }
  }

  // Update the generation counter
  updateGeneration(generation) {
    const genCounter = document.getElementById('generation-counter');
    genCounter.textContent = `Generation: ${generation}`;
  }

  // Bind click event to cells for manual toggling
  bindCellClick(handler) {
    this.container.addEventListener('click', event => {
      if (event.target && event.target.classList.contains('cell')) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        handler(row, col);
      }
    });
  }


  // Bind pattern selection
  bindPatternSelect(handler) {
    const patternSelect = document.getElementById('pattern-select');
    patternSelect.addEventListener('change', (event) => {
      const patternName = event.target.value;
      handler(patternName);
    });
  }
  

  // Bind control buttons
  bindControls(
    clearHandler,
    randomHandler,
    pauseResumeHandler,
    patternSelectHandler
  ) {
    const clearBtn = document.getElementById('clear-btn');
    const randomBtn = document.getElementById('random-btn');
    const pauseBtn = document.getElementById('pause-btn');

    clearBtn.addEventListener('click', clearHandler);
    randomBtn.addEventListener('click', randomHandler);
    pauseBtn.addEventListener('click', pauseResumeHandler);

    // Bind pattern selection
    this.bindPatternSelect(patternSelectHandler);
  }

  // **Updated Method: Populate Pattern Selector**
  populatePatternSelector(patterns) {
    const patternSelect = document.getElementById('pattern-select');

    // Clear existing options
    patternSelect.innerHTML = '';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '--Default--';
    patternSelect.appendChild(defaultOption);

    // Iterate over pattern names
    Object.keys(patterns).forEach(patternName => {
      const option = document.createElement('option');
      option.value = patternName;
      option.textContent = patternName;
      patternSelect.appendChild(option);
    });
  }
}
