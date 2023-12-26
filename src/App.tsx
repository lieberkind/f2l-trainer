import React from "react";
import { Button } from "@mui/joy";

import * as Timer from "./Timer";
import algs, { Alg, AlgId } from "./algs";
import * as Util from "./util";
import CasesModal from "./CasesModal";
import { Cube } from "./cube";

const TimerComponent = (props: { timer: Timer.Timer }) => {
  return (
    <div>
      {Timer.isInitial(props.timer)
        ? "Ready"
        : Util.format(Timer.getTime(props.timer))}
    </div>
  );
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
| Algorithm
|------------------------------------------------------------------------------
*/
const Algorithm = React.memo((props: { alg: Alg; showSolutions: boolean }) => {
  const moves = props.alg.scramble.split(" ");
  return (
    <>
      <div>
        {moves.map((move, idx) => {
          return <div key={idx}>{move}</div>;
        })}
      </div>
      <div>
        <Cube scramble={props.alg.scramble} height={200} width={200} />
      </div>
    </>
  );
});

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

const Times = React.memo(
  (props: { times: Time[]; dispatch: React.Dispatch<Action> }) => {
    const sumOfTimes = props.times
      .map((time) => time.timeInDeciSeconds)
      .reduce(sum, 0);
    const avarage =
      props.times.length === 0 ? 0 : sumOfTimes / props.times.length;

    const times = [...props.times].reverse();

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Time (avg: {Util.format(avarage)})</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {times.map((time) => {
              return (
                <tr key={time.recordedAt}>
                  <td>{Util.format(time.timeInDeciSeconds)}</td>
                  <td
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
  }
);

const sum = (a: number, b: number) => a + b;

/*
|------------------------------------------------------------------------------
| Settings
|------------------------------------------------------------------------------
*/
const Settings = React.memo(
  (props: {
    showSolutions: boolean;
    goToNextCaseAfterSolve: boolean;
    dispatch: React.Dispatch<Action>;
  }) => {
    const toggleShowSolutions = () =>
      props.dispatch({ type: ActionType.ToggleShowSolutions });

    const toggleGoToNextCaseAfterSolve = () =>
      props.dispatch({ type: ActionType.ToggleGoToNextCaseAfterSolve });

    const showCasesModal = () =>
      props.dispatch({ type: ActionType.ShowCasesModal });
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={props.showSolutions}
            onChange={toggleShowSolutions}
          />
          Show solutions
        </label>
        <label>
          <input
            type="checkbox"
            checked={props.goToNextCaseAfterSolve}
            onChange={toggleGoToNextCaseAfterSolve}
          />
          Go to next case after solve
        </label>
        <Button onClick={showCasesModal}>Select cases...</Button>
      </div>
    );
  }
);

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
      <div>
        <div>
          <Settings
            showSolutions={state.showSolutions}
            goToNextCaseAfterSolve={state.goToNextCaseAfterSolve}
            dispatch={dispatch}
          />
          <Times times={state.times} dispatch={dispatch} />
        </div>
        <div>
          <div>
            <Algorithm
              alg={state.currentAlg}
              showSolutions={state.showSolutions}
            />
            <TimerComponent timer={state.timer} />

            {!state.goToNextCaseAfterSolve ? (
              <button
                onClick={() => dispatch({ type: ActionType.GoToNextCase })}
              >
                Next case
              </button>
            ) : null}

            {state.showSolutions ? (
              <div>
                <ul>
                  <li>Solutions:</li>
                  {state.currentAlg.solutions.map((solution, index) => {
                    return <li key={index}>{solution}</li>;
                  })}
                </ul>
              </div>
            ) : null}
            <div>
              All cases and solutions are based on{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
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
