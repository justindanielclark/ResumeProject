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
} from "../../types/resumeData";

type Props = {
  propState: NameData;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler?: () => void;
  submitHandler: (payload: { data: NameData; error: boolean }) => void;
};
function NameForm({
  submitHandler,
  nextHandler,
  prevHandler,
  propState,
  prevRendered,
}: Props) {
  const [state, setState] = useState({
    prefix: {
      data: propState.prefix,
      error: false,
    },
    firstName: {
      data: propState.firstName,
      error: !prevRendered
        ? false
        : !checkNameInputForValidity(propState.firstName),
    },
    lastName: {
      data: propState.lastName,
      error: !prevRendered
        ? false
        : !checkNameInputForValidity(propState.lastName),
    },
    suffix: {
      data: propState.suffix,
      error: false,
    },
    pronoun: {
      data: propState.pronoun,
      error: false,
    },
  });

  //!HANDLERS
  //Input Changes
  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value as (typeof prefixes)[number];
    if (selectValue !== state.prefix.data) {
      setState({
        ...state,
        prefix: {
          data: selectValue,
          error: false,
        },
      });
    }
  };
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue !== state.firstName.data) {
      setState({
        ...state,
        firstName: {
          data: inputValue,
          error: inputValue === "" ? true : false,
        },
      });
    }
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue !== state.lastName.data) {
      setState({
        ...state,
        lastName: {
          data: inputValue,
          error: inputValue === "" ? true : false,
        },
      });
    }
  };
  const handleSuffixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value as (typeof suffixes)[number];
    if (selectValue !== state.suffix.data) {
      setState({
        ...state,
        suffix: {
          data: selectValue,
          error: false,
        },
      });
    }
  };
  const handlePronounChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      pronoun: {
        data: pronouns[e.target.selectedIndex],
        error: false,
      },
    });
  };
  //Input Blurs
  const handleFirstNameBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valid = checkNameInputForValidity(e.target.value);
    if (!valid && !state.firstName.error) {
      setState({
        ...state,
        firstName: {
          data: state.firstName.data,
          error: !valid,
        },
      });
    }
  };
  const handleLastNameBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valid = checkNameInputForValidity(e.target.value);
    if (!valid && !state.lastName.error) {
      setState({
        ...state,
        lastName: {
          data: state.lastName.data,
          error: !valid,
        },
      });
    }
  };
  //!RENDER
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
        onChange={handlePrefixChange}
        options={[...prefixes]}
        required={true}
        value={state.prefix.data}
      />
      <TextInput
        label="First:"
        labelID="firstName"
        labelName="firstName"
        onChange={handleFirstNameChange}
        onBlur={handleFirstNameBlur}
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
        onChange={handleLastNameChange}
        onBlur={handleLastNameBlur}
        required={true}
        errorMessage="Please Enter Your Last Name"
        placeholder="Doe"
        error={state.lastName.error}
        value={state.lastName.data}
      />
      <SelectInput
        error={false}
        errorMessage={""}
        label={"Suffix:"}
        labelID={"suffix"}
        labelName={"suffix"}
        onChange={handleSuffixChange}
        options={[...suffixes]}
        required={true}
        value={state.suffix.data}
      />
      <SelectInput
        error={false}
        errorMessage={""}
        label={"Pronouns:"}
        labelID={"pronouns"}
        labelName={"pronouns"}
        onChange={handlePronounChange}
        options={pronouns.map(convertPronounGroupIntoString)}
        required={true}
        value={convertPronounGroupIntoString(state.pronoun.data)}
        addDataAttribute={true}
      />
    </FormContainer>
  );
}

function checkNameInputForValidity(name: string): boolean {
  return name.length !== 0;
}
function convertPronounGroupIntoString(pronounGroup: PronounType): string {
  if (pronounGroup.length === 1) {
    return pronounGroup[0] as string;
  } else {
    if (pronounGroup.length === 3) {
      return `(${pronounGroup[0]}/${pronounGroup[1]}/${pronounGroup[2]})`;
    } else {
      throw new Error(
        "Incorrect Pronoun Group Supplied to Func Call in NameForm.tsx"
      );
    }
  }
}

export default NameForm;
