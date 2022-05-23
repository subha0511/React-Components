export type Cell = {
  active: true | false;
  count: number;
};

export type State = {
  cols: number;
  rows: number;
  speed: { label: string; value: number };
  delay: number | null;
  grid: Array<Array<Cell>>;
};

export type Action =
  | {
      type: ActionTypes.setCols | ActionTypes.setRows;
      payload: number;
    }
  | {
      type: ActionTypes.activateCell | ActionTypes.deactivateCell;
      payload: { x: number; y: number };
    }
  | {
      type: ActionTypes.setSpeed;
      payload: { label: string; value: number };
    }
  | { type: ActionTypes.nextState | ActionTypes.start | ActionTypes.stop };

export enum ActionTypes {
  activateCell = "ACTIVATE_CELL",
  deactivateCell = "DEACTIVE_CELL",
  setSpeed = "SET_SPEED",
  start = "START",
  stop = "STOP",
  setCols = "SET_COLS",
  setRows = "SET_ROWS",
  nextState = "NEXT_STATE",
}
