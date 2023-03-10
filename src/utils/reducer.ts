import State from "../types/appState";
import ReducerAction from "../types/reducerAction";
const reducer = (state: State, action: ReducerAction): State => {
  let stateField: keyof State;
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
    case "submitWebContactInfo": {
      stateField = "contactWeb";
      break;
    }
    case "submitWorkExperienceInfo": {
      stateField = "workExperience";
      break;
    }
    case "submitEducationInfo": {
      stateField = "education";
      break;
    }
    case "submitNonCollegiateEducationInfo": {
      stateField = "nonCollegiateEducation";
      break;
    }
    case "submitReferencesInfo": {
      stateField = "references";
      break;
    }
    case "submitProjectsInfo": {
      stateField = "projects";
      break;
    }
  }
  return {
    ...state,
    [stateField]: {
      data: action.payload.data,
      error: action.payload.error,
      prevRendered: true,
    },
  };
};

export default reducer;
