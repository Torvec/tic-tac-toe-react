// Game State Context

export type GameStateContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

// All possible types for each game state

export type Screen = "select" | "howTo" | "game";
export type GameMode = null | "classic" | "ultimate";
export type Player = "X" | "O";
export type Cell = null | Player;
export type Grid = "enabled" | "disabled" | { won: Player } | "draw";
export type Board = "play" | { won: Player } | "draw";

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

// UI COMPONENT PROPS

export type PlayerIndicatorProps = {
  player: Player;
  opacity: string;
};

export type GridProps = {
  gridIndex: number;
  cellValues: Cell[];
  onCellClick: (gridIndex: number, cellIndex: number) => void;
  gridState: Grid;
  boardState: Board;
};

export type CellProps = {
  cellValue: Cell;
  onCellClick: () => void;
  gridState: Grid;
  boardState: Board;
};

export type ButtonProps = {
  children: React.ReactNode;
  type: "large" | "small";
  onClick: () => void;
};
