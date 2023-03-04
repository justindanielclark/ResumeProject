import React, { useState, useEffect } from "react";
import { FormContainer, FormAnimatingTypes } from "../FormContainer/FormContainer";
import TextInput from "../FormInput/TextInput";
import SelectInput from "../FormInput/SelectInput";
import { EducationData, StatefulData } from "../../types/resumeData";
import { checkInputForNotEmpty } from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import FormSubsection from "./FormSubSection";
import { degreeTypes, degrees } from "../../data/degrees";
import schoolExamples from "../../data/schoolExamples";
import {
  handleTextInputBlurWithArrayData,
  handleTextInputChangeWithArrayData,
  handleSelectInputChangeWithArrayData,
} from "../../utils/handlers";
import DateInput from "../../components/FormInput/DateInput";
type State = Array<StatefulData<EducationData>>;
type Props = {
  propState: Array<EducationData>;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler?: () => void;
  submitHandler: (payload: { data: Array<EducationData>; error: boolean }) => void;
  animating: FormAnimatingTypes;
  handleAnimationEnd?: () => void;
};
function EducationForm({
  submitHandler,
  nextHandler,
  prevHandler,
  propState,
  animating,
  handleAnimationEnd,
}: Props) {
  const [state, setState] = useState<State>(createState(propState));
  useEffect(() => {
    console.log("FormalEducationForm");
    console.log({ state });
  }, [state]);
  function createState(educations: Array<EducationData>): State {
    const state: State = educations.map((data) => {
      const stateObj: StatefulData<EducationData> = {
        degree: {
          data: data.degree,
          error: false,
        },
        degreeType: {
          data: data.degreeType,
          error: false,
        },
        end: {
          data: {
            data: data.end.data,
            current: data.end.current,
          },
          error: false,
        },
        field: {
          data: data.field,
          error: !checkInputForNotEmpty(data.field),
        },
        school: {
          data: data.school,
          error: !checkInputForNotEmpty(data.school),
        },
      };
      return stateObj;
    });
    return state;
  }
  function handleClickAddEdu(): void {
    const newEdu: StatefulData<EducationData> = {
      degree: {
        data: degrees[0],
        error: false,
      },
      degreeType: {
        data: degreeTypes[0],
        error: false,
      },
      end: {
        data: {
          data: new Date(),
          current: false,
        },
        error: false,
      },
      field: {
        data: "",
        error: false,
      },
      school: {
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
  function eduIsEmpty(data: StatefulData<EducationData>): boolean {
    return data.field.data === "" && data.school.data === "";
  }
  function renderEdus(state: State) {
    const edus: Array<JSX.Element> = [];

    state.forEach((edu, idx) => {
      edus.push(
        <React.Fragment key={idx}>
          <SubHeader title={`School ${idx + 1}:`} handleRemove={() => handleClickRemoveEdu(idx)} />
          <FormSubsection>
            <TextInput
              label="School Name:"
              labelID={`school_${idx}`}
              labelName="school"
              required={true}
              error={state[idx].school.error}
              errorMessage="A School Name is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              placeholder={schoolExamples[idx].school}
              value={state[idx].school.data}
            />
            <SelectInput
              label="Degree:"
              labelID={`degree_${idx}`}
              labelName="degree"
              onChange={(e) =>
                handleSelectInputChangeWithArrayData(e, idx, state, setState, degrees)
              }
              options={[...degrees]}
              required={true}
              value={state[idx].degree.data}
            />
            <SelectInput
              label="Degree Type:"
              labelID={`degreeType_${idx}`}
              labelName="degreeType"
              onChange={(e) =>
                handleSelectInputChangeWithArrayData(e, idx, state, setState, degreeTypes)
              }
              options={[...degreeTypes]}
              required={true}
              value={state[idx].degreeType.data}
            />
            <TextInput
              label="Field:"
              labelID={`field_${idx}`}
              labelName="field"
              required={true}
              error={state[idx].field.error}
              errorMessage="A Degree Field is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              placeholder={schoolExamples[idx].field}
              value={state[idx].field.data}
            />
            <DateInput
              required={true}
              dateValue={state[idx].end.data.data}
              error={state[idx].end.error}
              errorMessage={""}
              label={"Graduated:"}
              labelName={`end_${idx}`}
              currentText={"Currently Attending?:"}
              currentValue={state[idx].end.data.current}
              handleChange={function (date, current) {
                const newState: Array<StatefulData<EducationData>> = state.map(
                  (dataPoint, index) => {
                    if (index !== idx) {
                      return dataPoint;
                    }
                    const newDataPoint: StatefulData<EducationData> = {
                      ...dataPoint,
                      end: {
                        data: {
                          data: date,
                          current: current,
                        },
                        error: false,
                      },
                    };
                    return newDataPoint;
                  }
                );
                setState(newState);
              }}
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
        const dataPoint = data[field as keyof EducationData];
        if (dataPoint) {
          if ("error" in dataPoint) {
            if (!error) {
              error = dataPoint.error as boolean;
            }
          }
        }
      }
    });
    const payloadData: EducationData[] = substantialEdus.map((dataPoint) => {
      const edu: EducationData = {
        degree: dataPoint.degree.data,
        degreeType: dataPoint.degreeType.data,
        end: dataPoint.end.data,
        field: dataPoint.field.data,
        school: dataPoint.school.data,
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
          ? "Collegiate Education:"
          : `Collegiate Education: (${state.length} Listed)`
      }
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
      handleAdd={state.length < schoolExamples.length ? handleClickAddEdu : undefined}
      animating={animating}
      handleAnimationEnd={handleAnimationEnd}
    >
      {state.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-md px-3 pt-2 text-center">No Education Added:</p>
          <p className="px-3 pb-2 text-center text-sm">
            To Add A Edu, Click the + In The Upper Right Corner
          </p>
        </div>
      ) : (
        renderEdus(state)
      )}
    </FormContainer>
  );
}

export default EducationForm;
