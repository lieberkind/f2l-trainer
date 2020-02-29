import React from "react";
import classNames from "classnames";

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

const isInitial = (timer: Timer): boolean => {
  return timer.status === TimerStatus.Initial;
};

const isRunning = (timer: Timer): boolean => {
  return timer.status === TimerStatus.Running;
};

const isReady = (timer: Timer): boolean => {
  return timer.status === TimerStatus.Ready;
};

const format = (timer: Timer): string => {
  const seconds = Math.floor(timer.timer / 100);
  const deciSeconds = timer.timer % 100;
  const paddedDeciSeconds = deciSeconds < 10 ? `0${deciSeconds}` : deciSeconds;

  return `${seconds}.${paddedDeciSeconds}`;
};

const Timer: React.FC<{ timer: Timer }> = props => {
  return (
    <div
      className={classNames([
        "text-4xl",
        "font-mono",
        { "text-green-700": isReady(props.timer) }
      ])}
    >
      {isInitial(props.timer) ? "Ready" : format(props.timer)}
    </div>
  );
};

/*
|------------------------------------------------------------------------------
| Algorithm
|------------------------------------------------------------------------------
*/
const Algorithm: React.FC<{ alg: Alg }> = React.memo(props => {
  const moves = props.alg.scramble.split(" ");
  return (
    <>
      <div className="mb-5 flex">
        {moves.map((move, idx) => {
          return (
            <div
              className={classNames(["text-3xl", { "ml-6": idx !== 0 }])}
              key={idx}
            >
              {move}
            </div>
          );
        })}
      </div>
      <img
        className="block mb-10"
        src={
          process.env.PUBLIC_URL +
          "/assets/fl2cases2/" +
          props.alg.image +
          ".png"
        }
      />
    </>
  );
});

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
  }, [state.timer]);

  const isTimerRunning = isRunning(state.timer);

  React.useEffect(() => {
    if (isTimerRunning) {
      const intervalId = setInterval(() => {
        dispatch({ type: ActionType.IncreaseTimer });
      }, 10);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isTimerRunning]);

  return (
    <div className="mx-auto w-128 flex flex-col items-center pt-5">
      <Algorithm alg={state.currentAlg} />
      <Timer timer={state.timer} />
    </div>
  );
}

export default App;
