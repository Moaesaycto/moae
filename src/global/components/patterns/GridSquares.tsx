import React, { useEffect, useState, useRef } from "react";
import { strategyMap, AlgorithmMode, GridState } from "./colorAlgorithms";
import options from "../../../options.json";
import { useDisplaySettings } from "../../contexts/DisplayContext";

interface GridSquaresProps {
    mode?: AlgorithmMode; // Mode for algorithm
    squareSize?: number; // Size of each square
    gap?: number; // Gap between squares
}

const GridSquares: React.FC<GridSquaresProps> = ({
    mode = "none",
    squareSize = 100,
    gap = 10,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);
    const [grid, setGrid] = useState<GridState>([]);

    const { displaySettings, } = useDisplaySettings();

    mode = displaySettings.bgStrategy;

    // Store last hovered cell to avoid repeated updates if mouse doesn't move cells
    const lastHoveredCell = useRef<{ row: number; col: number } | null>(null);

    // Calculate grid dimensions
    const calculateGrid = () => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
    
        // Use Math.ceil to ensure full coverage
        const newCols = Math.ceil(containerWidth / (squareSize + gap));
        const newRows = Math.ceil(containerHeight / (squareSize + gap));
    
        setRows(newRows);
        setCols(newCols);
    };

    // Initialize grid
    useEffect(() => {
        calculateGrid();
        window.addEventListener("resize", calculateGrid);
        return () => window.removeEventListener("resize", calculateGrid);
    }, []);

    useEffect(() => {
        const newGrid: GridState = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                intensity: 0, // Initialize all squares to "off"
            }))
        );
        setGrid(newGrid);
    }, [rows, cols]);

    // Apply selected strategy
    useEffect(() => {
        const interval = setInterval(() => {
            setGrid((prev) => strategyMap[mode](prev, rows, cols));
        }, 100);
        return () => clearInterval(interval);
    }, [mode, rows, cols]);

    useEffect(() => {
        // Refresh the grid when mode changes
        const newGrid: GridState = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                intensity: 0, // Reset all squares to "off"
            }))
        );
        setGrid(newGrid);
    }, [mode, rows, cols]);

    // Global mouse move handler to simulate hover
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || rows === 0 || cols === 0) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Determine which cell the mouse is over
            const cellWidth = squareSize + gap;
            const cellHeight = squareSize + gap;

            const col = Math.floor(x / cellWidth);
            const row = Math.floor(y / cellHeight);

            // Check bounds
            if (row >= 0 && row < rows && col >= 0 && col < cols) {
                // Only trigger hover effect if hovered cell changed
                if (!lastHoveredCell.current || lastHoveredCell.current.row !== row || lastHoveredCell.current.col !== col) {
                    lastHoveredCell.current = { row, col };
                    triggerHoverEffect(row, col);
                }
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [rows, cols, squareSize, gap]);

    const triggerHoverEffect = (rowIndex: number, colIndex: number) => {
        setGrid((prev) => {
            const newGrid = prev.map((row) => [...row]);
    
            // Temporarily mark the square as hovered
            newGrid[rowIndex][colIndex].intensity = 2; // Higher intensity for hover
    
            // Reset hover effect after a delay
            setTimeout(() => {
                setGrid((current) => {
                    const resetGrid = current.map((row) => [...row]);
                    if (resetGrid[rowIndex][colIndex].intensity === 2) {
                        resetGrid[rowIndex][colIndex].intensity = 0; // Reset to "off"
                    }
                    return resetGrid;
                });
            }, 100);
    
            return newGrid;
        });
    };
    
    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden relative"
            style={{
                position: "relative",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, ${squareSize}px)`,
                    gridTemplateRows: `repeat(${rows}, ${squareSize}px)`,
                    gap: `${gap}px`,
                }}
            >
                {grid.map((row, rowIndex) =>
                    row.map((square, colIndex) => {
                        // Calculate base color
                        const baseColor = interpolateColor(
                            options.grid.off,
                            options.grid.on,
                            Math.min(1, square.intensity)
                        );

                        // If intensity > 1, we show the hover color
                        const color =
                            square.intensity > 1
                                ? options.grid.hover === "none"
                                    ? `#${Math.floor(Math.random() * 16777215).toString(16)}` // Random color
                                    : options.grid.hover // Hover color
                                : baseColor;

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                style={{
                                    backgroundColor: color,
                                    width: `${squareSize}px`,
                                    height: `${squareSize}px`,
                                    transition: square.intensity > 1 ? "background-color 0.1s" : "background-color 0.5s",
                                    borderRadius: "10%"
                                }}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

// Helper: Linear interpolation between two colors
function interpolateColor(offColor: string, onColor: string, intensity: number) {
    const parseHex = (hex: string) =>
        hex.match(/[a-fA-F0-9]{2}/g)!.map((c) => parseInt(c, 16));
    const [r1, g1, b1] = parseHex(offColor);
    const [r2, g2, b2] = parseHex(onColor);

    const r = Math.round(r1 + (r2 - r1) * intensity);
    const g = Math.round(g1 + (g2 - g1) * intensity);
    const b = Math.round(b1 + (b2 - b1) * intensity);

    return `rgb(${r}, ${g}, ${b})`;
}

export default GridSquares;
