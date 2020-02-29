import React from "react";

import algs, { Alg } from "./algs";
import * as Util from "./util";

/*
|------------------------------------------------------------------------------
| State
|------------------------------------------------------------------------------
*/
interface State {
  currentAlg: Alg;
  timer: number;
  timerIsRunning: boolean;
}

const initialState = {
  currentAlg: algs[Util.getRandomInt(algs.length)],
  timer: 0,
  timerIsRunning: false
};

/*
|------------------------------------------------------------------------------
| Actions
|------------------------------------------------------------------------------
*/
enum ActionType {
  StartTimer,
  StopTimer,
  IncreaseTimer
}

type Action =
  | { type: ActionType.StartTimer }
  | { type: ActionType.StopTimer }
  | { type: ActionType.IncreaseTimer };

/*
|------------------------------------------------------------------------------
| Reducer
|------------------------------------------------------------------------------
*/
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.StartTimer: {
      return {
        ...state,
        timerIsRunning: true,
        timer: 0
      };
    }
    case ActionType.StopTimer: {
      return {
        ...state,
        timerIsRunning: false,
        currentAlg: algs[Util.getRandomInt(algs.length)]
      };
    }
    case ActionType.IncreaseTimer: {
      return { ...state, timer: state.timer + 1 };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const toggleTimer = (e: KeyboardEvent) => {
      if (e.keyCode === 32) {
        if (state.timerIsRunning) {
          dispatch({ type: ActionType.StopTimer });
        } else {
          dispatch({ type: ActionType.StartTimer });
        }
      }
    };

    document.addEventListener("keydown", toggleTimer);

    return () => {
      document.removeEventListener("keydown", toggleTimer);
    };
  });

  React.useEffect(() => {
    if (state.timerIsRunning) {
      const intervalId = setInterval(() => {
        dispatch({ type: ActionType.IncreaseTimer });
      }, 10);

      return () => {
        console.log("I am called...");
        clearInterval(intervalId);
      };
    }
  }, [state.timerIsRunning]);

  return (
    <div>
      <h1 className="text-3xl">Scramble: {state.currentAlg.scramble}</h1>
      <img
        src={
          process.env.PUBLIC_URL +
          "/assets/f2lcases/" +
          state.currentAlg.image +
          ".png"
        }
      />
      <button
        className="border-gray-900 border-2 p-4"
        onClick={() => {
          if (state.timerIsRunning) {
            dispatch({ type: ActionType.StopTimer });
          } else {
            dispatch({ type: ActionType.StartTimer });
          }
        }}
      >
        {state.timerIsRunning ? "Stop timer" : "Start timer"}
      </button>
      Timer {state.timer}
    </div>
  );
}

export default App;
