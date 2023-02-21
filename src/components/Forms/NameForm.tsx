import React, { useState } from "react";
import FormContainer from "../FormContainer/FormContainer";
import TextInput from "../FormInput/TextInput";
import SelectInput from "../FormInput/SelectInput";
import {
  NameData,
  pronouns,
  prefixes,
  suffixes,
  PronounType,
  StatefulData,
} from "../../types/resumeData";
import { checkInputForNotEmpty } from "../../utils/inputValidation";
import {
  handleSelectInputChange,
  handleTextInputChange,
  handleTextInputBlur,
} from "../../utils/handlers";
type State = StatefulData<NameData>;
type Props = {
  propState: NameData;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler?: () => void;
  submitHandler: (payload: { data: NameData; error: boolean }) => void;
};
function NameForm({ submitHandler, nextHandler, prevHandler, propState, prevRendered }: Props) {
  const [state, setState] = useState<State>({
    prefix: {
      data: propState.prefix,
    },
    firstName: {
      data: propState.firstName,
      error: !prevRendered ? false : !checkInputForNotEmpty(propState.firstName),
    },
    lastName: {
      data: propState.lastName,
      error: !prevRendered ? false : !checkInputForNotEmpty(propState.lastName),
    },
    suffix: {
      data: propState.suffix,
    },
    pronouns: {
      data: propState.pronouns,
    },
  });
  //!HANDLERS
  //Input Changes
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleTextInputChange(e, state, setState, checkInputForNotEmpty);
  const handleNameBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleTextInputBlur(e, state, setState, checkInputForNotEmpty);
  };
  const handlePronounChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      pronouns: {
        data: pronouns[e.target.selectedIndex],
      },
    });
  };
  const handleSubmit = () => {
    const firstNameValidity = checkInputForNotEmpty(state.firstName.data);
    const lastNameValidity = checkInputForNotEmpty(state.lastName.data);
    const payloadData = {
      firstName: state.firstName.data,
      lastName: state.lastName.data,
      prefix: state.prefix.data,
      suffix: state.suffix.data,
      pronouns: state.pronouns.data,
    };
    const error = !(firstNameValidity && lastNameValidity);
    submitHandler({
      data: payloadData,
      error,
    });
    nextHandler();
  };
  //!RENDER
  return (
    <FormContainer title="Name" nextHandler={handleSubmit} prevHandler={prevHandler}>
      <div>
        <SelectInput
          label={"Prefix:"}
          labelID={"prefix"}
          labelName={"prefix"}
          onChange={(e) => handleSelectInputChange(e, state, setState, prefixes)}
          options={[...prefixes]}
          required={false}
          value={state.prefix.data}
        />
        <TextInput
          label="First:"
          labelID="firstName"
          labelName="firstName"
          onChange={handleNameInput}
          onBlur={handleNameBlur}
          required={true}
          errorMessage="Please Enter Your First Name"
          placeholder="John/Jane"
          error={state.firstName.error}
          value={state.firstName.data}
        />
        <TextInput
          label="Last:"
          labelID="lastName"
          labelName="lastName"
          onChange={handleNameInput}
          onBlur={handleNameBlur}
          required={true}
          errorMessage="Please Enter Your Last Name"
          placeholder="Doe"
          error={state.lastName.error}
          value={state.lastName.data}
        />
        <SelectInput
          label={"Suffix:"}
          labelID={"suffix"}
          labelName={"suffix"}
          onChange={(e) => handleSelectInputChange(e, state, setState, suffixes)}
          options={[...suffixes]}
          required={false}
          value={state.suffix.data}
        />
        <SelectInput
          label={"Pronouns:"}
          labelID={"pronouns"}
          labelName={"pronouns"}
          onChange={handlePronounChange}
          options={pronouns.map(convertPronounGroupIntoString)}
          required={false}
          value={convertPronounGroupIntoString(state.pronouns.data)}
          addDataAttribute={true}
        />
      </div>
    </FormContainer>
  );
}
function convertPronounGroupIntoString(pronounGroup: PronounType): string {
  if (pronounGroup.length === 1) {
    return pronounGroup[0] as string;
  } else {
    if (pronounGroup.length === 3) {
      return `(${pronounGroup[0]}/${pronounGroup[1]}/${pronounGroup[2]})`;
    } else {
      throw new Error("Incorrect Pronoun Group Supplied to Func Call in NameForm.tsx");
    }
  }
}

export default NameForm;
