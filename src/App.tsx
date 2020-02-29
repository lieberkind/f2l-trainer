import React from "react";

import algs, { Alg } from "./algs";
import * as Util from "./util";

/*
|------------------------------------------------------------------------------
| Timer
|------------------------------------------------------------------------------
*/
enum TimerStatus {
  Initial,
  Ready,
  Running,
  Stopped
}

interface Timer {
  status: TimerStatus;
  timer: number;
}

const Timer: React.FC<{ timer: Timer }> = props => {
  if (props.timer.status === TimerStatus.Initial) {
    return <div>Ready</div>;
  }

  if (props.timer.status === TimerStatus.Ready) {
    return <div className="text-green-500">{props.timer.timer}</div>;
  }

  return <div>{props.timer.timer}</div>;
};

const initialTimer = (): Timer => {
  return { status: TimerStatus.Initial, timer: 0 };
};

const stopTimer = (timer: Timer): Timer => {
  return { ...timer, status: TimerStatus.Stopped };
};

const startTimer = (timer: Timer): Timer => {
  return { ...timer, status: TimerStatus.Running };
};

const readyTimer = (timer: Timer): Timer => {
  return { ...timer, status: TimerStatus.Ready, timer: 0 };
};

const increaseTimer = (timer: Timer): Timer => {
  return { status: TimerStatus.Running, timer: timer.timer + 1 };
};

const isRunning = (timer: Timer): boolean => {
  return timer.status === TimerStatus.Running;
};

const isReady = (timer: Timer): boolean => {
  return timer.status === TimerStatus.Ready;
};

/*
|------------------------------------------------------------------------------
| State
|------------------------------------------------------------------------------
*/
interface State {
  currentAlg: Alg;
  timer: Timer;
}

const initialState = {
  currentAlg: algs[Util.getRandomInt(algs.length)],
  timer: initialTimer()
};

/*
|------------------------------------------------------------------------------
| Actions
|------------------------------------------------------------------------------
*/
enum ActionType {
  StartTimer,
  StopTimer,
  IncreaseTimer,
  ReadyTimer
}

type Action =
  | { type: ActionType.StartTimer }
  | { type: ActionType.StopTimer }
  | { type: ActionType.IncreaseTimer }
  | { type: ActionType.ReadyTimer };

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
        timer: startTimer(state.timer)
      };
    }
    case ActionType.StopTimer: {
      return {
        ...state,
        timer: stopTimer(state.timer),
        currentAlg: algs[Util.getRandomInt(algs.length)]
      };
    }
    case ActionType.IncreaseTimer: {
      return { ...state, timer: increaseTimer(state.timer) };
    }
    case ActionType.ReadyTimer: {
      return { ...state, timer: readyTimer(state.timer) };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 32) {
        if (isRunning(state.timer)) {
          dispatch({ type: ActionType.StopTimer });
        } else {
          dispatch({ type: ActionType.ReadyTimer });
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.keyCode === 32 && isReady(state.timer)) {
        dispatch({ type: ActionType.StartTimer });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  React.useEffect(() => {
    if (isRunning(state.timer)) {
      const intervalId = setInterval(() => {
        dispatch({ type: ActionType.IncreaseTimer });
      }, 10);

      return () => {
        console.log("I am called...");
        clearInterval(intervalId);
      };
    }
  }, [state.timer.status]);

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
          if (isRunning(state.timer)) {
            dispatch({ type: ActionType.StopTimer });
          } else {
            dispatch({ type: ActionType.StartTimer });
          }
        }}
      >
        {isRunning(state.timer) ? "Stop timer" : "Start timer"}
      </button>
      <Timer timer={state.timer} />
    </div>
  );
}

export default App;
