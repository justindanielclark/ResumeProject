import { AppState, TransitionState } from "./types/appState";
import { NameData, Address, Payload, PhoneContactData } from "./types/resumeData";
import reducer from "./utils/reducer";
import { useEffect, useReducer } from "react";
import NameForm from "./components/Forms/NameForm";
import { pronouns } from "./types/resumeData";
import AddressContactForm from "./components/Forms/AddressContactForm";
import PhoneContactForm from "./components/Forms/PhoneContactForm";

const startState: AppState = {
  currentSlide: 2,
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
    },
    contactAddress: {
      data: {
        address1: "",
        city: "",
        state: "CA",
        zip: "",
      },
      prevRendered: false,
    },
    contactPhone: {
      data: {
        home: "",
        mobile: "",
        other: "",
      },
      prevRendered: false,
    },
    contactWeb: {
      data: {
        email: [],
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
        default: {
          return <p>There has been an error, check renderForms() in App.tsx</p>;
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
