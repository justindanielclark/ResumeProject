import React, { useState } from "react";
import { PhoneContactData, Payload, StatefulData } from "../../types/resumeData";
import FormContainer from "../FormContainer/FormContainer";
import { checkValidPhoneNumber } from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import TextInput from "../FormInput/TextInput";

type State = StatefulData<PhoneContactData>;

type Props = {
  propState: PhoneContactData;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler: () => void;
  submitHandler: (payload: Payload<PhoneContactData>) => void;
};
function PhoneContactForm({
  submitHandler,
  nextHandler,
  prevHandler,
  propState,
  prevRendered,
}: Props) {
  const [state, setState] = useState<State>({
    home: {
      data: propState.home,
      //!
      error: prevRendered ? true : false,
    },
    mobile: {
      data: propState.mobile,
      //!
      error: prevRendered ? true : false,
    },
    other: {
      data: propState.other,
      //!
      error: prevRendered ? true : false,
    },
  });
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
    if (state[stateField].error !== hasError) {
      if (required) {
        setState({
          ...state,
          [stateField]: {
            data: state[stateField].data,
            error: hasError,
          },
        });
        return;
      } else {
        if (input === "") {
          setState({
            ...state,
            [stateField]: {
              data: state[stateField].data,
              error: false,
            },
          });
        } else {
          setState({
            ...state,
            [stateField]: {
              data: state[stateField].data,
              error: hasError,
            },
          });
        }
      }
    }
  }
  function handleSubmit() {
    const hasErrors = !(!state.home.error && !state.mobile.error && !state.other.error);
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
      title="Phone Contact Information:"
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
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
