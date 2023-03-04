import React, { useState, useEffect } from "react";
import { ReferenceData, StatefulData } from "../../types/resumeData";
import { FormContainer, FormAnimatingTypes } from "../FormContainer/FormContainer";
import TextInput from "../../components/FormInput/TextInput";
import {
  handleTextInputBlurWithArrayData,
  handleTextInputChangeWithArrayData,
} from "../../utils/handlers";
import {
  checkInputForNotEmpty,
  checkValidPhoneNumber,
  checkValidEmail,
} from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import FormSubsection from "../Forms/FormSubSection";
import referenceExamples from "../../data/referenceExamples";

type Props = {
  propState: Array<ReferenceData>;
  prevHandler: () => void;
  nextHandler: () => void;
  submitHandler: (payload: { data: Array<ReferenceData>; error: boolean }) => void;
  animating: FormAnimatingTypes;
  handleAnimationEnd?: () => void;
};
type State = Array<StatefulData<ReferenceData>>;

function ReferencesForm({
  propState,
  prevHandler,
  nextHandler,
  submitHandler,
  animating,
  handleAnimationEnd,
}: Props) {
  const [state, setState] = useState<State>(createState(propState));
  useEffect(() => {
    console.log("ReferencesForm:");
    console.log({ state });
  }, [state]);
  function createState(propState: Array<ReferenceData>): Array<StatefulData<ReferenceData>> {
    return propState.map((dataPoint) => {
      const newStateItem: StatefulData<ReferenceData> = {
        fName: {
          data: dataPoint.fName,
          error: checkInputForNotEmpty(dataPoint.fName),
        },
        lName: {
          data: dataPoint.lName,
          error: checkInputForNotEmpty(dataPoint.lName),
        },
        email: {
          data: dataPoint.email,
          error: checkValidEmail(dataPoint.email),
        },
        phone: {
          data: dataPoint.phone,
          error: checkValidPhoneNumber(dataPoint.phone),
        },
        relation: {
          data: dataPoint.relation,
          error: checkInputForNotEmpty(dataPoint.relation),
        },
      };
      return newStateItem;
    });
  }
  function handleSubmit(): void {
    const stateToSubmit = state.filter((dataPoint) => !checkIfReferenceEmpty(dataPoint));
    const payload: Array<ReferenceData> = stateToSubmit.map((dataPoint) => {
      return {
        email: dataPoint.email.data,
        fName: dataPoint.fName.data,
        lName: dataPoint.lName.data,
        phone: dataPoint.phone.data,
        relation: dataPoint.relation.data,
      };
    });
    const error = stateToSubmit.reduce((acc, cur) => {
      if (acc) return true;
      return (
        cur.email.error ||
        cur.fName.error ||
        cur.lName.error ||
        cur.phone.error ||
        cur.relation.error ||
        !checkValidEmail(cur.email.data) ||
        !checkInputForNotEmpty(cur.fName.data) ||
        !checkInputForNotEmpty(cur.lName.data) ||
        !checkValidPhoneNumber(cur.phone.data) ||
        !checkInputForNotEmpty(cur.relation.data)
      );
    }, false);
    submitHandler({ data: payload, error: error });
    nextHandler();
  }
  function checkIfReferenceEmpty(dataPoint: StatefulData<ReferenceData>): boolean {
    let returnVal = true;
    for (const property in dataPoint) {
      if (dataPoint[property as keyof ReferenceData].data !== "") {
        returnVal = false;
      }
    }
    return returnVal;
  }
  function handleClickAddReference(): void {
    const newState = [...state];
    newState.push({
      fName: {
        data: "",
        error: false,
      },
      lName: {
        data: "",
        error: false,
      },
      email: {
        data: "",
        error: false,
      },
      phone: {
        data: "",
        error: false,
      },
      relation: {
        data: "",
        error: false,
      },
    });
    setState(newState);
  }
  function handleClickRemoveReference(index: number): void {
    const newState = state.filter((el, idx) => index !== idx);
    setState(newState);
  }
  function renderReferences(state: State): Array<JSX.Element> {
    return state.map((dataPoint, idx) => {
      return (
        <React.Fragment key={idx}>
          <SubHeader
            title={`Reference ${idx + 1}:`}
            handleRemove={() => handleClickRemoveReference(idx)}
          />
          <FormSubsection>
            <TextInput
              label="First Name:"
              labelID={`fName_${idx}`}
              labelName="fName"
              required={true}
              error={dataPoint.fName.error}
              errorMessage="A Name Is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={dataPoint.fName.data}
              placeholder={referenceExamples[idx].fName}
            />
            <TextInput
              label="Last Name:"
              labelID={`lName_${idx}`}
              labelName="lName"
              required={true}
              error={dataPoint.lName.error}
              errorMessage="A Name Is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={dataPoint.lName.data}
              placeholder={referenceExamples[idx].lName}
            />
            <TextInput
              label="Title/Relation:"
              labelID={`relation_${idx}`}
              labelName="relation"
              required={true}
              error={dataPoint.relation.error}
              errorMessage="Reference Relation Is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={dataPoint.relation.data}
              placeholder={referenceExamples[idx].relation}
            />
            <TextInput
              label="Phone Number:"
              labelID={`phone_${idx}`}
              labelName="phone"
              required={true}
              error={dataPoint.phone.error}
              errorMessage="A Valid Phone Number Is Required"
              onChange={(e) => onPhoneFieldChange(e, idx)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkValidPhoneNumber)
              }
              value={dataPoint.phone.data}
              placeholder={referenceExamples[idx].phone}
            />
            <TextInput
              label="Email Address:"
              labelID={`email_${idx}`}
              labelName="email"
              required={true}
              error={dataPoint.email.error}
              errorMessage="A Valid Email Address Is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkValidEmail)
              }
              value={dataPoint.email.data}
              placeholder={referenceExamples[idx].email}
            />
          </FormSubsection>
        </React.Fragment>
      );
    });
  }
  function onPhoneFieldChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const input = e.target.value;
    const inputChar = input.length > 0 ? input[input.length - 1] : "";
    switch (input.length) {
      case 0:
        setState(
          state.map((dataPoint, idx) => {
            if (idx !== index) {
              return dataPoint;
            }
            return {
              ...dataPoint,
              phone: {
                data: "",
                error: false,
              },
            };
          })
        );
        break;
      case 1:
        if (inputChar.match(/[0-9]/)) {
          setState(
            state.map((dataPoint, idx) => {
              if (index !== idx) {
                return dataPoint;
              }
              return {
                ...dataPoint,
                phone: {
                  data: `(${input}`,
                  error: false,
                },
              };
            })
          );
        } else if (inputChar === "(") {
          setState(
            state.map((dataPoint, idx) => {
              if (index !== idx) {
                return dataPoint;
              }
              return {
                ...dataPoint,
                phone: {
                  data: `(`,
                  error: false,
                },
              };
            })
          );
        }
        break;
      case 2:
      case 3:
      case 4:
        if (inputChar.match(/[0-9]/)) {
          setState(
            state.map((dataPoint, idx) => {
              if (index !== idx) {
                return dataPoint;
              }
              return {
                ...dataPoint,
                phone: {
                  data: input,
                  error: false,
                },
              };
            })
          );
        }
        break;
      case 5:
        if (inputChar.match(/[0-9]/)) {
          setState(
            state.map((dataPoint, idx) => {
              if (index !== idx) {
                return dataPoint;
              }
              return {
                ...dataPoint,
                phone: {
                  data: `${input.slice(0, 4)})${inputChar}`,
                  error: false,
                },
              };
            })
          );
        } else if (inputChar === ")") {
          setState(
            state.map((dataPoint, idx) => {
              if (index !== idx) {
                return dataPoint;
              }
              return {
                ...dataPoint,
                phone: {
                  data: input,
                  error: false,
                },
              };
            })
          );
        }
        break;
      case 6:
      case 7:
      case 8:
        if (inputChar.match(/[0-9]/)) {
          setState(
            state.map((dataPoint, idx) => {
              if (index !== idx) {
                return dataPoint;
              }
              return {
                ...dataPoint,
                phone: {
                  data: input,
                  error: false,
                },
              };
            })
          );
        }
        break;
      case 9:
        if (inputChar.match(/[0-9]/)) {
          setState(
            state.map((dataPoint, idx) => {
              if (index !== idx) {
                return dataPoint;
              }
              return {
                ...dataPoint,
                phone: {
                  data: `${input.slice(0, 8)}-${inputChar}`,
                  error: false,
                },
              };
            })
          );
        } else if (inputChar === "-") {
          setState(
            state.map((dataPoint, idx) => {
              if (index !== idx) {
                return dataPoint;
              }
              return {
                ...dataPoint,
                phone: {
                  data: input,
                  error: false,
                },
              };
            })
          );
        }
        break;
      case 10:
      case 11:
      case 12:
      case 13:
        if (inputChar.match(/[0-9]/)) {
          setState(
            state.map((dataPoint, idx) => {
              if (index !== idx) {
                return dataPoint;
              }
              return {
                ...dataPoint,
                phone: {
                  data: input,
                  error: false,
                },
              };
            })
          );
        }
        return;
    }
  }

  return (
    <FormContainer
      title={state.length <= 1 ? "References:" : `References: (${state.length} Listed)`}
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
      handleAdd={state.length < 3 ? handleClickAddReference : undefined}
      animating={animating}
      handleAnimationEnd={handleAnimationEnd}
    >
      {state.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-md px-3 pt-2 text-center">No References Added:</p>
          <p className="px-3 pb-2 text-center text-sm">
            To Add A Reference, Click the + In The Upper Right Corner
          </p>
        </div>
      ) : (
        renderReferences(state)
      )}
    </FormContainer>
  );
}

export default ReferencesForm;
