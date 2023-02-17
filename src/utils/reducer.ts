import State from "../types/appState";
import ReducerAction from "../types/reducerAction";
const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case "submitName": {
      return {
        ...state,
        resume: {
          ...state.resume,
          name: {
            data: action.payload.data,
            error: action.payload.error,
            prevRendered: true,
          },
        },
      };
    }
  }
  return state;
};

export default reducer;
