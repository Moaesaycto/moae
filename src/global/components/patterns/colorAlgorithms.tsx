export type AlgorithmMode = "none" | "random" | "falling" | "wave";

export interface SquareState {
    intensity: number;
    color?: string;
  }
  

export type GridState = SquareState[][];

export type ColorStrategy = (grid: GridState, rows: number, cols: number) => GridState;

export const defaultStrategy: ColorStrategy = (grid) => grid;

// Randomly activate squares in the grid
export const randomStrategy: ColorStrategy = (grid, rows, cols) => {
  const newGrid = grid.map((row) => [...row]); // Clone grid
  const randomRow = Math.floor(Math.random() * rows);
  const randomCol = Math.floor(Math.random() * cols);

  const square = newGrid[randomRow][randomCol];
  newGrid[randomRow][randomCol] = {
    ...square,
    intensity: square.intensity === 1 ? 0 : 1, // Toggle intensity
  };

  return newGrid;
};

// Falling squares strategy: cascades active squares downwards
export const fallingStrategy: ColorStrategy = (grid, rows, cols) => {
  const newGrid = grid.map((row) => [...row]); // Clone grid

  for (let row = rows - 2; row >= 0; row--) {
      for (let col = 0; col < cols; col++) {
          // Skip hovered or manually controlled squares
          if (newGrid[row][col].intensity > 1) continue;

          if (newGrid[row][col].intensity > 0 && newGrid[row + 1][col].intensity === 0) {
              // Move active square down
              newGrid[row + 1][col].intensity = newGrid[row][col].intensity;
              newGrid[row][col].intensity = 0;
          }
      }
  }

  // Start new squares at the top row
  for (let col = 0; col < cols; col++) {
      if (Math.random() < 0.05 && newGrid[0][col].intensity === 0) {
          newGrid[0][col].intensity = 1;
      }
  }

  return newGrid;
};



export const waveStrategy: ColorStrategy = (grid, rows, cols) => {
  const newGrid = grid.map((row) => [...row]); // Clone grid
  const waveSpeed = 0.7; // Speed of wave propagation
  const time = Date.now() * 0.002; // Use current time for animation

  // Adjusted center of the grid
  const centerRow = (rows - 1) / 2; // Adjust for zero-based indexing
  const centerCol = (cols - 1) / 2;

  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
          const distance = Math.sqrt(
              Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
          );

          // Calculate intensity based on distance and time
          const intensity = 0.5 + 0.5 * Math.sin(distance * waveSpeed - time);

          // Clamp intensity between 0 and 1
          newGrid[row][col].intensity = Math.max(0, Math.min(1, intensity));
      }
  }

  return newGrid;
};

  

// Map of algorithms
export const strategyMap: Record<AlgorithmMode, ColorStrategy> = {
  none: defaultStrategy,
  random: randomStrategy,
  falling: fallingStrategy,
  wave: waveStrategy,
};
