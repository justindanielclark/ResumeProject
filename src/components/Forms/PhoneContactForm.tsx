import React, { useState } from "react";
import { PhoneContactData, Payload, StatefulData } from "../../types/resumeData";
import { FormContainer, FormAnimatingTypes } from "../FormContainer/FormContainer";
import { checkValidPhoneNumber } from "../../utils/inputValidation";
import TextInput from "../FormInput/TextInput";

type State = StatefulData<PhoneContactData>;

type Props = {
  propState: PhoneContactData;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler: () => void;
  submitHandler: (payload: Payload<PhoneContactData>) => void;
  animating: FormAnimatingTypes;
  handleAnimationEnd?: () => void;
};
function PhoneContactForm({
  submitHandler,
  nextHandler,
  prevHandler,
  propState,
  prevRendered,
  animating,
  handleAnimationEnd,
}: Props) {
  const [state, setState] = useState<State>(createState(propState, prevRendered));
  function createState(propState: PhoneContactData, prevRendered: boolean): State {
    return {
      mobile: {
        data: propState.mobile,
        error: prevRendered
          ? propState.mobile === ""
            ? true
            : !checkValidPhoneNumber(propState.mobile)
          : false,
      },
      home: {
        data: propState.home,
        error: prevRendered
          ? propState.home === ""
            ? false
            : !checkValidPhoneNumber(propState.home)
          : false,
      },
      other: {
        data: propState.other,
        error: prevRendered
          ? propState.home === ""
            ? false
            : !checkValidPhoneNumber(propState.home)
          : false,
      },
    };
  }
  function onPhoneFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const inputChar = input.length > 0 ? input[input.length - 1] : "";
    const stateField = e.target.name as keyof State;
    switch (input.length) {
      case 0:
        setState({
          ...state,
          [stateField]: {
            data: "",
            error: false,
          },
        });
        return;
      case 1:
        if (inputChar.match(/[0-9]/)) {
          setState({
            ...state,
            [stateField]: {
              data: `(${input}`,
              error: false,
            },
          });
        } else if (inputChar === "(") {
          setState({
            ...state,
            [stateField]: {
              data: "(",
              error: false,
            },
          });
        }
        return;
      case 2:
      case 3:
      case 4:
        if (inputChar.match(/[0-9]/)) {
          setState({
            ...state,
            [stateField]: {
              data: input,
              error: false,
            },
          });
        }
        return;
      case 5:
        if (inputChar.match(/[0-9]/)) {
          setState({
            ...state,
            [stateField]: {
              data: `${input.slice(0, 4)})${inputChar}`,
              error: false,
            },
          });
        } else if (inputChar === ")") {
          setState({
            ...state,
            [stateField]: {
              data: input,
              error: false,
            },
          });
        }
        return;
      case 6:
      case 7:
      case 8:
        if (inputChar.match(/[0-9]/)) {
          setState({
            ...state,
            [stateField]: {
              data: input,
              error: false,
            },
          });
        }
        return;
      case 9:
        if (inputChar.match(/[0-9]/)) {
          setState({
            ...state,
            [stateField]: {
              data: `${input.slice(0, 8)}-${inputChar}`,
              error: false,
            },
          });
        } else if (inputChar === "-") {
          setState({
            ...state,
            [stateField]: {
              data: input,
              error: false,
            },
          });
        }
        return;
      case 10:
      case 11:
      case 12:
      case 13:
        if (inputChar.match(/[0-9]/)) {
          setState({
            ...state,
            [stateField]: {
              data: input,
              error: false,
            },
          });
        }
        return;
    }
  }
  function onPhoneFieldBlur(e: React.ChangeEvent<HTMLInputElement>, required: boolean) {
    const input = e.target.value;
    const stateField = e.target.name as keyof State;
    const hasError = !checkValidPhoneNumber(input);
    if (required) {
      if (state[stateField].error !== hasError) {
        setState({
          ...state,
          [stateField]: {
            data: state[stateField].data,
            error: hasError,
          },
        });
      }
    } else {
      if (input === "" && state[stateField].error) {
        setState({
          ...state,
          [stateField]: {
            data: state[stateField].data,
            error: false,
          },
        });
      } else if (input !== "" && state[stateField].error !== hasError) {
        setState({
          ...state,
          [stateField]: {
            data: state[stateField].data,
            error: true,
          },
        });
      }
    }
  }
  function handleSubmit() {
    const mobilePhoneError = checkValidPhoneNumber(state.mobile.data);
    const homePhoneError = state.home.data === "" ? true : checkValidPhoneNumber(state.home.data);
    const otherPhoneError =
      state.other.data === "" ? true : checkValidPhoneNumber(state.other.data);
    const hasErrors = !(mobilePhoneError && homePhoneError && otherPhoneError);
    const payloadData: Payload<PhoneContactData> = {
      data: {
        home: state.home.data,
        mobile: state.mobile.data,
        other: state.other.data,
      },
      error: hasErrors,
    };
    submitHandler(payloadData);
    nextHandler();
  }
  return (
    <FormContainer
      title="Phone Contact:"
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
      animating={animating}
      handleAnimationEnd={handleAnimationEnd}
    >
      <TextInput
        label="Mobile:"
        labelID="mobile"
        labelName="mobile"
        onChange={onPhoneFieldChange}
        onBlur={(e) => onPhoneFieldBlur(e, true)}
        required={true}
        errorMessage="Please Enter A Valid Number"
        placeholder="(123)456-7890"
        error={state.mobile.error}
        value={state.mobile.data}
        type={"tel"}
      />
      <TextInput
        label="Home:"
        labelID="home"
        labelName="home"
        onChange={onPhoneFieldChange}
        onBlur={(e) => onPhoneFieldBlur(e, false)}
        required={false}
        errorMessage="Please Enter A Valid Number"
        placeholder="(123)456-7890"
        error={state.home.error}
        value={state.home.data}
        type={"tel"}
      />
      <TextInput
        label="Other:"
        labelID="other"
        labelName="other"
        onChange={onPhoneFieldChange}
        onBlur={(e) => onPhoneFieldBlur(e, false)}
        required={false}
        errorMessage="Please Enter A Valid Number"
        placeholder="(123)456-7890"
        error={state.other.error}
        value={state.other.data}
        type={"tel"}
      />
    </FormContainer>
  );
}
export default PhoneContactForm;
