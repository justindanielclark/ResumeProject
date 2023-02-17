import React, { useState } from "react";
import { ContactData } from "../../types/resumeData";
import FormContainer from "../FormContainer/FormContainer";
import SubHeader from "../FormInput/SubHeader";
import TextInput from "../FormInput/TextInput";

type Props = {
  propState: ContactData;
  nextHandler: () => void;
  prevHandler: () => void;
  submitHandler: (payload: { data: ContactData; error: boolean }) => void;
};
function PhoneAndEmailContactForm({
  submitHandler,
  nextHandler,
  prevHandler,
  propState,
}: Props) {
  const [state, setState] = useState(propState);
  const dummyFunc = (e) => console.log(e);
  return (
    <FormContainer
      title="Contact Information"
      nextHandler={nextHandler}
      prevHandler={prevHandler}
    >
      <SubHeader title="Email" />
      <TextInput
        label="Email Address:"
        labelID="email"
        labelName="email"
        onChange={dummyFunc}
        required={true}
        errorMessage="Please Enter A Valid Email"
        placeholder="jdoe@doemail.com"
        error={false}
        value={state.email[0]}
      />
      <SubHeader title="Websites" />
      <TextInput
        label="Site 1 Name:"
        labelID="email"
        labelName="email"
        onChange={dummyFunc}
        required={true}
        errorMessage="Please Enter A Valid Email"
        placeholder="jdoe@doemail.com"
        error={false}
        value={state.email[0]}
      />
      <TextInput
        label="Site 1 URL:"
        labelID="email"
        labelName="email"
        onChange={dummyFunc}
        required={true}
        errorMessage="Please Enter A Valid Email"
        placeholder="jdoe@doemail.com"
        error={false}
        value={state.email[0]}
      />
    </FormContainer>
  );
}

export default PhoneAndEmailContactForm;
