import React, { useState } from "react";
import { FormContainer, FormAnimatingTypes } from "../FormContainer/FormContainer";
import TextInput from "../FormInput/TextInput";
import SelectInput from "../FormInput/SelectInput";
import { Address, StatefulData } from "../../types/resumeData";
import stateAbbreviations from "../../data/stateAbbreviations";
import { checkInputForNotEmpty, checkValidZIP } from "../../utils/inputValidation";
import { Payload } from "../../types/resumeData";
import {
  handleSelectInputChange,
  handleTextInputBlur,
  handleTextInputChange,
} from "../../utils/handlers";

type State = StatefulData<Address>;
type Props = {
  propState: Address;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler: () => void;
  submitHandler: (payload: { data: Address; error: boolean }) => void;
  animating: FormAnimatingTypes;
  handleAnimationEnd?: () => void;
};
function createState(propState: Address, prevRendered: boolean): State {
  return {
    address1: {
      data: propState.address1,
      error: prevRendered ? !checkInputForNotEmpty(propState.address1) : false,
    },
    address2: {
      data: propState.address2 ? propState.address2 : "",
      error: false,
    },
    city: {
      data: propState.city,
      error: prevRendered ? !checkInputForNotEmpty(propState.city) : false,
    },
    state: {
      data: propState.state,
      error: false,
    },
    zip: {
      data: propState.zip,
      error: prevRendered ? !checkValidZIP(propState.zip) : false,
    },
  };
}
function AddressContactForm({
  submitHandler,
  nextHandler,
  prevHandler,
  prevRendered,
  propState,
  animating,
  handleAnimationEnd,
}: Props) {
  const [state, setState] = useState<State>(createState(propState, prevRendered));

  const handleSubmit = () => {
    const streetAddressValidity = checkInputForNotEmpty(state.address1.data);
    const cityValidity = checkInputForNotEmpty(state.city.data);
    const ZIPValidity = checkValidZIP(state.zip.data);
    const hasErrors = !(streetAddressValidity && cityValidity && ZIPValidity);
    const payloadData: Payload<Address> = {
      data: {
        address1: state.address1.data,
        city: state.city.data,
        state: state.state.data,
        zip: state.zip.data,
      },
      error: hasErrors,
    };
    if (state.address2) {
      payloadData.data.address2 = state.address2.data;
    }
    submitHandler(payloadData);
    nextHandler();
  };
  return (
    <FormContainer
      title="Contact Information"
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
      animating={animating}
      handleAnimationEnd={handleAnimationEnd}
    >
      <TextInput
        label="Street Address:"
        labelID="address1"
        labelName="address1"
        onChange={(e) => handleTextInputChange(e, state, setState, checkInputForNotEmpty)}
        onBlur={(e) => handleTextInputBlur(e, state, setState, checkInputForNotEmpty)}
        required={true}
        errorMessage="An Address is Required"
        placeholder="123 Main Street"
        error={state.address1.error}
        value={state.address1.data}
      />
      <TextInput
        label="Apt/Suite/Building Number"
        labelID="address2"
        labelName="address2"
        onChange={(e) => handleTextInputChange(e, state, setState, checkInputForNotEmpty)}
        required={false}
        placeholder="Apt #123"
        value={state.address2 && state.address2.data ? state.address2.data : ""}
      />
      <TextInput
        label="City:"
        labelID="city"
        labelName="city"
        onChange={(e) => handleTextInputChange(e, state, setState, checkInputForNotEmpty)}
        onBlur={(e) => handleTextInputBlur(e, state, setState, checkInputForNotEmpty)}
        required={true}
        errorMessage="A City is Required"
        placeholder="Coolsville"
        error={state.city.error}
        value={state.city.data}
      />
      <SelectInput
        error={false}
        errorMessage={""}
        label={"State:"}
        labelID={"state"}
        labelName={"state"}
        onChange={(e) => handleSelectInputChange(e, state, setState, stateAbbreviations)}
        options={[...stateAbbreviations]}
        required={true}
        value={state.state.data}
      />
      <TextInput
        label="ZIP Code:"
        labelID="zip"
        labelName="zip"
        onChange={(e) => handleTextInputChange(e, state, setState, checkInputForNotEmpty)}
        onBlur={(e) => handleTextInputBlur(e, state, setState, checkValidZIP)}
        required={true}
        errorMessage="Please Enter Valid US ZIP Code"
        placeholder="12345"
        error={state.zip.error}
        value={state.zip.data}
      />
    </FormContainer>
  );
}

export default AddressContactForm;
