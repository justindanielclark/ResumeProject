import { AppState, TransitionState } from "./types/appState";
import {
  NameData,
  Address,
  Payload,
  PhoneContactData,
  WebContactData,
  JobData,
  EducationData,
  NonCollegiateEducationData,
} from "./types/resumeData";
import reducer from "./utils/reducer";
import { useEffect, useReducer } from "react";
import NameForm from "./components/Forms/NameForm";
import { pronouns } from "./types/resumeData";
import AddressContactForm from "./components/Forms/AddressContactForm";
import PhoneContactForm from "./components/Forms/PhoneContactForm";
import WebsiteContactForm from "./components/Forms/WebsiteContactForm";
import WorkExperienceForm from "./components/Forms/WorkExperienceForm";
import EducationForm from "./components/Forms/EducationForm";
import NonCollegiateEducationForm from "./components/Forms/NonCollegiateEducationForm";

function createState(): AppState {
  return {
    currentSlide: 6,
    transitionSlide: 1,
    transitioning: "none",
    resume: {
      name: {
        data: {
          prefix: "-None Selected-",
          firstName: "",
          lastName: "",
          suffix: "-None Selected-",
          pronouns: pronouns[0],
        },
        prevRendered: false,
        error: false,
      },
      contactAddress: {
        data: {
          address1: "",
          city: "",
          state: "CA",
          zip: "",
        },
        prevRendered: false,
        error: false,
      },
      contactPhone: {
        data: {
          home: "",
          mobile: "",
          other: "",
        },
        prevRendered: false,
        error: false,
      },
      contactWeb: {
        data: {
          email: [],
          websites: [],
        },
        prevRendered: false,
        error: false,
      },
      education: {
        data: [],
        prevRendered: false,
        error: false,
      },
      nonCollegiateEducation: {
        data: [],
        prevRendered: false,
        error: false,
      },
      references: {
        data: [],
        prevRendered: false,
        error: false,
      },
      workExperience: {
        data: [],
        prevRendered: false,
        error: false,
      },
      skills: {
        data: [],
        prevRendered: false,
        error: false,
      },
    },
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, createState());
  useEffect(() => console.log({ state }), [state]);
  const handleSubmitName = (payload: Payload<NameData>) => {
    dispatch({ type: "submitName", payload });
  };
  const handleSubmitAddressContactInfo = (payload: Payload<Address>) => {
    dispatch({ type: "submitAddressContactInfo", payload });
  };
  const handleSubmitPhoneContactInfo = (payload: Payload<PhoneContactData>) => {
    dispatch({ type: "submitPhoneContactInfo", payload });
  };
  const handleSubmitWebsiteContactInfo = (payload: Payload<WebContactData>) => {
    dispatch({ type: "submitWebContactInfo", payload });
  };
  const handleSubmitWorkExperienceInfo = (payload: Payload<Array<JobData>>) => {
    dispatch({ type: "submitWorkExperienceInfo", payload });
  };
  const handleSubmitEducationInfo = (payload: Payload<Array<EducationData>>) => {
    dispatch({ type: "submitEducationInfo", payload });
  };
  const handleSubmitNonCollegiateEducationInfo = (
    payload: Payload<Array<NonCollegiateEducationData>>
  ) => {
    dispatch({ type: "submitNonCollegiateEducationInfo", payload });
  };
  const renderForms = (
    transitioning: TransitionState,
    currentIndex: number,
    transitionToIndex: number
  ): JSX.Element => {
    if (transitioning === "none") {
      return getFormByIndex(currentIndex);
    } else if (transitioning === "forward") {
      return (
        <>
          {getFormByIndex(currentIndex)}
          {getFormByIndex(transitionToIndex)}
        </>
      );
    } else {
      return (
        <>
          {getFormByIndex(transitionToIndex)}
          {getFormByIndex(currentIndex)}
        </>
      );
    }
    function getFormByIndex(index: number): JSX.Element {
      switch (index) {
        case 0: {
          return (
            <NameForm
              nextHandler={dummyHandler}
              submitHandler={handleSubmitName}
              propState={state.resume.name.data}
              prevRendered={state.resume.name.prevRendered}
            />
          );
        }
        case 1: {
          return (
            <AddressContactForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitAddressContactInfo}
              prevRendered={state.resume.contactAddress.prevRendered}
              propState={state.resume.contactAddress.data}
            />
          );
        }
        case 2: {
          return (
            <PhoneContactForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitPhoneContactInfo}
              prevRendered={state.resume.contactPhone.prevRendered}
              propState={state.resume.contactPhone.data}
            />
          );
        }
        case 3: {
          return (
            <WebsiteContactForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitWebsiteContactInfo}
              prevRendered={state.resume.contactWeb.prevRendered}
              propState={state.resume.contactWeb.data}
            />
          );
        }
        case 4: {
          return (
            <WorkExperienceForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitWorkExperienceInfo}
              prevRendered={state.resume.workExperience.prevRendered}
              propState={state.resume.workExperience.data}
            />
          );
        }
        case 5: {
          return (
            <EducationForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitEducationInfo}
              prevRendered={state.resume.education.prevRendered}
              propState={state.resume.education.data}
            />
          );
        }
        case 6: {
          return (
            <NonCollegiateEducationForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitNonCollegiateEducationInfo}
              prevRendered={state.resume.nonCollegiateEducation.prevRendered}
              propState={state.resume.nonCollegiateEducation.data}
            />
          );
        }
        default: {
          return <p>{`There has been an error, check renderForms() in App.tsx`}</p>;
        }
      }
    }
  };
  const dummyHandler = () => console.log("dummy");

  return (
    <div className="min-h-screen bg-slate-700">
      {renderForms(state.transitioning, state.currentSlide, state.transitionSlide)}
    </div>
  );
}

export default App;
