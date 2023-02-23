import React, { useState } from "react";
import stateAbbreviations from "../../data/stateAbbreviations";
import FormContainer from "../FormContainer/FormContainer";
import TextInput from "../FormInput/TextInput";
import SelectInput from "../FormInput/SelectInput";
import { Address, JobData, StatefulData } from "../../types/resumeData";
import { checkInputForNotEmpty, checkValidZIP } from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import FormSubsection from "./FormSubSection";
import TextAreaInput from "../FormInput/TextAreaInput";
type State = Array<StatefulData<JobData>>;
type Props = {
  propState: Array<JobData>;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler?: () => void;
  submitHandler: (payload: { data: Array<JobData>; error: boolean }) => void;
};
function WorkExperienceForm({
  submitHandler,
  nextHandler,
  prevHandler,
  propState,
  prevRendered,
}: Props) {
  const [state, setState] = useState<State>(createState(propState));
  function createState(jobData: Array<JobData>): State {
    const state: State = [];
    jobData.forEach((job) => {
      state.push({
        address: {
          data: {
            address1: {
              data: job.address.address1,
              error: !checkInputForNotEmpty(job.address.address1),
            },
            address2: {
              data: job.address.address2 ? job.address.address2 : undefined,
              error: job.address.address2
                ? !checkInputForNotEmpty(job.address.address2)
                : undefined,
            },
            city: {
              data: job.address.city,
              error: !checkInputForNotEmpty(job.address.city),
            },
            state: {
              data: job.address.state,
              error: !checkInputForNotEmpty(job.address.state),
            },
            zip: {
              data: job.address.zip,
              error: !checkValidZIP(job.address.zip),
            },
          },
          error: !(
            checkInputForNotEmpty(job.address.address1) &&
            checkInputForNotEmpty(job.address.city) &&
            checkInputForNotEmpty(job.address.state) &&
            checkValidZIP(job.address.zip) &&
            (job.address.address2 ? checkInputForNotEmpty(job.address.address2) : true)
          ),
        },
        startDate: {
          data: job.startDate,
          error: false,
        },
        companyName: {
          data: job.companyName,
          error: !checkInputForNotEmpty(job.companyName),
        },
        description: {
          data: job.description,
          error: !checkInputForNotEmpty(job.description),
        },
        endDate: {
          data: job.endDate,
          error: false,
        },
        jobTitle: {
          data: job.jobTitle,
          error: !checkInputForNotEmpty(job.jobTitle),
        },
      });
    });
    return state;
  }
  function handleClickAddJob(): void {
    const newJob = {
      address: {
        data: {
          address1: {
            data: "",
            error: false,
          },
          city: {
            data: "",
            error: false,
          },
          state: {
            data: "",
            error: false,
          },
          zip: {
            data: "",
            error: false,
          },
        },
        error: false,
      },
      startDate: {
        data: new Date(),
        error: false,
      },
      skillsets: {
        data: [{ data: "", error: false }],
        error: false,
      },
      companyName: {
        data: "",
        error: false,
      },
      description: {
        data: "",
        error: false,
      },
      endDate: {
        data: new Date(),
        error: false,
      },
      jobTitle: {
        data: "",
        error: false,
      },
    };
    const newState: State = [...state, newJob];
    console.log(newState);
    setState(newState);
  }
  function handleTextInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number,
    stateField: keyof StatefulData<JobData>
  ): void {
    const newState = state.map((jobData, idx) => {
      if (idx !== itemIndex) {
        return jobData;
      } else {
        const newStateItem: StatefulData<JobData> = {
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
  function handleAddressTextInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number,
    stateField: keyof Address
  ): void {
    const newState = state.map((jobData, idx) => {
      if (idx !== itemIndex) {
        return jobData;
      } else {
        const newStateItem: StatefulData<JobData> = {
          ...jobData,
          address: {
            ...jobData.address,
            [stateField]: {
              data: e.target.value,
              error: false,
            },
          },
        };
        return newStateItem;
      }
    });
    setState(newState);
  }
  function handleAddressTextInputBlur(
    e: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number,
    stateField: keyof Address,
    validatorFunc: (str: string) => boolean
  ): void {
    const newState = state.map((jobData, idx) => {
      if (idx !== itemIndex) {
        return jobData;
      } else {
        const newStateItem: StatefulData<JobData> = {
          ...jobData,
          address: {
            ...jobData.address,
            [stateField]: {
              data: e.target.value,
              error: !validatorFunc(e.target.value),
            },
          },
        };
        return newStateItem;
      }
    });
    setState(newState);
  }
  function handleTextInputBlur(
    e: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number,
    stateField: keyof StatefulData<JobData>,
    validatorFunc: (str: string) => boolean
  ) {
    const newState = state.map((jobData, idx) => {
      if (idx !== itemIndex) {
        return jobData;
      } else {
        const newStateItem: StatefulData<JobData> = {
          ...jobData,
          [stateField]: {
            data: e.target.value,
            error: !validatorFunc(e.target.value),
          },
        };
        return newStateItem;
      }
    });
    setState(newState);
  }
  function handleDateInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number,
    stateField: keyof StatefulData<JobData>
  ) {
    const newState = state.map((jobData, idx) => {
      if (idx !== itemIndex) {
        return jobData;
      } else {
        const newStateItem: StatefulData<JobData> = {
          ...jobData,
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
  function jobIsEmpty(jobData: StatefulData<JobData>): boolean {
    return (
      jobData.address.data.address1.data === "" &&
      jobData.address.data.city.data === "" &&
      jobData.address.data.state.data === "" &&
      jobData.address.data.zip.data === "" &&
      jobData.companyName.data === "" &&
      jobData.description.data === "" &&
      jobData.jobTitle.data === ""
    );
  }
  function renderJobs(state: State) {
    const jobs: Array<JSX.Element> = [];

    state.forEach((job, idx) => {
      const startDate = job.startDate.data;
      const endDate = job.endDate.data;
      console.log({ startDate });
      jobs.push(
        <FormSubsection key={idx}>
          <SubHeader title={`Job ${idx + 1}:`} handleRemove={() => console.log()} />
          <TextInput
            label="Company Name:"
            labelID={`companyName_${idx}`}
            labelName={`companyName_${idx}`}
            required={true}
            error={state[idx].companyName.error}
            errorMessage="A Company Name is Required"
            onChange={(e) => handleTextInputChange(e, idx, "companyName")}
            onBlur={(e) => handleTextInputBlur(e, idx, "companyName", checkInputForNotEmpty)}
            value={state[idx].companyName.data}
          />
          <TextInput
            label="Title:"
            labelID={`title_${idx}`}
            labelName={`title_${idx}`}
            required={true}
            error={state[idx].jobTitle.error}
            errorMessage="A Job Title Is Required"
            onChange={(e) => handleTextInputChange(e, idx, "jobTitle")}
            onBlur={(e) => handleTextInputBlur(e, idx, "jobTitle", checkInputForNotEmpty)}
            value={state[idx].jobTitle.data}
          />
          <TextInput
            label="Start Date:"
            labelID={`startDate_${idx}`}
            labelName={`startDate_${idx}`}
            required={true}
            error={state[idx].startDate.error}
            type="date"
            errorMessage="A Start Date Is Required"
            onChange={(e) => handleDateInputChange(e, idx, "startDate")}
            onBlur={/* //! */ dummyFunc}
            value={`${startDate.toISOString().slice(0, 10)}`}
          />
          <TextInput
            label="End Date:"
            labelID={`endDate${idx}`}
            labelName={`endDate${idx}`}
            required={true}
            error={state[idx].endDate.error}
            type="date"
            errorMessage="An End Date Is Required"
            onChange={(e) => handleDateInputChange(e, idx, "endDate")}
            onBlur={/* //! */ dummyFunc}
            value={`${endDate.toISOString().slice(0, 10)}`}
          />
          <TextInput
            label="Address:"
            labelID={`address1_${idx}`}
            labelName={`address1_${idx}`}
            required={true}
            error={state[idx].address.data.address1.error}
            errorMessage="A Street Address is Required"
            onChange={(e) => handleAddressTextInputChange(e, idx, "address1")}
            onBlur={dummyFunc}
          />
          <TextInput
            label="Apt/Suite/Addl Info:"
            labelID={`address2_${idx}`}
            labelName={`address2_${idx}`}
            required={true}
            onChange={dummyFunc}
            onBlur={dummyFunc}
          />
          <TextInput
            label="City:"
            labelID={`city_${idx}`}
            labelName={`city_${idx}`}
            onChange={dummyFunc}
            onBlur={dummyFunc}
            required={true}
            errorMessage="Please Enter A City"
            placeholder="Coolsville"
            error={state[idx].address.data.city.error}
          />
          <SelectInput
            error={false}
            errorMessage={""}
            label={"State:"}
            labelID={`state_${idx}`}
            labelName={`state_${idx}`}
            onChange={(e) => console.log(e)}
            options={[...stateAbbreviations]}
            required={true}
          />
          <TextInput
            label="ZIP Code:"
            labelID={`zip_${idx}`}
            labelName={`zip_${idx}`}
            onChange={dummyFunc}
            onBlur={dummyFunc}
            required={true}
            errorMessage="Please Enter Valid US ZIP Code"
            placeholder="12345"
            error={state[idx].address.data.zip.error}
          />
          <TextAreaInput
            label="Description:"
            labelID={`description_${idx}`}
            labelName={`description_${idx}`}
            onChange={(e) => console.log(e)}
            onBlur={(e) => console.log(e)}
            required={true}
            errorMessage="A Job Description is Required"
            placeholder="Responsible for overseeing operations on..."
            error={state[idx].description.error}
          />
        </FormSubsection>
      );
    });

    return jobs;
  }
  function dummyFunc(
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>
  ): void {
    console.log("dummyFunc from WorkExperienceForm.tsx");
  }

  //!RENDER
  return (
    <FormContainer
      title="Work Experience:"
      nextHandler={dummyFunc}
      prevHandler={prevHandler}
      handleAdd={handleClickAddJob}
    >
      {state.length === 0 ? (
        <>
          <p className="text-md text-center px-3 pt-2">No Jobs Added:</p>
          <p className="px-3 text-center text-sm pb-2">
            To Add A Job, Click the + In The Upper Right Corner
          </p>
        </>
      ) : (
        renderJobs(state)
      )}
    </FormContainer>
  );
}

export default WorkExperienceForm;
