import React from "react";

/*
|------------------------------------------------------------------------------
| State
|------------------------------------------------------------------------------
*/
interface State {
  timer: number;
  timerIsRunning: boolean;
}

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
      return { ...state, timerIsRunning: true, timer: 0 };
    }
    case ActionType.StopTimer: {
      return { ...state, timerIsRunning: false };
    }
    case ActionType.IncreaseTimer: {
      return { ...state, timer: state.timer + 1 };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    timer: 0,
    timerIsRunning: false
  });

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
