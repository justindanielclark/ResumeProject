import React, { useState } from "react";
import FormContainer from "../FormContainer/FormContainer";
import TextInput from "../FormInput/TextInput";
import SelectInput from "../FormInput/SelectInput";
import { ContactData } from "../../types/resumeData";
import SubHeader from "../FormInput/SubHeader";
import stateAbbreviations from "../../data/stateAbbreviations";
import { uuid } from "uuidv4";

type Props = {
  propState: ContactData;
  nextHandler: () => void;
  prevHandler?: () => void;
  submitHandler: (payload: { data: ContactData; error: boolean }) => void;
};

function ContactForm({
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
      <SubHeader title="Address" />
      <TextInput
        label="Street Address:"
        labelID="streetAddress1"
        labelName="streetAddress1"
        onChange={dummyFunc}
        required={true}
        errorMessage="Please Enter A Street Address"
        placeholder="123 Main Street"
        error={false}
        value={state.address.address1}
      />
      <TextInput
        label="Apt/Suite/Building Number"
        labelID="streetAddress2"
        labelName="streetAddress2"
        onChange={dummyFunc}
        required={false}
        errorMessage="Please Enter A Building Apt Number"
        placeholder="Apt #123"
        error={false}
        value={state.address.address2 ? state.address.address2 : ""}
      />
      <TextInput
        label="City:"
        labelID="city"
        labelName="city"
        onChange={dummyFunc}
        required={true}
        errorMessage="Please Enter A City"
        placeholder="Coolsville"
        error={false}
        value={state.address.city}
      />
      <SelectInput
        error={false}
        errorMessage={""}
        label={"State:"}
        labelID={"state"}
        labelName={"state"}
        onChange={dummyFunc}
        options={[...stateAbbreviations]}
        required={true}
        value={state.address.city}
      />
      <TextInput
        label="ZIP Code:"
        labelID="zip"
        labelName="zip"
        onChange={dummyFunc}
        required={true}
        errorMessage="Please Enter A ZIP Code"
        placeholder="12345"
        error={false}
        value={state.address.zip}
      />
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

export default ContactForm;
