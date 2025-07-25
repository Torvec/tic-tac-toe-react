export type GameStateContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export type GameMode = "classic" | "ultimate"
export type Screen = "select" | "how to play" | GameMode;
export type Player = "X" | "O";
export type Result = "wonX" | "wonO" | "draw";
export type Cell = "" | Player;
export type Grid = "enabled" | "disabled" | Result;
export type Board = "play" | Result;

export type State = {
  currentScreen: Screen;
  currentPlayer: Player;
  boardState: Board;
  gridState: Grid[];
  cellValues: Cell[][];
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
