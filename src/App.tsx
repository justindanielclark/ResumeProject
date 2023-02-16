import AppState from "./types/appState";
import {
  NameData,
  JobData,
  EducationData,
  ContactData,
  ReferenceData,
} from "./types/resumeData";
import reducer from "./utils/reducer";
import { useReducer } from "react";
import NameForm from "./components/Forms/NameForm";
import { pronouns } from "./types/resumeData";
import ContactForm from "./components/Forms/ContactForm";

const startState: AppState = {
  currentSlide: 0,
  transitioning: "none",
  resume: {
    name: {
      data: {
        prefix: "-None Selected-",
        firstName: "",
        lastName: "",
        suffix: "-None Selected-",
        pronoun: pronouns[0],
      },
      prevRendered: false,
    },
    contact: {
      data: {
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
      prevRendered: false,
    },
    education: {
      data: [],
      prevRendered: false,
    },
    references: {
      data: [],
      prevRendered: false,
    },
    workExperience: {
      data: [],
      prevRendered: false,
    },
    skills: {
      data: [],
      prevRendered: false,
    },
  },
};

function App() {
  const [state, dispatch] = useReducer(reducer, startState);
  const handleSubmitName = (payload: { data: NameData; error: boolean }) => {
    dispatch({ type: "submitName", payload });
  };
  const handleSubmitContactInfo = (payload: {
    data: ContactData;
    error: boolean;
  }) => {
    dispatch({ type: "submitContactInfo", payload });
  };
  const handleSubmitWorkExperience = (payload: {
    data: Array<JobData>;
    error: boolean;
  }) => {
    dispatch({ type: "submitWorkExperience", payload });
  };
  const handleSubmitEducation = (payload: {
    data: Array<EducationData>;
    error: boolean;
  }) => {
    dispatch({ type: "submitEducation", payload });
  };
  const handleSubmitSkills = (payload: {
    data: Array<string>;
    error: boolean;
  }) => {
    dispatch({ type: "submitSkills", payload });
  };
  const handleSubmitReferences = (payload: {
    data: Array<ReferenceData>;
    error: boolean;
  }) => {
    dispatch({ type: "submitReferences", payload });
  };
  const dummyHandler = () => console.log("dummy");

  return (
    <div className="min-h-screen bg-slate-700 flex justify-center items-center">
      <NameForm
        nextHandler={dummyHandler}
        submitHandler={handleSubmitName}
        propState={state.resume.name.data}
        prevRendered={state.resume.name.prevRendered}
      />
      {/* <ContactForm
          nextHandler={dummyHandler}
          submitHandler={handleSubmitContactInfo}
          propState={state.resume.contact.data}
        /> */}
    </div>
  );
}

export default App;
