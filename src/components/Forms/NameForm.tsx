import React from "react";
import FormContainer from "../FormContainer/FormContainer";
import TextInput from "../FormInput/TextInput";
import SelectInput from "../FormInput/SelectInput";

type Props = {
  nextHandler: () => void;
  prevHandler?: () => void;
};

function Name({ nextHandler, prevHandler }: Props) {
  return (
    <FormContainer
      title="Name"
      nextHandler={nextHandler}
      prevHandler={prevHandler}
    >
      <SelectInput
        error={false}
        errorMessage={""}
        label={"Prefix:"}
        labelID={"prefix"}
        labelName={"prefix"}
        onChange={(e) => console.log(e)}
        options={["N/A", "Mr.", "Ms.", "Mrs.", "Mx."]}
        required={true}
      />
      <TextInput
        label="First:"
        labelID="firstName"
        labelName="firstName"
        onChange={(e) => {
          console.log(e);
        }}
        required={true}
        errorMessage="Please Enter Your First Name"
        placeholder="John/Jane"
        error={false}
      />
      <TextInput
        label="Last:"
        labelID="lastName"
        labelName="lastName"
        onChange={(e) => {
          console.log(e);
        }}
        required={true}
        errorMessage="Please Enter Your Last Name"
        placeholder="Doe"
        error={false}
      />
    </FormContainer>
  );
}

export default Name;
