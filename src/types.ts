export type GameStateContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export type Screen = "select" | "how to play" | "classic" | "ultimate";
export type Player = "X" | "O";
export type Cell = "" | Player;
export type Grid = "enabled" | "disabled" | "wonX" | "wonO" | "draw";
export type Board = "play" | "wonX" | "wonO" | "draw";

// Game State Reducer

export type State = {
  currentScreen: Screen;
  currentPlayer: Player;
  cellValues: Cell[][];
  gridState: Grid[];
  boardState: Board;
};

export type Action =
  | { type: "setCurrentScreen"; payload: Screen }
  | { type: "setCurrentPlayer"; payload: Player }
  | { type: "setCellValues"; payload: Cell[][] }
  | { type: "setGridState"; payload: { gridIndex: number; state: Grid } }
  | { type: "setBoardState"; payload: Board }
  | { type: "triggerReset" };

// UI COMPONENT PROPS

export type PlayerIndicatorProps = {
  player: Player;
  opacity: string;
};

export type GameGridProps = {
  gridIndex: number;
};

export type GameCellProps = {
  gridIndex: number;
  cellValue: Cell;
  onCellClick: () => void;
};

export type ButtonProps = {
  children: React.ReactNode;
  type: "large" | "small";
  onClick: () => void;
};
