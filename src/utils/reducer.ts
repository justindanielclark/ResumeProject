import State from "../types/state";
import ReducerAction from "../types/reducerAction";
const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case "submitAddress": {
      //todo
      return state;
    }
    case "submitContactInfo": {
      //todo
      return state;
    }
    case "submitEducation": {
      //todo
      return state;
    }
    case "submitName": {
      //todo
      return state;
    }
    case "submitSkills": {
      //todo
      return state;
    }
    case "submitWorkExperience": {
      //todo
      return state;
    }
  }
};

export default reducer;
