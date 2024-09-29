# Conway's Game of Life


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

**Conway's Game of Life** is a cellular automaton devised by mathematician John Horton Conway in 1970. It's a zero-player game that evolves based on its initial state, requiring no further input. This project brings the Game of Life to the web, allowing users to interactively explore various patterns, control simulation speed, and manage grid states with ease.

## Features

- **Interactive Grid:** Click to toggle cell states (alive or dead).
- **Pattern Selection:** Choose from a variety of predefined patterns such as Oscillators, Spaceships, Still Lifes, Methuselahs, and the Gosper Glider Gun.
- **Dynamic Speed Control:** Adjust the simulation speed using a responsive slider.
- **Start/Pause Functionality:** Control the simulation flow with a prominent Start button and pause/resume options.
- **Grid Management:**
  - **Clear Grid:** Reset the entire grid.
  - **Add Random Cells:** Populate the grid with random live cells.
  - **Save Grid:** Export the current grid state as a JSON file.
  - **Load Grid:** Import a previously saved grid state.
- **Responsive Design:** Ensures optimal viewing across various devices and screen sizes.
- **Accessibility:** Keyboard navigable and screen reader friendly.

## Demo

[Live Demo Link]()


## Installation

To run Conway's Game of Life locally on your machine, follow these steps:

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ZenKhalil/Game-of-Life.git

2. **Navigate to the Project Directory:**

 ```bash
 cd Game-of-Life
```
3. **Open index.html in Your Browser:**

- You can simply double-click the index.html file, or
- Use a live server extension in your code editor for a better development experience.

```bash
# If you have Live Server installed in VS Code
code .
```
Then, right-click on index.html and select "Open with Live Server".

### Usage

1. Launch the Application:

- Upon opening the application, you'll see an overlay with a prominent "Start" button.

2. Start the Simulation:
- Click the "Start" button to begin the simulation. The overlay will disappear, and the simulation will commence.

3. Interact with the Grid:
- Toggle Cells: Click on individual cells to toggle their state between alive and dead.

- Select Patterns:
  - Use the "Select Pattern" dropdown to choose a predefined pattern.
  - After selecting a pattern, click on the grid to place it at the desired location.

4. Control the Simulation:

- Speed Slider: Drag the slider to the right to increase simulation speed or to the left to decrease it. The current speed in milliseconds is displayed next to the slider.
- Pause/Resume: Click the "Pause" button to halt the simulation. Click again to "Resume".
- Clear Grid: Click the "Clear Grid" button to reset all cells.
- Add Random Cells: Click the "Add Random Cells" button to populate the grid with random live cells.

5. Manage Grid States:
- Save Grid: Click the "Save" button to download the current grid state as a JSON file.
- Load Grid: Click the "Load" button and select a previously saved JSON file to restore the grid state.

6. View Generation Count:
- The "Generation" counter in the header updates in real-time to show the current generation count.

## Project Structure

gol-project/
├── index.html
├── styles.css
├── controller.js
├── view.js
├── model.js
├── patterns.js
├── README.md

index.html: The main HTML file containing the structure of the application.

styles.css: CSS file for styling the application.

controller.js: Handles the application logic, including event bindings and simulation control.

view.js: Manages the visual representation of the grid and UI updates.

model.js: Contains the Game of Life logic, managing the grid state and generation computations.

patterns.js: Defines various predefined patterns that users can select and place on the grid.

## Technologies Used

HTML5: Markup language for structuring the application.
CSS3: Styling and responsive design.
JavaScript (ES6 Modules): Application logic and interactivity.
Font Awesome: Icons used for buttons like Save and Load.
Google Fonts: Custom fonts for enhanced typography.

## Contributing
Contributions are welcome! If you'd like to improve the project, please follow these steps:

1. Fork the Repository:

Click the "Fork" button at the top right of the repository page to create your own copy.

2. Clone Your Fork:
```bash
git clone https://github.com/ZenKhalil/Game-of-Life.git
```
3. Create a New Branch:
```bash
git checkout -b feature/improve-pattern-selection
```

4. Make your changes:
   Implement the diresed features or fixes.

5. Commit the changes:
```bash
git commit -m "Improve pattern selection dropdown to display pattern names correctly"
```

6. Push to your fork:
```bash
git push origin feature/improve-pattern-selection
```

7. Create a pull request:
Navigate to your forked repository on GitHub and click the "Compare & pull request" button.

