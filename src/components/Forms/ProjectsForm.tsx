import React, { useState } from "react";
import { ProjectData, StatefulData } from "../../types/resumeData";
import { FormContainer, FormAnimatingTypes } from "../FormContainer/FormContainer";
import TextInput from "../../components/FormInput/TextInput";
import {
  handleTextInputBlurWithArrayData,
  handleTextInputChangeWithArrayData,
} from "../../utils/handlers";
import {
  checkInputForNotEmpty,
  checkValidWebsiteAddressOrIsEmpty,
} from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import FormSubsection from "../Forms/FormSubSection";
import projectExamples from "../../data/projectExamples";
import TextAreaInput from "../FormInput/TextAreaInput";

type Props = {
  propState: Array<ProjectData>;
  prevHandler: () => void;
  nextHandler: () => void;
  submitHandler: (payload: { data: Array<ProjectData>; error: boolean }) => void;
  animating: FormAnimatingTypes;
  handleAnimationEnd?: () => void;
};
type State = Array<StatefulData<Required<ProjectData>>>;

function ProjectsForm({
  propState,
  prevHandler,
  nextHandler,
  submitHandler,
  animating,
  handleAnimationEnd,
}: Props) {
  const [state, setState] = useState<State>(createState(propState));
  function createState(propState: Array<ProjectData>): Array<StatefulData<Required<ProjectData>>> {
    return propState.map((dataPoint) => {
      const newStateItem: StatefulData<Required<ProjectData>> = {
        liveURL: {
          data: dataPoint.liveURL ? dataPoint.liveURL : "",
          error: dataPoint.liveURL ? !checkInputForNotEmpty(dataPoint.liveURL) : false,
        },
        repoURL: {
          data: dataPoint.repoURL ? dataPoint.repoURL : "",
          error: dataPoint.repoURL ? !checkInputForNotEmpty(dataPoint.repoURL) : false,
        },
        description: {
          data: dataPoint.description,
          error: !checkInputForNotEmpty(dataPoint.description),
        },
        name: {
          data: dataPoint.name,
          error: !checkInputForNotEmpty(dataPoint.name),
        },
        skills: {
          data: dataPoint.skills,
          error: !checkInputForNotEmpty(dataPoint.name),
        },
      };
      return newStateItem;
    });
  }
  function handleSubmit(): void {
    const stateToSubmit = state.filter((dataPoint) => !checkIfProjectEmpty(dataPoint));
    const payload: Array<ProjectData> = stateToSubmit.map((dataPoint) => {
      const payloadDataPoint: ProjectData = {
        description: dataPoint.description.data,
        name: dataPoint.name.data,
        skills: dataPoint.skills.data,
      };
      if (dataPoint.liveURL.data !== "") {
        payloadDataPoint.liveURL = dataPoint.liveURL.data;
      }
      if (dataPoint.repoURL.data !== "") {
        payloadDataPoint.repoURL = dataPoint.repoURL.data;
      }
      return payloadDataPoint;
    });
    const error = stateToSubmit.reduce((acc, cur) => {
      if (acc) return true;
      return cur.description.error || cur.liveURL.error || cur.name.error || cur.repoURL.error;
    }, false);
    submitHandler({ data: payload, error: error });
    nextHandler();
  }
  function checkIfProjectEmpty(dataPoint: StatefulData<ProjectData>): boolean {
    let returnVal = true;
    if (
      dataPoint.description.data !== "" ||
      dataPoint.name.data !== "" ||
      dataPoint.skills.data !== ""
    ) {
      returnVal = false;
    }
    if (dataPoint.liveURL) {
      if (dataPoint.liveURL.data !== "") {
        returnVal = false;
      }
    }
    if (dataPoint.repoURL) {
      if (dataPoint.repoURL.data !== "") {
        returnVal = false;
      }
    }
    return returnVal;
  }
  function handleClickAddProject(): void {
    const newState = [...state];
    newState.push({
      description: {
        data: "",
        error: false,
      },
      liveURL: {
        data: "",
        error: false,
      },
      name: {
        data: "",
        error: false,
      },
      repoURL: {
        data: "",
        error: false,
      },
      skills: {
        data: "",
        error: false,
      },
    });
    setState(newState);
  }
  function handleClickRemoveProject(index: number): void {
    const newState = state.filter((el, idx) => index !== idx);
    setState(newState);
  }
  function renderProjects(state: State): Array<JSX.Element> {
    return state.map((dataPoint, idx) => {
      return (
        <React.Fragment key={idx}>
          <SubHeader
            title={`Project ${idx + 1}:`}
            handleRemove={() => handleClickRemoveProject(idx)}
          />
          <FormSubsection>
            <TextInput
              label="Project Name:"
              labelID={`name_${idx}`}
              labelName="name"
              required={true}
              error={dataPoint.name.error}
              errorMessage="A Name Is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={dataPoint.name.data}
              placeholder={projectExamples[idx].name}
            />
            <TextInput
              label="Live URL:"
              labelID={`liveURL_${idx}`}
              labelName="liveURL"
              required={false}
              error={dataPoint.liveURL.error}
              errorMessage="URL Is Invalid"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(
                  e,
                  idx,
                  state,
                  setState,
                  checkValidWebsiteAddressOrIsEmpty
                )
              }
              value={dataPoint.liveURL.data}
              placeholder={projectExamples[idx].liveURL}
            />
            <TextInput
              label="Repo URL:"
              labelID={`repoURL_${idx}`}
              labelName="repoURL"
              required={false}
              error={dataPoint.repoURL.error}
              errorMessage="URL Is Invalid"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(
                  e,
                  idx,
                  state,
                  setState,
                  checkValidWebsiteAddressOrIsEmpty
                )
              }
              value={dataPoint.repoURL.data}
              placeholder={projectExamples[idx].repoURL}
            />
            <TextAreaInput
              label="Description:"
              labelID={`description_${idx}`}
              placeholder={projectExamples[idx].description}
              labelName="description"
              required={true}
              error={dataPoint.description.error}
              errorMessage="A Description Is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={state[idx].description.data}
            />
            <TextAreaInput
              label="Skills/Technologies Used:"
              labelID={`skills_${idx}`}
              placeholder={projectExamples[idx].skills}
              labelName="skills"
              required={false}
              error={dataPoint.skills.error}
              errorMessage=""
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={state[idx].skills.data}
            />
          </FormSubsection>
        </React.Fragment>
      );
    });
  }
  return (
    <FormContainer
      title={state.length <= 1 ? "Projects:" : `Projects: (${state.length} Listed)`}
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
      handleAdd={state.length < 4 ? handleClickAddProject : undefined}
      animating={animating}
      handleAnimationEnd={handleAnimationEnd}
    >
      {state.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-md px-3 pt-2 text-center">No Projects Added:</p>
          <p className="px-3 pb-2 text-center text-sm">
            To Add A Project, Click the + In The Upper Right Corner
          </p>
        </div>
      ) : (
        renderProjects(state)
      )}
    </FormContainer>
  );
}

export default ProjectsForm;
