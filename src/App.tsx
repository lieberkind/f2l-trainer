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
const Algorithm: React.FC<{ alg: Alg; showSolutions: boolean }> = React.memo(
  props => {
    const moves = props.alg.scramble.split(" ");
    return (
      <>
        <div className="mb-5 flex">
          {moves.map((move, idx) => {
            return (
              <div
                className={classNames([
                  "text-3xl",
                  "font-mono",
                  { "ml-6": idx !== 0 }
                ])}
                key={idx}
              >
                {move}
              </div>
            );
          })}
        </div>
        <div className="flex items-center mb-10">
          <img
            className="block"
            src={
              process.env.PUBLIC_URL +
              "/assets/fl2cases2/" +
              props.alg.image +
              ".png"
            }
          />
          {props.showSolutions ? (
            <ul className="ml-10">
              <li className="uppercase text-gray-600">Solutions:</li>
              {props.alg.solutions.map(solution => {
                return <li className="font-mono">{solution}</li>;
              })}
            </ul>
          ) : null}
        </div>
      </>
    );
  }
);

/*
|------------------------------------------------------------------------------
| Settings
|------------------------------------------------------------------------------
*/
const Settings: React.FC<{
  showSolutions: boolean;
  dispatch: React.Dispatch<Action>;
}> = React.memo(props => {
  const toggleShowSolutions = () =>
    props.dispatch({ type: ActionType.ToggleShowSolutions });
  return (
    <button
      className="border-gray-500 border-2 p-2 bg-gray-600"
      onClick={toggleShowSolutions}
    >
      {props.showSolutions ? "Hide solutions" : "Show solutions"}
    </button>
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
  showSolutions: boolean;
}

const initialState: State = {
  currentAlg: algs[Util.getRandomInt(algs.length)],
  timer: initialTimer(),
  showSolutions: true
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
  ReadyTimer,
  ToggleShowSolutions
}

type Action =
  | { type: ActionType.StartTimer }
  | { type: ActionType.StopTimer }
  | { type: ActionType.IncreaseTimer }
  | { type: ActionType.ReadyTimer }
  | { type: ActionType.ToggleShowSolutions };

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
    case ActionType.ToggleShowSolutions: {
      return { ...state, showSolutions: !state.showSolutions };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const isTimerRunning = isRunning(state.timer);
  const isTimerReady = isReady(state.timer);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.keyCode === 32) {
        if (isTimerRunning) {
          dispatch({ type: ActionType.StopTimer });
        } else {
          dispatch({ type: ActionType.ReadyTimer });
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.keyCode === 32 && isTimerReady) {
        dispatch({ type: ActionType.StartTimer });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [isTimerRunning, isTimerReady]);

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
    <div className="mx-auto flex flex-col items-center justify-between pt-5 pb-5 h-screen">
      <div className="flex flex-col items-center">
        <Algorithm alg={state.currentAlg} showSolutions={state.showSolutions} />
        <Timer timer={state.timer} />
      </div>
      <Settings showSolutions={state.showSolutions} dispatch={dispatch} />
    </div>
  );
}

export default App;
