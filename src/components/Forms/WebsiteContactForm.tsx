import React, { useState } from "react";
import { WebContactData, Payload } from "../../types/resumeData";
import FormContainer from "../FormContainer/FormContainer";
import {
  checkInputForNotEmpty,
  checkValidEmail,
  checkValidWebsiteAddress,
} from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import FormSubSection from "./FormSubSection";
import TextInput from "../FormInput/TextInput";
import numberings from "../../data/numberings";
import emailExamples from "../../data/emailExamples";
import websiteExamples from "../../data/websiteExamples";

type StatefulEmailData = {
  email: string;
  error: boolean;
};
type StatefulWebsiteData = {
  URLData: { URL: string; error: boolean };
  websiteNameData: { websiteName: string; error: boolean };
};
type State = {
  emails: Array<StatefulEmailData>;
  websites: Array<StatefulWebsiteData>;
};
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
  const [state, setState] = useState<State>(createState(propState));
  function createState(propState: WebContactData): State {
    const emails: Array<StatefulEmailData> = [];
    const websites: Array<StatefulWebsiteData> = [];
    if (!prevRendered && propState.email.length === 0) {
      emails.push({ email: "", error: false });
    } else {
      emails.push(
        ...propState.email.map((email) => {
          return { email, error: checkValidEmail(email) };
        })
      );
    }
    if (!prevRendered && propState.websites.length === 0) {
      websites.push({
        URLData: {
          error: false,
          URL: "",
        },
        websiteNameData: {
          error: false,
          websiteName: "",
        },
      });
    } else {
      websites.push(
        ...propState.websites.map((website) => {
          return {
            URLData: {
              URL: website.URL,
              error:
                website.URL === "" && website.websiteName === ""
                  ? false
                  : !checkValidWebsiteAddress(website.URL),
            },
            websiteNameData: {
              websiteName: website.websiteName,
              error:
                website.URL === "" && website.websiteName === ""
                  ? false
                  : !checkInputForNotEmpty(website.websiteName),
            },
          };
        })
      );
    }
    return {
      emails,
      websites,
    };
  }
  function handleClickDeleteEmail(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    index: number
  ): void {
    const newEmails = state.emails.filter((val, idx) => {
      return idx !== index;
    });
    setState({
      ...state,
      emails: newEmails,
    });
  }
  function handleClickAddWebsite(): void {
    const newWebsites = [...state.websites];
    newWebsites.push({
      URLData: {
        URL: "",
        error: false,
      },
      websiteNameData: {
        websiteName: "",
        error: false,
      },
    });
    setState({
      ...state,
      websites: newWebsites,
    });
  }
  function handleClickAddEmail(): void {
    const newEmails = [...state.emails];
    newEmails.push({ email: "", error: false });
    setState({
      ...state,
      emails: newEmails,
    });
  }
  function handleClickDeleteWebsite(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    index: number
  ): void {
    const newWebsites = state.websites.filter((val, idx) => idx !== index);
    setState({
      ...state,
      websites: newWebsites,
    });
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const emails: Array<StatefulEmailData> = state.emails.map((email, idx) => {
      if (index === idx) {
        return {
          email: e.target.value,
          error: false,
        };
      }
      return {
        email: email.email,
        error: email.error,
      };
    });
    setState({
      ...state,
      emails,
    });
  }
  function handleEmailBlur(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const inputValue = e.target.value;
    const emails: Array<StatefulEmailData> = state.emails.map((email, idx) => {
      if (index === 0) {
        return {
          email: inputValue,
          error: !checkValidEmail(inputValue),
        };
      }
      if (index === idx) {
        return {
          email: inputValue,
          error: inputValue === "" ? false : !checkValidEmail(inputValue),
        };
      }
      return {
        email: email.email,
        error: email.error,
      };
    });

    setState({
      ...state,
      emails,
    });
  }
  function handleWebsiteNameChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const inputValue = e.target.value;
    const websites = state.websites.map((website, idx) => {
      if (index !== idx) {
        return {
          ...website,
        };
      }
      return {
        URLData: { ...website.URLData },
        websiteNameData: {
          websiteName: inputValue,
          error: false,
        },
      };
    });
    setState({
      ...state,
      websites,
    });
  }
  function handleWebsiteURLChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const inputValue = e.target.value;
    const websites = state.websites.map((website, idx) => {
      if (idx !== index) {
        return { ...website };
      }
      return {
        ...website,
        URLData: {
          URL: inputValue,
          error: false,
        },
      };
    });
    setState({
      ...state,
      websites,
    });
  }
  function handleWebsiteNameBlur(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const inputValue = e.target.value;
    const websites: Array<StatefulWebsiteData> = state.websites.map((website, idx) => {
      if (index !== idx) {
        return { ...website };
      }
      const websiteName: string = website.websiteNameData.websiteName;
      const websiteURL: string = website.URLData.URL;
      if (websiteName === "" && websiteURL === "") {
        return {
          websiteNameData: {
            websiteName: inputValue,
            error: false,
          },
          URLData: {
            URL: websiteURL,
            error: false,
          },
        };
      }
      return {
        websiteNameData: {
          websiteName: inputValue,
          error: !checkInputForNotEmpty(inputValue),
        },
        URLData: {
          URL: websiteURL,
          error: !checkValidWebsiteAddress(websiteURL),
        },
      };
    });
    setState({
      ...state,
      websites,
    });
  }
  function handleWebsiteURLBlur(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const websites: Array<StatefulWebsiteData> = state.websites.map((website, idx) => {
      if (index !== idx) {
        return { ...website };
      }
      const websiteName: string = website.websiteNameData.websiteName;
      const websiteURL: string = website.URLData.URL;
      if (websiteName === "" && websiteURL === "") {
        return {
          websiteNameData: {
            websiteName: websiteName,
            error: false,
          },
          URLData: {
            URL: websiteURL,
            error: false,
          },
        };
      }
      return {
        websiteNameData: {
          websiteName: websiteName,
          error: !checkInputForNotEmpty(websiteName),
        },
        URLData: {
          URL: websiteURL,
          error: !checkValidWebsiteAddress(websiteURL),
        },
      };
    });
    setState({
      ...state,
      websites,
    });
  }
  function renderEmails(emails: Array<StatefulEmailData>): JSX.Element {
    const fields: Array<JSX.Element> = [];
    emails.forEach((email, idx) => {
      if (idx === 0) {
        fields.push(
          <FormSubSection>
            <TextInput
              key={idx}
              label={`${numberings[idx]}:`}
              labelID={`${numberings[idx]}Email`}
              labelName={`${numberings[idx]}Email`}
              required={true}
              onChange={(e) => handleEmailChange(e, idx)}
              onBlur={(e) => handleEmailBlur(e, idx)}
              placeholder={`${emailExamples[idx]}`}
              value={email.email}
              error={email.error}
              errorMessage="A Valid Primary Email Address is Required"
              type="email"
            />
          </FormSubSection>
        );
      } else {
        fields.push(
          <FormSubSection onDeleteClick={(e) => handleClickDeleteEmail(e, idx)}>
            <TextInput
              key={idx}
              label={`${numberings[idx]}:`}
              labelID={`${numberings[idx]}Email`}
              labelName={`${numberings[idx]}Email`}
              required={false}
              onChange={(e) => handleEmailChange(e, idx)}
              onBlur={(e) => handleEmailBlur(e, idx)}
              placeholder={`${emailExamples[idx]}`}
              value={email.email}
              error={email.error}
              errorMessage="A Valid Email Address is Required"
              type="email"
            />
          </FormSubSection>
        );
      }
    });
    return <>{fields}</>;
  }
  function renderWebsites(websites: Array<StatefulWebsiteData>): JSX.Element {
    const fields: Array<JSX.Element> = [];
    websites.forEach((website, idx) => {
      if (idx === 0) {
        fields.push(
          <FormSubSection key={idx}>
            <TextInput
              label={`${numberings[idx]} Site Name:`}
              labelID={`${numberings[idx]}SiteName`}
              labelName={`${numberings[idx]}SiteName`}
              required={false}
              onChange={(e) => handleWebsiteNameChange(e, idx)}
              onBlur={(e) => handleWebsiteNameBlur(e, idx)}
              placeholder={websiteExamples[idx].siteName}
              value={website.websiteNameData.websiteName}
              error={website.websiteNameData.error}
              errorMessage="Required If You Enter A Site URL"
            />
            <TextInput
              label={`${numberings[idx]} Site URL:`}
              labelID={`${numberings[idx]}URL`}
              labelName={`${numberings[idx]}URL`}
              required={false}
              onChange={(e) => handleWebsiteURLChange(e, idx)}
              onBlur={(e) => handleWebsiteURLBlur(e, idx)}
              placeholder={websiteExamples[idx].URL}
              value={website.URLData.URL}
              error={website.URLData.error}
              errorMessage="Please Enter A Valid URL"
            />
          </FormSubSection>
        );
      } else {
        fields.push(
          <FormSubSection key={idx} onDeleteClick={(e) => handleClickDeleteWebsite(e, idx)}>
            <TextInput
              label={`${numberings[idx]} Site Name:`}
              labelID={`${numberings[idx]}SiteName`}
              labelName={`${numberings[idx]}SiteName`}
              required={false}
              onChange={(e) => handleWebsiteNameChange(e, idx)}
              onBlur={(e) => handleWebsiteNameBlur(e, idx)}
              placeholder={websiteExamples[idx].siteName}
              value={website.websiteNameData.websiteName}
              error={website.websiteNameData.error}
              errorMessage="Required If You Enter A Site URL"
            />
            <TextInput
              label={`${numberings[idx]} Site URL:`}
              labelID={`${numberings[idx]}URL`}
              labelName={`${numberings[idx]}URL`}
              required={false}
              onChange={(e) => handleWebsiteURLChange(e, idx)}
              onBlur={(e) => handleWebsiteURLBlur(e, idx)}
              placeholder={websiteExamples[idx].URL}
              value={website.URLData.URL}
              error={website.URLData.error}
              errorMessage="Please Enter A Valid URL"
            />
          </FormSubSection>
        );
      }
    });
    return <>{fields}</>;
  }
  function renderEmailHeader(emails: Array<StatefulEmailData>): JSX.Element {
    const title = "Email:";
    if (emails.length < 3) {
      return <SubHeader handleAdd={handleClickAddEmail} title={title} />;
    }
    return <SubHeader title={title} />;
  }
  function renderWebsitesHeader(websites: Array<StatefulWebsiteData>): JSX.Element {
    const title = "Websites:";
    if (websites.length < 3) {
      return <SubHeader handleAdd={handleClickAddWebsite} title={title} />;
    }
    return <SubHeader title={title} />;
  }
  function handleSubmit() {
    const emailErrors = state.emails.reduce((acc, cur, idx) => {
      if (acc) {
        return true;
      } else {
        if (idx === 0) {
          return !checkValidEmail(cur.email);
        }
        return cur.error;
      }
    }, false);
    const websiteErrors = state.websites.reduce((acc, cur) => {
      if (acc) {
        return true;
      } else {
        return cur.URLData.error || cur.websiteNameData.error;
      }
    }, false);
    const payloadData: Payload<WebContactData> = {
      data: {
        email: state.emails.map((email) => email.email),
        websites: state.websites.map((website) => {
          return {
            URL: website.URLData.URL,
            websiteName: website.websiteNameData.websiteName,
          };
        }),
      },
      error: emailErrors || websiteErrors,
    };
    submitHandler({
      data: payloadData.data,
      error: payloadData.error,
    });
    nextHandler();
  }
  return (
    <FormContainer
      title="Web and Email Contact:"
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
    >
      <>
        {renderEmailHeader(state.emails)}
        <div>{renderEmails(state.emails)}</div>
        {renderWebsitesHeader(state.websites)}
        <div>{renderWebsites(state.websites)}</div>
      </>
    </FormContainer>
  );
}
export default PhoneContactForm;
