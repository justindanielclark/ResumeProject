import React, { useState, useEffect } from "react";
import FormContainer from "../FormContainer/FormContainer";
import TextInput from "../FormInput/TextInput";
import { NonCollegiateEducationData, StatefulData } from "../../types/resumeData";
import { checkInputForNotEmpty } from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import FormSubsection from "./FormSubSection";
import {
  handleTextInputBlurWithArrayData,
  handleTextInputChangeWithArrayData,
} from "../../utils/handlers";
import TextAreaInput from "../FormInput/TextAreaInput";
type State = Array<StatefulData<NonCollegiateEducationData>>;
type Props = {
  propState: Array<NonCollegiateEducationData>;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler?: () => void;
  submitHandler: (payload: { data: Array<NonCollegiateEducationData>; error: boolean }) => void;
};
function NonCollegiateEducationForm({ submitHandler, nextHandler, prevHandler, propState }: Props) {
  const [state, setState] = useState<State>(createState(propState));
  function createState(educations: Array<NonCollegiateEducationData>): State {
    const state: State = educations.map((data) => {
      const stateObj: StatefulData<NonCollegiateEducationData> = {
        program: {
          data: data.program,
          error: !checkInputForNotEmpty(data.program),
        },
        end: {
          data: data.end,
          error: false,
        },
        field: {
          data: data.field,
          error: !checkInputForNotEmpty(data.description),
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
        data: new Date(),
        error: false,
      },
      field: {
        data: "",
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
  function handleDateInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number,
    stateField: keyof StatefulData<NonCollegiateEducationData>
  ) {
    const newState = state.map((edu, idx) => {
      if (idx !== itemIndex) {
        return edu;
      } else {
        const newStateItem: StatefulData<NonCollegiateEducationData> = {
          ...edu,
          [stateField]: {
            data: new Date(e.target.value),
            error: false,
          },
        };
        return newStateItem;
      }
    });
    setState(newState);
  }
  function handleTextAreaInputChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    itemIndex: number,
    stateField: keyof StatefulData<NonCollegiateEducationData>
  ): void {
    const newState = state.map((jobData, idx) => {
      if (idx !== itemIndex) {
        return jobData;
      } else {
        const newStateItem: StatefulData<NonCollegiateEducationData> = {
          ...jobData,
          [stateField]: {
            data: e.target.value,
            error: false,
          },
        };
        return newStateItem;
      }
    });
    setState(newState);
  }
  function eduIsEmpty(data: StatefulData<NonCollegiateEducationData>): boolean {
    return data.field.data === "" && data.program.data === "";
  }
  function renderEdus(state: State) {
    const edus: Array<JSX.Element> = [];

    state.forEach((edu, idx) => {
      edus.push(
        <React.Fragment key={idx}>
          <SubHeader title={`School ${idx + 1}:`} handleRemove={() => handleClickRemoveEdu(idx)} />
          <FormSubsection>
            <TextInput
              label="Program/Certificate:"
              labelID={`program_${idx}`}
              labelName="program"
              required={true}
              error={state[idx].program.error}
              errorMessage="A Program/Cert Name is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={state[idx].program.data}
            />
            <TextInput
              label="Finished:"
              labelID={`end_${idx}`}
              labelName="end"
              required={true}
              onChange={(e) => handleDateInputChange(e, idx, "end")}
              type="date"
              value={state[idx].end.data.toISOString().slice(0, 10)}
            />
            <TextAreaInput
              label="Description:"
              labelID={`description_${idx}`}
              labelName="description"
              required={false}
              onChange={(e) => handleTextAreaInputChange(e, idx, "description")}
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
        field: dataPoint.field.data,
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
        state.length <= 1
          ? "Programs/Certifications:"
          : `Programs/Certifications: (${state.length} Listed)`
      }
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
      handleAdd={handleClickAddEdu}
    >
      {state.length === 0 ? (
        <>
          <p className="text-md px-3 pt-2 text-center">No Programs/Certs Added:</p>
          <p className="px-3 pb-2 text-center text-sm">
            To Add A Program/Cert, Click the + In The Upper Right Corner
          </p>
        </>
      ) : (
        renderEdus(state)
      )}
    </FormContainer>
  );
}

export default NonCollegiateEducationForm;
