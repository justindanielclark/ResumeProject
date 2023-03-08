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
import { useReducer, useState } from "react";
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
function App() {
  const [animationState, setAnimationState] = useState<AnimatingAppState>(createAnimatingState());
  const [state, dispatch] = useReducer(reducer, createState());
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
  function createAnimatingState(): AnimatingAppState {
    return {
      currentSlide: 0,
      transitionSlide: 1,
      transitioning: "none",
    };
  }
  function createBreadcrumbData(state: AppState): Array<BreadCrumbDataType> {
    return [
      {
        name: "Name",
        error: state.name.error,
        handleClick: () => {
          setAnimationState({
            currentSlide: animationState.currentSlide,
            transitionSlide: 0,
            transitioning: 0 < animationState.currentSlide ? "backwards" : "forward",
          });
        },
        prevRendered: state.name.prevRendered,
      },
      {
        name: "Address",
        error: state.contactAddress.error,
        handleClick: () => {
          setAnimationState({
            currentSlide: animationState.currentSlide,
            transitionSlide: 1,
            transitioning: 1 < animationState.currentSlide ? "backwards" : "forward",
          });
        },
        prevRendered: state.contactAddress.prevRendered,
      },
      {
        name: "Phone",
        error: state.contactPhone.error,
        handleClick: () => {
          setAnimationState({
            currentSlide: animationState.currentSlide,
            transitionSlide: 2,
            transitioning: 2 < animationState.currentSlide ? "backwards" : "forward",
          });
        },
        prevRendered: state.contactPhone.prevRendered,
      },
      {
        name: "Web",
        error: state.contactWeb.error,
        handleClick: () => {
          setAnimationState({
            currentSlide: animationState.currentSlide,
            transitionSlide: 3,
            transitioning: 3 < animationState.currentSlide ? "backwards" : "forward",
          });
        },
        prevRendered: state.contactWeb.prevRendered,
      },
      {
        name: "Work",
        error: state.workExperience.error,
        handleClick: () => {
          setAnimationState({
            currentSlide: animationState.currentSlide,
            transitionSlide: 4,
            transitioning: 4 < animationState.currentSlide ? "backwards" : "forward",
          });
        },
        prevRendered: state.workExperience.prevRendered,
      },
      {
        name: "Formal Edu",
        error: state.education.error,
        handleClick: () => {
          setAnimationState({
            currentSlide: animationState.currentSlide,
            transitionSlide: 5,
            transitioning: 5 < animationState.currentSlide ? "backwards" : "forward",
          });
        },
        prevRendered: state.education.prevRendered,
      },
      {
        name: "Misc. Edu",
        error: state.nonCollegiateEducation.error,
        handleClick: () => {
          setAnimationState({
            currentSlide: animationState.currentSlide,
            transitionSlide: 6,
            transitioning: 6 < animationState.currentSlide ? "backwards" : "forward",
          });
        },
        prevRendered: state.nonCollegiateEducation.prevRendered,
      },
      {
        name: "Projects",
        error: state.projects.error,
        handleClick: () => {
          setAnimationState({
            currentSlide: animationState.currentSlide,
            transitionSlide: 7,
            transitioning: 7 < animationState.currentSlide ? "backwards" : "forward",
          });
        },
        prevRendered: state.projects.prevRendered,
      },
      {
        name: "References",
        error: state.references.error,
        handleClick: () => {
          setAnimationState({
            currentSlide: animationState.currentSlide,
            transitionSlide: 8,
            transitioning: 8 < animationState.currentSlide ? "backwards" : "forward",
          });
        },
        prevRendered: state.references.prevRendered,
      },
    ];
  }
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
            setAnimationState({
              transitioning: "none",
              currentSlide: animationState.transitionSlide,
              transitionSlide: animationState.transitionSlide + 1,
            });
          })}
          {getFormByIndex(transitionToIndex, "forward")}
        </>
      );
    } else {
      return (
        <>
          {getFormByIndex(transitionToIndex, "backwards", () => {
            setAnimationState({
              transitioning: "none",
              currentSlide: animationState.transitionSlide,
              transitionSlide: animationState.transitionSlide - 1,
            });
          })}
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
              nextHandler={() => {
                setAnimationState({
                  transitioning: "forward",
                  currentSlide: 0,
                  transitionSlide: 1,
                });
              }}
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
              nextHandler={() => {
                setAnimationState({
                  transitioning: "forward",
                  currentSlide: 1,
                  transitionSlide: 2,
                });
              }}
              prevHandler={() => {
                setAnimationState({
                  transitioning: "backwards",
                  currentSlide: 1,
                  transitionSlide: 0,
                });
              }}
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
              nextHandler={() => {
                setAnimationState({
                  transitioning: "forward",
                  currentSlide: 2,
                  transitionSlide: 3,
                });
              }}
              prevHandler={() => {
                setAnimationState({
                  transitioning: "backwards",
                  currentSlide: 2,
                  transitionSlide: 1,
                });
              }}
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
              nextHandler={() => {
                setAnimationState({
                  transitioning: "forward",
                  currentSlide: 3,
                  transitionSlide: 4,
                });
              }}
              prevHandler={() => {
                setAnimationState({
                  transitioning: "backwards",
                  currentSlide: 3,
                  transitionSlide: 2,
                });
              }}
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
              nextHandler={() => {
                setAnimationState({
                  transitioning: "forward",
                  currentSlide: 4,
                  transitionSlide: 5,
                });
              }}
              prevHandler={() => {
                setAnimationState({
                  transitioning: "backwards",
                  currentSlide: 4,
                  transitionSlide: 3,
                });
              }}
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
              nextHandler={() => {
                setAnimationState({
                  transitioning: "forward",
                  currentSlide: 5,
                  transitionSlide: 6,
                });
              }}
              prevHandler={() => {
                setAnimationState({
                  transitioning: "backwards",
                  currentSlide: 5,
                  transitionSlide: 4,
                });
              }}
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
              nextHandler={() => {
                setAnimationState({
                  transitioning: "forward",
                  currentSlide: 6,
                  transitionSlide: 7,
                });
              }}
              prevHandler={() => {
                setAnimationState({
                  transitioning: "backwards",
                  currentSlide: 6,
                  transitionSlide: 5,
                });
              }}
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
              nextHandler={() => {
                setAnimationState({
                  transitioning: "forward",
                  currentSlide: 7,
                  transitionSlide: 8,
                });
              }}
              prevHandler={() => {
                setAnimationState({
                  transitioning: "backwards",
                  currentSlide: 7,
                  transitionSlide: 6,
                });
              }}
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
              prevHandler={() => {
                setAnimationState({
                  transitioning: "backwards",
                  currentSlide: 8,
                  transitionSlide: 7,
                });
              }}
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
