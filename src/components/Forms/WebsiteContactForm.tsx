import React, { useState } from "react";
import { WebContactData, Payload, StatefulData } from "../../types/resumeData";
import FormContainer from "../FormContainer/FormContainer";
import { checkValidEmail, checkValidWebsiteAddress } from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import TextInput from "../FormInput/TextInput";
import TextInputWithSubButton from "../FormInput/TextInputWithSubButton";
import SubHeaderWithAddButton from "../FormInput/SubHeaderWithAddButton";

type inputsToRenderState = {
  emails: number;
  websites: number;
};
type State = StatefulData<WebContactData>;

type Props = {
  propState: WebContactData;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler: () => void;
  submitHandler: (payload: Payload<WebContactData>) => void;
};
function PhoneContactForm({
  submitHandler,
  nextHandler,
  prevHandler,
  propState,
  prevRendered,
}: Props) {
  const [inputsToRender, setInputsToRender] = useState<inputsToRenderState>(
    createInputsToRenderState(propState)
  );
  const [state, setState] = useState<State>(createState(propState));

  function handleClickDeleteEmail(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    index: number
  ): void {
    const newEmails = state.email.data.filter((val, idx) => {
      return idx !== index;
    });
    setState({
      ...state,
      email: {
        data: newEmails,
        error: doEmailsHaveErrors(newEmails),
      },
    });
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const inputValue = e.target.value;
    const emails = [...state.email.data];
    emails[index] = inputValue;

    setState({
      ...state,
      email: {
        data: emails,
        error: state.email.error,
      },
    });
  }
  function createInputsToRenderState(propState: WebContactData): inputsToRenderState {
    const State: inputsToRenderState = {
      emails: propState.email.length === 0 ? 1 : propState.email.length,
      websites: propState.websites.length === 0 ? 1 : propState.websites.length,
    };
    return State;
  }
  function createState(propState: WebContactData): State {
    const state: State = {
      email: {
        data: [...propState.email],
        error: prevRendered ? doEmailsHaveErrors(propState.email) : false,
      },
      websites: {
        data: [...propState.websites],
        error: prevRendered
          ? propState.websites.reduce((acc, cur) => {
              if (acc) return true;
              return !checkValidEmail(cur.URL);
            }, false)
          : false,
      },
    };
    return state;
  }
  function renderEmails(emails: Array<string>): JSX.Element {
    console.log(emails);
    const fields: Array<JSX.Element> = [];
    fields.push(
      <TextInput
        key={0}
        label="Primary:"
        labelID=""
        labelName=""
        required
        onChange={(e) => handleEmailChange(e, 0)}
        onBlur={dummyFunc}
        placeholder={"jdoe@doemail.com"}
        value={state.email.data[0]}
        type="email"
      />
    );
    if (emails.length >= 2) {
      fields.push(
        <TextInputWithSubButton
          key={1}
          label="Secondary:"
          labelID="secondEmail"
          labelName="secondEmail"
          required={false}
          onChange={(e) => handleEmailChange(e, 1)}
          onBlur={dummyFunc}
          placeholder={"jdoe@doemail.com"}
          handleDelete={(e) => handleClickDeleteEmail(e, 1)}
          value={state.email.data[1]}
          type="email"
        />
      );
    }
    if (emails.length >= 3) {
      fields.push(
        <TextInputWithSubButton
          key={2}
          label="Tertiary:"
          labelID="thirdEmail"
          labelName="thirdEmail"
          required={false}
          onChange={(e) => handleEmailChange(e, 2)}
          onBlur={dummyFunc}
          placeholder={"jdoe@doemail.com"}
          handleDelete={(e) => handleClickDeleteEmail(e, 2)}
          value={state.email.data[2]}
          type="email"
        />
      );
    }
    if (emails.length >= 4) {
      throw new Error("Unexpected Amount of Emails Registered");
    }
    return <>{fields}</>;
  }
  function renderWebsites(websites: Array<{ URL: string; websiteName: string }>): JSX.Element {
    const fields: Array<JSX.Element> = [];
    fields.push(
      <React.Fragment key={0}>
        <TextInput
          label="Primary Site Name:"
          labelID="primarySite"
          labelName="primarySite"
          required={false}
          onChange={dummyFunc}
          onBlur={dummyFunc}
          placeholder={"GitHub"}
        />
        <TextInput
          label="Primary URL:"
          labelID="primaryURL"
          labelName="primaryURL"
          required={false}
          onChange={dummyFunc}
          onBlur={dummyFunc}
          placeholder={"github.com"}
        />
      </React.Fragment>
    );
    if (websites.length >= 2) {
      fields.push(
        <React.Fragment key={1}>
          <TextInputWithSubButton
            key={1}
            label="Secondary Site Name:"
            labelID="secondarySite"
            labelName="secondarySite"
            required={false}
            onChange={dummyFunc}
            onBlur={dummyFunc}
            placeholder={"Facebook"}
            handleDelete={dummyFunc}
          />
          <TextInput
            label="Secondary URL:"
            labelID="secondaryURL"
            labelName="secondaryURL"
            required={false}
            onChange={dummyFunc}
            onBlur={dummyFunc}
            placeholder={"Facebook.com/profiles_jdoe"}
          />
        </React.Fragment>
      );
    }
    if (websites.length >= 3) {
      fields.push(
        <React.Fragment key={2}>
          <TextInputWithSubButton
            key={2}
            label="Tertiary Site Name:"
            labelID="secondarySite"
            labelName="secondarySite"
            required={false}
            onChange={dummyFunc}
            onBlur={dummyFunc}
            placeholder={"LinkedIn"}
            handleDelete={dummyFunc}
          />
          <TextInput
            label="Tertiary URL:"
            labelID="tertiaryURL"
            labelName="tertiaryURL"
            required={false}
            onChange={dummyFunc}
            onBlur={dummyFunc}
            placeholder={"LinkedIn.com/profiles_jdoe"}
          />
        </React.Fragment>
      );
    }
    if (websites.length >= 4) {
      throw new Error("Unexpected Amount of Emails Registered");
    }
    return <>{fields}</>;
  }
  function renderEmailHeader(emails: Array<string>): JSX.Element {
    if (emails.length < 3) {
      return <SubHeaderWithAddButton handleAdd={prevHandler} title="Email:" />;
    }
    return <SubHeader title="Email:" />;
  }
  function doEmailsHaveErrors(emails: Array<string>): boolean {
    return emails.reduce((acc, cur) => {
      if (acc) return true;
      return !checkValidEmail(cur);
    }, false);
  }
  const dummyFunc = () => {
    console.log("hit");
  };
  function handleSubmit() {
    //   const hasErrors = !(!state.email.error && !state.websites.error);
    //   const payloadData: Payload<WebContactData> = {
    //     data: {
    //       email: [...state.email.data],
    //       websites: [...state.websites.data],
    //     },
    //     error: hasErrors,
    //   };
    //   submitHandler(payloadData);
    //   nextHandler();
  }
  return (
    <FormContainer
      title="Web and Email Contact:"
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
    >
      <>
        {renderEmailHeader(state.email.data)}
        {renderEmails(state.email.data)}
        <SubHeaderWithAddButton handleAdd={prevHandler} title="Websites:" />
        {renderWebsites(state.websites.data)}
      </>
    </FormContainer>
  );
}
export default PhoneContactForm;
