import { useReducer } from "react";
import { State, ActionTypes, Action } from "./gridGameTypes";
import useInterval from "./../../hooks/useInterval";

const sides = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const gameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.activateCell: {
      const newGrid = [...state.grid];
      newGrid[action.payload.x][action.payload.y] = {
        active: true,
        count: 1,
      };
      return {
        ...state,
        grid: newGrid,
      };
    }
    case ActionTypes.deactivateCell: {
      const newGrid = [...state.grid];
      newGrid[action.payload.x][action.payload.y] = {
        active: false,
        count: 0,
      };
      return {
        ...state,
        grid: newGrid,
      };
    }

    case ActionTypes.nextState: {
      //Initialise Empty Grid
      const newGrid = [...Array(state.rows)].map(() =>
        Array(state.cols).fill({ active: false, count: 0 })
      );
      //Update new grid state based on current grid state
      for (let i = 0; i < state.rows; i++) {
        for (let j = 0; j < state.cols; j++) {
          //Count number of live neighbours
          let cnt = 0;
          for (let val of sides) {
            let x1 = val[0] + i;
            let y1 = val[1] + j;
            if (0 <= x1 && x1 < state.rows && 0 <= y1 && y1 < state.cols) {
              cnt += state.grid[x1][y1].active ? 1 : 0;
            }
          }
          //Checking border conditions
          if (state.grid[i][j].active) {
            if (2 <= cnt && cnt <= 3) {
              newGrid[i][j] = {
                active: true,
                count: state.grid[i][j].count + 1,
              };
            } else {
              newGrid[i][j] = { active: false, count: 0 };
            }
          } else {
            if (cnt === 3) {
              newGrid[i][j] = {
                active: true,
                count: state.grid[i][j].count + 1,
              };
            }
          }
        }
      }
      return {
        ...state,
        grid: newGrid,
      };
    }

    case ActionTypes.setSpeed: {
      return {
        ...state,
        speed: action.payload,
        delay: state.delay ? action.payload.value : state.delay,
      };
    }

    case ActionTypes.start: {
      return {
        ...state,
        delay: state.speed.value,
      };
    }

    case ActionTypes.stop: {
      return {
        ...state,
        delay: null,
      };
    }

    case ActionTypes.setCols: {
      return {
        ...state,
        cols: action.payload,
        grid: [...Array(state.rows)].map(() =>
          Array(action.payload).fill({ active: false, count: 0 })
        ),
        delay: null,
      };
    }

    case ActionTypes.setRows: {
      return {
        ...state,
        rows: action.payload,
        grid: [...Array(action.payload)].map(() =>
          Array(state.cols).fill({ active: false, count: 0 })
        ),
        delay: null,
      };
    }

    default: {
      return state;
    }
  }
};

const getInitialState = (rows = 25, cols = 50) => {
  return {
    speed: { label: "Fast", value: 100 },
    delay: null,
    cols,
    rows,
    grid: [...Array(rows)].map(() =>
      Array(cols).fill({ active: false, count: 0 })
    ),
  };
};

const initialState = getInitialState();

const useGridGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const activateCell = (index: { x: number; y: number }) =>
    dispatch({ type: ActionTypes.activateCell, payload: index });

  const deactivateCell = (index: { x: number; y: number }) =>
    dispatch({ type: ActionTypes.deactivateCell, payload: index });

  const nextState = () => dispatch({ type: ActionTypes.nextState });

  const setSpeed = (item: { label: string; value: number }) =>
    dispatch({ type: ActionTypes.setSpeed, payload: item });

  const setCols = (cols: number) =>
    dispatch({ type: ActionTypes.setCols, payload: cols });

  const setRows = (rows: number) =>
    dispatch({ type: ActionTypes.setRows, payload: rows });

  const start = () => dispatch({ type: ActionTypes.start });

  const stop = () => dispatch({ type: ActionTypes.stop });

  useInterval(nextState, state.delay);

  return {
    ...state,
    state,
    activateCell,
    deactivateCell,
    setSpeed,
    nextState,
    setCols,
    setRows,
    start,
    stop,
  };
};

export default useGridGame;
