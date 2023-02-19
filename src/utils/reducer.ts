import State from "../types/appState";
import ReducerAction from "../types/reducerAction";
const reducer = (state: State, action: ReducerAction): State => {
  let stateField: keyof State["resume"];
  switch (action.type) {
    case "submitName": {
      stateField = "name";
      break;
    }
    case "submitAddressContactInfo": {
      stateField = "contactAddress";
      break;
    }
    case "submitPhoneContactInfo": {
      stateField = "contactPhone";
      break;
    }
  }
  return {
    ...state,
    resume: {
      ...state.resume,
      [stateField]: {
        data: action.payload.data,
        error: action.payload.error,
        prevRendered: true,
      },
    },
  };
};

export default reducer;
