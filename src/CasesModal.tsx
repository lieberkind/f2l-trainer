import React from "react";
import classNames from "classnames";

import { Alg, AlgId } from "./algs";
import { Cube } from "./cube";

/*
|------------------------------------------------------------------------------
| State
|------------------------------------------------------------------------------
*/
interface State {
  casesToTrain: AlgId[];
}

/*
|------------------------------------------------------------------------------
| Actions
|------------------------------------------------------------------------------
*/
enum ActionType {
  SelectCase,
  SelectCases,
  RemoveCase,
  RemoveAllCases,
}

type Action =
  | { type: ActionType.SelectCase; caseId: AlgId }
  | { type: ActionType.SelectCases; caseIds: AlgId[] }
  | { type: ActionType.RemoveCase; caseId: AlgId }
  | { type: ActionType.RemoveAllCases };

/*
|------------------------------------------------------------------------------
| Reducer
|------------------------------------------------------------------------------
*/
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SelectCase: {
      return { ...state, casesToTrain: [...state.casesToTrain, action.caseId] };
    }
    case ActionType.SelectCases: {
      return { ...state, casesToTrain: action.caseIds };
    }
    case ActionType.RemoveCase: {
      return {
        ...state,
        casesToTrain: state.casesToTrain.filter(
          (caseId) => caseId !== action.caseId
        ),
      };
    }
    case ActionType.RemoveAllCases: {
      return {
        ...state,
        casesToTrain: [],
      };
    }
    default:
      return state;
  }
};

/*
|------------------------------------------------------------------------------
| Cases Modal
|------------------------------------------------------------------------------
*/
export interface Props {
  allCases: Alg[];
  casesToTrain: AlgId[];
  onCloseModal: (casesToTrain: AlgId[]) => void;
}

const CasesModal: React.FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, {
    casesToTrain: props.casesToTrain,
  });

  return (
    <div>
      <div>
        {props.allCases.map((_case) => {
          const isIncluded = state.casesToTrain.includes(_case.id);
          return (
            <label key={_case.id}>
              <Cube scramble={_case.scramble} width={75} height={75} />
              <input
                type="checkbox"
                checked={isIncluded}
                onChange={() => {
                  isIncluded
                    ? dispatch({
                        type: ActionType.RemoveCase,
                        caseId: _case.id,
                      })
                    : dispatch({
                        type: ActionType.SelectCase,
                        caseId: _case.id,
                      });
                }}
              />
            </label>
          );
        })}
      </div>
      <div>
        <div>
          <button
            onClick={() => {
              dispatch({
                type: ActionType.SelectCases,
                caseIds: props.allCases.map((_case) => _case.id),
              });
            }}
          >
            Select all
          </button>
          <button
            onClick={() => {
              dispatch({
                type: ActionType.RemoveAllCases,
              });
            }}
          >
            Deselect all
          </button>
        </div>
        <button onClick={() => props.onCloseModal(state.casesToTrain)}>
          Select cases
        </button>
      </div>
    </div>
  );
};

export default CasesModal;
