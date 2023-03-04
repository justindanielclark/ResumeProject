import { AppState } from "./types/appState";
import {
  NameData,
  Address,
  Payload,
  PhoneContactData,
  WebContactData,
  JobData,
  EducationData,
  NonCollegiateEducationData,
  ReferenceData,
  ProjectData,
} from "./types/resumeData";
import reducer from "./utils/reducer";
import { useEffect, useReducer, useState } from "react";
import NameForm from "./components/Forms/NameForm";
import { pronouns } from "./types/resumeData";
import AddressContactForm from "./components/Forms/AddressContactForm";
import PhoneContactForm from "./components/Forms/PhoneContactForm";
import WebsiteContactForm from "./components/Forms/WebsiteContactForm";
import WorkExperienceForm from "./components/Forms/WorkExperienceForm";
import EducationForm from "./components/Forms/EducationForm";
import NonCollegiateEducationForm from "./components/Forms/NonCollegiateEducationForm";
import ReferencesForm from "./components/Forms/ReferencesForm";
import ProjectsForm from "./components/Forms/ProjectsForm";
import BreadcrumbBox from "./components/BreadcrumbBox/BreadcrumbBox";
import BreadCrumbDataType from "./types/breadcrumbData";
import { FormAnimatingTypes } from "./components/FormContainer/FormContainer";
import AnimatingAppState from "./types/animatingAppState";

function createState(): AppState {
  return {
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
    projects: {
      data: [],
      prevRendered: false,
      error: false,
    },
  };
}

function createBreadcrumbData(state: AppState): Array<BreadCrumbDataType> {
  return [
    {
      name: "Name",
      error: state.name.error,
      handleClick: () => {
        console.log("dummy");
      },
      prevRendered: state.name.prevRendered,
    },
    {
      name: "Address",
      error: state.contactAddress.error,
      handleClick: () => {
        console.log("dummy");
      },
      prevRendered: state.contactAddress.prevRendered,
    },
    {
      name: "Phone",
      error: state.contactPhone.error,
      handleClick: () => {
        console.log("dummy");
      },
      prevRendered: state.contactPhone.prevRendered,
    },
    {
      name: "Web",
      error: state.contactWeb.error,
      handleClick: () => {
        console.log("dummy");
      },
      prevRendered: state.contactWeb.prevRendered,
    },
    {
      name: "Work",
      error: state.workExperience.error,
      handleClick: () => {
        console.log("dummy");
      },
      prevRendered: state.workExperience.prevRendered,
    },
    {
      name: "Formal Edu",
      error: state.education.error,
      handleClick: () => {
        console.log("dummy");
      },
      prevRendered: state.education.prevRendered,
    },
    {
      name: "Misc. Edu",
      error: state.nonCollegiateEducation.error,
      handleClick: () => {
        console.log("dummy");
      },
      prevRendered: state.nonCollegiateEducation.prevRendered,
    },
    {
      name: "Projects",
      error: state.projects.error,
      handleClick: () => {
        console.log("dummy");
      },
      prevRendered: state.projects.prevRendered,
    },
    {
      name: "References",
      error: state.references.error,
      handleClick: () => {
        console.log("dummy");
      },
      prevRendered: state.references.prevRendered,
    },
  ];
}

function App() {
  const [animationState, setAnimationState] = useState<AnimatingAppState>({
    currentSlide: 0,
    transitionSlide: 1,
    transitioning: "forward",
  });
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
  const handleSubmitReferenceInfo = (payload: Payload<Array<ReferenceData>>) => {
    dispatch({ type: "submitReferencesInfo", payload });
  };
  const handleSubmitProjectInfo = (payload: Payload<Array<ProjectData>>) => {
    dispatch({ type: "submitProjectsInfo", payload });
  };
  const renderForms = (
    transitioning: FormAnimatingTypes,
    currentIndex: number,
    transitionToIndex: number
  ): JSX.Element => {
    if (transitioning === "none") {
      return getFormByIndex(currentIndex, "none");
    } else if (transitioning === "forward") {
      return (
        <>
          {getFormByIndex(currentIndex, "forward", () => {
            //!
          })}
          {getFormByIndex(transitionToIndex, "forward")}
        </>
      );
    } else {
      return (
        <>
          {getFormByIndex(transitionToIndex, "backwards")}
          {getFormByIndex(currentIndex, "backwards")}
        </>
      );
    }
    function getFormByIndex(
      index: number,
      animatingContext: FormAnimatingTypes,
      handleAnimationEnd: (() => void) | undefined = undefined
    ): JSX.Element {
      switch (index) {
        case 0: {
          return (
            <NameForm
              nextHandler={dummyHandler}
              submitHandler={handleSubmitName}
              propState={state.name.data}
              prevRendered={state.name.prevRendered}
              animating={animatingContext}
              handleAnimationEnd={handleAnimationEnd}
            />
          );
        }
        case 1: {
          return (
            <AddressContactForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitAddressContactInfo}
              prevRendered={state.contactAddress.prevRendered}
              propState={state.contactAddress.data}
              animating={animatingContext}
              handleAnimationEnd={handleAnimationEnd}
            />
          );
        }
        case 2: {
          return (
            <PhoneContactForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitPhoneContactInfo}
              prevRendered={state.contactPhone.prevRendered}
              propState={state.contactPhone.data}
              animating={animatingContext}
              handleAnimationEnd={handleAnimationEnd}
            />
          );
        }
        case 3: {
          return (
            <WebsiteContactForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitWebsiteContactInfo}
              prevRendered={state.contactWeb.prevRendered}
              propState={state.contactWeb.data}
              animating={animatingContext}
              handleAnimationEnd={handleAnimationEnd}
            />
          );
        }
        case 4: {
          return (
            <WorkExperienceForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitWorkExperienceInfo}
              prevRendered={state.workExperience.prevRendered}
              propState={state.workExperience.data}
              animating={animatingContext}
              handleAnimationEnd={handleAnimationEnd}
            />
          );
        }
        case 5: {
          return (
            <EducationForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitEducationInfo}
              prevRendered={state.education.prevRendered}
              propState={state.education.data}
              animating={animatingContext}
              handleAnimationEnd={handleAnimationEnd}
            />
          );
        }
        case 6: {
          return (
            <NonCollegiateEducationForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitNonCollegiateEducationInfo}
              prevRendered={state.nonCollegiateEducation.prevRendered}
              propState={state.nonCollegiateEducation.data}
              animating={animatingContext}
              handleAnimationEnd={handleAnimationEnd}
            />
          );
        }

        case 7: {
          return (
            <ProjectsForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitProjectInfo}
              propState={state.projects.data}
              animating={animatingContext}
              handleAnimationEnd={handleAnimationEnd}
            />
          );
        }
        case 8: {
          return (
            <ReferencesForm
              nextHandler={dummyHandler}
              prevHandler={dummyHandler}
              submitHandler={handleSubmitReferenceInfo}
              propState={state.references.data}
              animating={animatingContext}
              handleAnimationEnd={handleAnimationEnd}
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
    <div className="relative min-h-screen bg-slate-700">
      <main className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2">
        <BreadcrumbBox
          propState={createBreadcrumbData(state)}
          current={animationState.currentSlide}
        />
        <div className="relative flex w-80 flex-row overflow-hidden rounded border-2 border-slate-900 bg-slate-300 text-slate-800">
          {renderForms(
            animationState.transitioning,
            animationState.currentSlide,
            animationState.transitionSlide
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
