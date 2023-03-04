import React, { useEffect, useState } from "react";
import { FormContainer, FormAnimatingTypes } from "../FormContainer/FormContainer";
import TextInput from "../FormInput/TextInput";
import DateInput from "../FormInput/DateInput";
import { NonCollegiateEducationData, StatefulData } from "../../types/resumeData";
import { checkInputForNotEmpty } from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import FormSubsection from "./FormSubSection";
import {
  handleTextInputBlurWithArrayData,
  handleTextInputChangeWithArrayData,
} from "../../utils/handlers";
import TextAreaInput from "../FormInput/TextAreaInput";
import examples from "../../data/nonCollegiateEduExamples";
type State = Array<StatefulData<NonCollegiateEducationData>>;
type Props = {
  propState: Array<NonCollegiateEducationData>;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler?: () => void;
  submitHandler: (payload: { data: Array<NonCollegiateEducationData>; error: boolean }) => void;
  animating: FormAnimatingTypes;
  handleAnimationEnd?: () => void;
};
function NonCollegiateEducationForm({
  submitHandler,
  nextHandler,
  prevHandler,
  propState,
  animating,
  handleAnimationEnd,
}: Props) {
  const [state, setState] = useState<State>(createState(propState));
  useEffect(() => {
    console.log("NonCollegiateEducationForm:");
    console.log({ state });
  }, [state]);
  function createState(educations: Array<NonCollegiateEducationData>): State {
    const state: State = educations.map((data) => {
      const stateObj: StatefulData<NonCollegiateEducationData> = {
        program: {
          data: data.program,
          error: !checkInputForNotEmpty(data.program),
        },
        end: {
          data: {
            current: data.end.current,
            data: data.end.data,
          },
          error: false,
        },
        description: { data: data.description, error: !checkInputForNotEmpty(data.description) },
      };
      return stateObj;
    });
    return state;
  }
  function handleClickAddEdu(): void {
    const newEdu: StatefulData<NonCollegiateEducationData> = {
      end: {
        data: {
          current: false,
          data: new Date(),
        },
        error: false,
      },
      program: {
        data: "",
        error: false,
      },
      description: {
        data: "",
        error: false,
      },
    };
    const newState: State = [...state, newEdu];
    setState(newState);
  }
  function handleClickRemoveEdu(idx: number): void {
    const newState: State = state.filter((edu, index) => {
      return index !== idx;
    });
    setState(newState);
  }
  function eduIsEmpty(data: StatefulData<NonCollegiateEducationData>): boolean {
    return data.program.data === "";
  }
  function renderEdus(state: State) {
    const edus: Array<JSX.Element> = [];

    state.forEach((edu, idx) => {
      edus.push(
        <React.Fragment key={idx}>
          <SubHeader
            title={`Program/Cert ${idx + 1}:`}
            handleRemove={() => handleClickRemoveEdu(idx)}
          />
          <FormSubsection>
            <TextInput
              label="Name:"
              labelID={`program_${idx}`}
              labelName="program"
              required={true}
              error={state[idx].program.error}
              errorMessage="Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={state[idx].program.data}
              placeholder={examples[idx].program}
            />
            <DateInput
              label="Completed:"
              labelName="end"
              handleChange={function (date, current) {
                const newState: Array<StatefulData<NonCollegiateEducationData>> = state.map(
                  (dataPoint, index) => {
                    if (idx !== index) {
                      return dataPoint;
                    } else {
                      const newDataPoint: StatefulData<NonCollegiateEducationData> = {
                        ...dataPoint,
                        end: {
                          data: {
                            current,
                            data: date,
                          },
                          error: false,
                        },
                      };
                      return newDataPoint;
                    }
                  }
                );
                setState(newState);
              }}
              dateValue={state[idx].end.data.data}
              currentValue={state[idx].end.data.current}
              currentText={"Currently Enrolled:"}
              required={true}
              error={state[idx].end.error}
              errorMessage={""}
            />
            <TextAreaInput
              label="Description:"
              labelID={`description_${idx}`}
              labelName="description"
              required={false}
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              placeholder={examples[idx].description}
            />
          </FormSubsection>
        </React.Fragment>
      );
    });

    return edus;
  }
  function handleSubmit() {
    const substantialEdus = state.filter((data) => !eduIsEmpty(data));
    let error = false;
    substantialEdus.forEach((data) => {
      for (const field in data) {
        const dataPoint = data[field as keyof NonCollegiateEducationData];
        if (dataPoint) {
          if ("error" in dataPoint) {
            if (!error) {
              error = dataPoint.error as boolean;
            }
          }
        }
      }
    });
    const payloadData: NonCollegiateEducationData[] = substantialEdus.map((dataPoint) => {
      const edu: NonCollegiateEducationData = {
        description: dataPoint.description.data,
        end: dataPoint.end.data,
        program: dataPoint.program.data,
      };
      return edu;
    });
    submitHandler({
      data: payloadData,
      error,
    });
    nextHandler();
  }
  //!RENDER
  return (
    <FormContainer
      title={
        state.length <= 1 ? "Programs/Certifications:" : `Programs/Certs: (${state.length} Listed)`
      }
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
      handleAdd={state.length < 3 ? handleClickAddEdu : undefined}
      animating={animating}
      handleAnimationEnd={handleAnimationEnd}
    >
      {state.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-md px-3 pt-2 text-center">No Programs/Certs Added:</p>
          <p className="px-3 pb-2 text-center text-sm">
            To Add A Program/Cert, Click the + In The Upper Right Corner
          </p>
        </div>
      ) : (
        renderEdus(state)
      )}
    </FormContainer>
  );
}

export default NonCollegiateEducationForm;
