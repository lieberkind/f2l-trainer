import React from "react";
import classNames from "classnames";

import { Alg, AlgId } from "./algs";

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
    <div className="absolute top-0 left-0 bottom-0 right-0 h-screen bg-white flex flex-col justify-between">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-scroll flex-shrink flex-grow p-2 box-border">
        {props.allCases.map((_case) => {
          const isIncluded = state.casesToTrain.includes(_case.id);
          return (
            <label
              key={_case.id}
              className={classNames(
                "flex items-center justify-between p-2 border-2 rounded-lg",
                {
                  "border-gray-300": !isIncluded,
                  "border-green-500": isIncluded,
                }
              )}
            >
              <img
                alt={`Case _case.id`}
                className="block w-16"
                src={`${process.env.PUBLIC_URL}/assets/fl2cases2/${_case.id}.png`}
              />
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
      <div className="p-4 shadow-md relative z-10 box-border border-t-2 border-teal-300 flex justify-between">
        <div className="flex justify-between gap-2">
          <button
            className="border-teal-300 border-2 p-1 bg-teal-800 text-teal-300 rounded-md w-10/20"
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
            className="border-teal-300 border-2 p-1 bg-teal-800 text-teal-300 rounded-md w-10/20"
            onClick={() => {
              dispatch({
                type: ActionType.RemoveAllCases,
              });
            }}
          >
            Deselect all
          </button>
        </div>
        <button
          className="border-teal-300 border-2 p-1 bg-teal-800 text-teal-300 w-3/12 rounded-md"
          onClick={() => props.onCloseModal(state.casesToTrain)}
        >
          Select cases
        </button>
      </div>
    </div>
  );
};

export default CasesModal;
