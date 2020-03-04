import React from "react";
import classNames from "classnames";

import * as Timer from "./Timer";
import algs, { Alg, AlgId, algSets } from "./algs";
import * as Util from "./util";
import CasesModal from "./CasesModal";

const TimerComponent: React.FC<{ timer: Timer.Timer }> = props => {
  return (
    <div
      className={classNames([
        "text-4xl",
        "font-mono",
        { "text-green-700": Timer.isReady(props.timer) }
      ])}
    >
      {Timer.isInitial(props.timer)
        ? "Ready"
        : Util.format(Timer.getTime(props.timer))}
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
            src={`${process.env.PUBLIC_URL}/assets/fl2cases2/${props.alg.id}.png`}
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
| Time
|------------------------------------------------------------------------------
*/
interface Time {
  recordedAt: number;
  timeInDeciSeconds: number;
  alg: Alg;
}

const Times: React.FC<{ times: Time[] }> = props => {
  const sumOfTimes = props.times
    .map(time => time.timeInDeciSeconds)
    .reduce(sum, 0);
  const avarage =
    props.times.length === 0 ? 0 : sumOfTimes / props.times.length;

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl">
        Times <span className="text-gray-500">avg: {Util.format(avarage)}</span>
      </h3>
      <div className="flex-grow flex-shrink overflow-y-scroll">
        {props.times.map(time => {
          return (
            <div className="inline-block text px-2 py-1 mb-1 bg-red-200 rounded-sm mr-1 text-sm">
              {Util.format(time.timeInDeciSeconds)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const sum = (a: number, b: number) => a + b;

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

  const showCasesModal = () =>
    props.dispatch({ type: ActionType.ShowCasesModal });
  return (
    <div className="flex">
      <button
        className="border-blue-500 border-2 p-2 bg-blue-600 text-white rounded-full"
        onClick={toggleShowSolutions}
      >
        {props.showSolutions ? "Hide solutions" : "Show solutions"}
      </button>
      <button
        className="border-blue-500 border-2 p-2 bg-blue-600 text-white rounded-full"
        onClick={showCasesModal}
      >
        Select cases...
      </button>
    </div>
  );
});

/*
|------------------------------------------------------------------------------
| State
|------------------------------------------------------------------------------
*/
interface State {
  algsToTrain: AlgId[];
  currentAlg: Alg;
  timer: Timer.Timer;
  showSolutions: boolean;
  times: Time[];
  showCasesModal: boolean;
}

const initialState: State = {
  algsToTrain: algs.map(alg => alg.id),
  currentAlg: Util.getRandomElement(algs),
  timer: Timer.initial(),
  showSolutions: true,
  times: [],
  showCasesModal: false
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
  ToggleShowSolutions,
  SetAlgsToTrain,
  ShowCasesModal,
  HideCasesModal
}

type Action =
  | { type: ActionType.StartTimer }
  | { type: ActionType.StopTimer; stoppedAt: number }
  | { type: ActionType.IncreaseTimer }
  | { type: ActionType.ReadyTimer }
  | { type: ActionType.ToggleShowSolutions }
  | { type: ActionType.SetAlgsToTrain; algsToTrain: AlgId[] }
  | { type: ActionType.ShowCasesModal }
  | { type: ActionType.HideCasesModal };

/*
|------------------------------------------------------------------------------
| Reducer
|------------------------------------------------------------------------------
*/
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.StartTimer: {
      if (!Timer.isReady(state.timer)) {
        return state;
      }

      return {
        ...state,
        timer: Timer.start(state.timer)
      };
    }
    case ActionType.StopTimer: {
      if (!Timer.isRunning(state.timer)) {
        return state;
      }

      const time: Time = {
        recordedAt: action.stoppedAt,
        timeInDeciSeconds: state.timer.time,
        alg: state.currentAlg
      };

      const nextAlgId =
        state.algsToTrain[Util.getRandomInt(state.algsToTrain.length)];

      const nextAlg = algs.find(alg => alg.id === nextAlgId) ?? algs[0];

      return {
        ...state,
        timer: Timer.stop(state.timer),
        currentAlg: nextAlg,
        times: [...state.times, time]
      };
    }
    case ActionType.IncreaseTimer: {
      if (!Timer.isRunning(state.timer)) {
        return state;
      }

      return { ...state, timer: Timer.increase(state.timer) };
    }
    case ActionType.ReadyTimer: {
      if (!Timer.isStopped(state.timer) && !Timer.isInitial(state.timer)) {
        return state;
      }

      return { ...state, timer: Timer.getReady(state.timer) };
    }
    case ActionType.ToggleShowSolutions: {
      return { ...state, showSolutions: !state.showSolutions };
    }
    case ActionType.SetAlgsToTrain: {
      const nextAlgId =
        action.algsToTrain[Util.getRandomInt(action.algsToTrain.length)];

      const nextAlg = algs.find(alg => alg.id === nextAlgId) ?? algs[0];

      return {
        ...state,
        currentAlg: nextAlg,
        algsToTrain: action.algsToTrain
      };
    }
    case ActionType.ShowCasesModal: {
      return { ...state, showCasesModal: true };
    }
    case ActionType.HideCasesModal: {
      return { ...state, showCasesModal: false };
    }
    default:
      return state;
  }
};

/*
|------------------------------------------------------------------------------
| App
|------------------------------------------------------------------------------
*/
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const isTimerRunning = Timer.isRunning(state.timer);
  const isTimerReady = Timer.isReady(state.timer);

  React.useEffect(() => {
    const promises = algs.map(alg => {
      const promise = new Promise((resolve, reject) => {
        let img = new Image();
        img.src = `${process.env.PUBLIC_URL}/assets/fl2cases2/${alg.id}.png`;
        img.onload = () => {
          resolve();
        };
      });
    });

    Promise.all(promises).then(() => {
      console.log("all images loaded ");
    });
  }, [algs]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTimerRunning) {
        e.preventDefault();
        dispatch({ type: ActionType.StopTimer, stoppedAt: Date.now() });
        return;
      }

      if (e.keyCode === 32) {
        e.preventDefault();
        dispatch({ type: ActionType.ReadyTimer });
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
    <div>
      <div className="h-screen w-full flex">
        <div className="mx-auto flex py-2 flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <Algorithm
              alg={state.currentAlg}
              showSolutions={state.showSolutions}
            />
            <TimerComponent timer={state.timer} />
          </div>
          <Settings showSolutions={state.showSolutions} dispatch={dispatch} />
        </div>
        <div className="h-screen border-l-2 border-gray-300 p-2 w-64">
          <Times times={state.times} />
        </div>
      </div>
      {state.showCasesModal ? (
        <CasesModal
          allCases={algs}
          casesToTrain={state.algsToTrain}
          onCloseModal={algsToTrain => {
            dispatch({ type: ActionType.HideCasesModal });
            dispatch({ type: ActionType.SetAlgsToTrain, algsToTrain });
          }}
        ></CasesModal>
      ) : null}
    </div>
  );
}

export default App;
