import React from "react";
import classNames from "classnames";

import * as Timer from "./Timer";
import algs, { Alg, AlgId, algSets } from "./algs";
import * as Util from "./util";
import CasesModal from "./CasesModal";

const TimerComponent: React.FC<{ timer: Timer.Timer }> = (props) => {
  return (
    <div
      className={classNames([
        "mb-4",
        "text-4xl",
        "font-mono",
        { "text-green-700": Timer.isReady(props.timer) },
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
  (props) => {
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
                  { "ml-6": idx !== 0 },
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

const Times: React.FC<{
  times: Time[];
  dispatch: React.Dispatch<Action>;
}> = React.memo((props) => {
  const sumOfTimes = props.times
    .map((time) => time.timeInDeciSeconds)
    .reduce(sum, 0);
  const avarage =
    props.times.length === 0 ? 0 : sumOfTimes / props.times.length;

  const times = [...props.times].reverse();

  return (
    <div className="max-h-full overflow-y-scroll relative">
      <table className="w-full">
        <thead className="sticky top-0">
          <tr>
            <th className="pl-2 border-b-2 border-teal-300 text-left border-teal-300 sticky top-0 bg-teal-800 text-teal-300">
              Time (avg: {Util.format(avarage)})
            </th>
            <th className="sticky top-0 border-b-2 border-teal-300 bg-teal-800"></th>
          </tr>
        </thead>
        <tbody>
          {times.map((time) => {
            return (
              <tr key={time.recordedAt} className="relative">
                <td className="pl-2 border-b-2 border-teal-300">
                  {Util.format(time.timeInDeciSeconds)}
                </td>
                <td
                  className="border-2 hover:bg-red-800 hover:text-red-300 hover:cursor-pointer border-teal-300 bg-teal-800 text-center text-teal-300"
                  onClick={() =>
                    props.dispatch({
                      type: ActionType.DeleteTime,
                      recordedAt: time.recordedAt,
                    })
                  }
                >
                  x
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

const sum = (a: number, b: number) => a + b;

/*
|------------------------------------------------------------------------------
| Settings
|------------------------------------------------------------------------------
*/
const Settings: React.FC<{
  showSolutions: boolean;
  goToNextCaseAfterSolve: boolean;
  dispatch: React.Dispatch<Action>;
}> = React.memo((props) => {
  const toggleShowSolutions = () =>
    props.dispatch({ type: ActionType.ToggleShowSolutions });

  const toggleGoToNextCaseAfterSolve = () =>
    props.dispatch({ type: ActionType.ToggleGoToNextCaseAfterSolve });

  const showCasesModal = () =>
    props.dispatch({ type: ActionType.ShowCasesModal });
  return (
    <div className="border-b-2 border-bottom border-teal-300 p-2 ">
      <label className="flex items-center mb-2">
        <input
          className="block mr-2"
          type="checkbox"
          checked={props.showSolutions}
          onChange={toggleShowSolutions}
        />
        Show solutions
      </label>
      <label className="flex items-center mb-2">
        <input
          className="block mr-2"
          type="checkbox"
          checked={props.goToNextCaseAfterSolve}
          onChange={toggleGoToNextCaseAfterSolve}
        />
        Go to next case after solve
      </label>
      <button
        className="border-teal-300 block w-full border-2 p-1 bg-teal-800 text-teal-300 rounded-md"
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
  goToNextCaseAfterSolve: boolean;
  times: Time[];
  showCasesModal: boolean;
}

const initialState: State = {
  algsToTrain: algs.map((alg) => alg.id),
  currentAlg: Util.getRandomElement(algs),
  timer: Timer.initial(),
  showSolutions: true,
  goToNextCaseAfterSolve: true,
  times: [],
  showCasesModal: false,
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
  ToggleGoToNextCaseAfterSolve,
  SetAlgsToTrain,
  ShowCasesModal,
  HideCasesModal,
  DeleteTime,
  GoToNextCase,
}

type Action =
  | { type: ActionType.StartTimer }
  | { type: ActionType.StopTimer; stoppedAt: number }
  | { type: ActionType.IncreaseTimer }
  | { type: ActionType.ReadyTimer }
  | { type: ActionType.ToggleShowSolutions }
  | { type: ActionType.ToggleGoToNextCaseAfterSolve }
  | { type: ActionType.SetAlgsToTrain; algsToTrain: AlgId[] }
  | { type: ActionType.ShowCasesModal }
  | { type: ActionType.HideCasesModal }
  | { type: ActionType.DeleteTime; recordedAt: number }
  | { type: ActionType.GoToNextCase };

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
        timer: Timer.start(state.timer),
      };
    }
    case ActionType.StopTimer: {
      if (!Timer.isRunning(state.timer)) {
        return state;
      }

      const time: Time = {
        recordedAt: action.stoppedAt,
        timeInDeciSeconds: state.timer.time,
        alg: state.currentAlg,
      };

      const nextAlgId = state.goToNextCaseAfterSolve
        ? Util.getRandomElement(state.algsToTrain)
        : state.currentAlg.id;

      const nextAlg = algs.find((alg) => alg.id === nextAlgId) ?? algs[0];

      return {
        ...state,
        timer: Timer.stop(state.timer),
        currentAlg: nextAlg,
        times: [...state.times, time],
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
    case ActionType.ToggleGoToNextCaseAfterSolve: {
      return {
        ...state,
        goToNextCaseAfterSolve: !state.goToNextCaseAfterSolve,
      };
    }
    case ActionType.GoToNextCase: {
      const nextAlgId = Util.getRandomElement(state.algsToTrain);
      const nextAlg = algs.find((alg) => alg.id === nextAlgId) ?? algs[0];

      return {
        ...state,
        currentAlg: nextAlg,
      };
    }
    case ActionType.SetAlgsToTrain: {
      const nextAlgId = Util.getRandomElement(action.algsToTrain);
      const nextAlg = algs.find((alg) => alg.id === nextAlgId) ?? algs[0];

      return {
        ...state,
        currentAlg: nextAlg,
        algsToTrain: action.algsToTrain,
      };
    }
    case ActionType.ShowCasesModal: {
      return { ...state, showCasesModal: true };
    }
    case ActionType.HideCasesModal: {
      return { ...state, showCasesModal: false };
    }
    case ActionType.DeleteTime: {
      return {
        ...state,
        times: state.times.filter(
          (time) => time.recordedAt !== action.recordedAt
        ),
      };
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
    const promises = algs.map((alg) => {
      console.log(`Fetching alg: ${alg.id}`);
      return fetch(
        `${process.env.PUBLIC_URL}/assets/fl2cases2/${alg.id}.png`
      ).then(() => {
        console.log(`Alg loaded: ${alg.id}`);
      });
    });

    Promise.all(promises).then(() => {
      console.log("All algs loaded!");
    });
  }, []);

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
        <div className="h-screen border-r-2 border-teal-300 w-64 overflow-hidden">
          <Settings
            showSolutions={state.showSolutions}
            goToNextCaseAfterSolve={state.goToNextCaseAfterSolve}
            dispatch={dispatch}
          />
          <Times times={state.times} dispatch={dispatch} />
        </div>
        <div className="flex pt-2 flex-col items-center justify-between flex-grow">
          <div className="flex flex-col items-center flex-grow w-full">
            <Algorithm
              alg={state.currentAlg}
              showSolutions={state.showSolutions}
            />
            <TimerComponent timer={state.timer} />

            {!state.goToNextCaseAfterSolve ? (
              <button
                className="border-teal-300 border-2 p-1 bg-teal-800 text-teal-300 rounded-md mb-4"
                onClick={() => dispatch({ type: ActionType.GoToNextCase })}
              >
                Next case
              </button>
            ) : null}

            {state.showSolutions ? (
              <div className="w-full border-t-2 border-teal-300 p-2 bg-teal-800 flex-grow text-white">
                <ul className="">
                  <li className="text-teal-300 font-bold">Solutions:</li>
                  {state.currentAlg.solutions.map((solution) => {
                    return <li className="font-mono">{solution}</li>;
                  })}
                </ul>
              </div>
            ) : null}
            <div className="bg-teal-300 text-teal-800 w-full pl-2">
              All cases and solutions are based on{" "}
              <a
                className="underline"
                target="_blank"
                href="https://bit.ly/bestf2l"
              >
                J Perm's best F2L sheet
              </a>
            </div>
          </div>
        </div>
      </div>
      {state.showCasesModal ? (
        <CasesModal
          allCases={algs}
          casesToTrain={state.algsToTrain}
          onCloseModal={(algsToTrain) => {
            dispatch({ type: ActionType.HideCasesModal });
            dispatch({ type: ActionType.SetAlgsToTrain, algsToTrain });
          }}
        ></CasesModal>
      ) : null}
    </div>
  );
}

export default App;
