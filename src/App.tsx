import State from "./types/state";
import FormContainer from "./components/FormContainer/FormContainer";
import reducer from "./utils/reducer";
import { useReducer } from "react";

const startState: State = {
  resumeData: {
    name: {
      prefix: "N/A",
      firstName: "",
      lastName: "",
      suffix: "N/A",
    },
    contactInformation: {
      address: {
        address1: "",
        city: "",
        state: "",
        zip: "",
      },
      email: [],
      phone: {
        home: [],
        mobile: [],
        other: [],
      },
      websites: [],
    },
    education: [],
    references: [],
    skills: [],
    workExperience: [],
  },
};

function App() {
  const [state, dispatch] = useReducer(reducer, startState);
  const handleSubmitName = (payload) => {
    dispatch({ type: "submitName", payload });
  };
  // const handleSubmitContactInfo = (payload) => {
  //   dispatch({ type: "submitContactInfo", payload });
  // };
  // const handleSubmitAddress = (payload) => {
  //   dispatch({ type: "submitAddress", payload });
  // };
  // const handleSubmitWorkExperience = (payload) => {
  //   dispatch({ type: "submitWorkExperience", payload });
  // };
  // const handleSubmitEducation = (payload) => {
  //   dispatch({ type: "submitEducation", payload });
  // };
  // const handleSubmitSkills = (payload) => {
  //   dispatch({ type: "submitSkills", payload });
  // };
  return (
    <div className="min-h-screen bg-slate-700 flex justify-center items-center">
      <div className="bg-slate-200 border-2 rounded-md border-slate-900 text-slate-800 p-4">
        <FormContainer
          title="Name"
          nextHandler={(e) => {
            console.log(e);
          }}
          prevHandler={(e) => {
            console.log(e);
          }}
        ></FormContainer>
      </div>
    </div>
  );
}

export default App;
