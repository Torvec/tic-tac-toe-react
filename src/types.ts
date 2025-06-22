// Game State Context

export type GameStateContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

// All possible types for each game state except for Game Cells

export type Screen = "gameModeSelect" | "howToPlay" | "game";
export type GameMode = "classic" | "ultimate" | undefined;
export type Player = "X" | "O";
export type Cell = "X" | "O" | " ";
export type Grid = "active" | "inactive" | "X" | "O" | "draw";
export type Board = "play" | "xWon" | "oWon" | "Draw";

// Game State Reducer

export type State = {
  currentScreen: Screen;
  gameMode: GameMode;
  currentPlayer: Player;
  cellValues: Cell[][];
  gridState: Grid;
  boardState: Board;
  reset: boolean;
};

export type Action =
  | { type: "setCurrentScreen"; payload: Screen }
  | { type: "setGameMode"; payload: GameMode }
  | { type: "setCurrentPlayer"; payload: Player }
  | { type: "setCellValues"; payload: Cell[][] }
  | { type: "setGridState"; payload: Grid }
  | { type: "setBoardState"; payload: Board }
  | { type: "triggerReset" }
  | { type: "completeReset" };

type ButtonTypes = "large" | "small";

export type ButtonProps = {
  children: React.ReactNode;
  type: ButtonTypes;
  onClick: () => void;
}

export type CellProps = {
  cellValue: " " | "X" | "O";
  onCellClick: () => void;
};

export type GridProps = {
  gridIndex: number;
  cellValues: (" " | "X" | "O")[];
  onCellClick: (gridIndex: number, cellIndex: number) => void;
};