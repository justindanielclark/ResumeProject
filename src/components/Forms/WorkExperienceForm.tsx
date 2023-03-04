import React, { useEffect, useState } from "react";
import stateAbbreviations from "../../data/stateAbbreviations";
import { FormContainer, FormAnimatingTypes } from "../FormContainer/FormContainer";
import TextInput from "../FormInput/TextInput";
import SelectInput from "../FormInput/SelectInput";
import { Address, JobData, StatefulData } from "../../types/resumeData";
import { checkInputForNotEmpty, checkValidZIP } from "../../utils/inputValidation";
import SubHeader from "../FormInput/SubHeader";
import FormSubsection from "./FormSubSection";
import TextAreaInput from "../FormInput/TextAreaInput";
import jobExamples from "../../data/jobExamples";
import DateInput from "../FormInput/DateInput";
import {
  handleTextInputChangeWithArrayData,
  handleTextInputBlurWithArrayData,
} from "../../utils/handlers";
type State = Array<StatefulData<JobData>>;
type Props = {
  propState: Array<JobData>;
  prevRendered: boolean;
  nextHandler: () => void;
  prevHandler?: () => void;
  submitHandler: (payload: { data: Array<JobData>; error: boolean }) => void;
  animating: FormAnimatingTypes;
  handleAnimationEnd?: () => void;
};
function WorkExperienceForm({
  submitHandler,
  nextHandler,
  prevHandler,
  propState,
  animating,
  handleAnimationEnd,
}: Props) {
  const [state, setState] = useState<State>(createState(propState));
  useEffect(() => {
    console.log("WorkExperienceForm:");
    console.log({ state });
  }, [state]);
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
          error: job.startDate > job.endDate,
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
          error: job.startDate > job.endDate,
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
    const newJob: StatefulData<JobData> = {
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
            data: "AL",
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
        data: {
          current: false,
          data: new Date(),
        },
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
        data: {
          current: false,
          data: new Date(),
        },
        error: false,
      },
      jobTitle: {
        data: "",
        error: false,
      },
    };
    const newState: State = [...state, newJob];
    setState(newState);
  }
  function handleClickRemoveJob(idx: number): void {
    const newState: State = state.filter((job, index) => {
      return index !== idx;
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
            data: {
              ...jobData.address.data,
              [stateField]: {
                data: e.target.value,
                error: false,
              },
            },
            error: jobData.address.error,
          },
        };
        return newStateItem;
      }
    });
    const addressData = newState[itemIndex].address.data;
    let error = false;
    for (const field in addressData) {
      const dataPoint = addressData[field as keyof Address];
      if (dataPoint) {
        if ("error" in dataPoint) {
          if (!error) {
            error = dataPoint.error as boolean;
          }
        }
      }
    }
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
            data: {
              ...jobData.address.data,
              [stateField]: {
                data: e.target.value,
                error: stateField !== "address2" ? !validatorFunc(e.target.value) : false,
              },
            },
            error: jobData.address.error,
          },
        };
        return newStateItem;
      }
    });
    const addressData = newState[itemIndex].address.data;
    let error = false;
    for (const field in addressData) {
      const dataPoint = addressData[field as keyof Address];
      if (dataPoint) {
        if ("error" in dataPoint) {
          if (!error) {
            error = dataPoint.error as boolean;
          }
        }
      }
    }
    newState[itemIndex].address.error = error;
    setState(newState);
  }
  function handleAddressSelectInputChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    idx: number,
    stateField: keyof Address
  ): void {
    const newState = state.map((jobData, index) => {
      if (idx !== index) {
        return jobData;
      } else {
        const newJobData: StatefulData<JobData> = {
          ...jobData,
          address: {
            ...jobData.address,
            [stateField]: {
              data: e.target.value,
              error: false,
            },
          },
        };
        return newJobData;
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
      jobs.push(
        <React.Fragment key={idx}>
          <SubHeader title={`Job ${idx + 1}:`} handleRemove={() => handleClickRemoveJob(idx)} />
          <FormSubsection>
            <TextInput
              label="Company Name:"
              labelID={`companyName_${idx}`}
              labelName={"companyName"}
              required={true}
              error={state[idx].companyName.error}
              errorMessage="A Company Name is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={state[idx].companyName.data}
              placeholder={jobExamples[idx].companyName}
            />
            <TextInput
              label="Title:"
              labelID={`title_${idx}`}
              labelName={`jobTitle`}
              required={true}
              error={state[idx].jobTitle.error}
              errorMessage="A Job Title Is Required"
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              value={state[idx].jobTitle.data}
              placeholder={jobExamples[idx].jobTitle}
            />
            <DateInput
              error={state[idx].startDate.error}
              errorMessage={"Start Date Must Preceed Your End Date"}
              dateValue={state[idx].startDate.data.data}
              label={"Start Date:"}
              required={true}
              labelName={`startDate${idx}`}
              handleChange={function (date) {
                const newState: Array<StatefulData<JobData>> = state.map((dataPoint, index) => {
                  if (idx !== index) {
                    return dataPoint;
                  } else {
                    const newDataPoint: StatefulData<JobData> = {
                      ...dataPoint,
                      startDate: {
                        data: {
                          data: date,
                        },
                        error: dataPoint.endDate.data.current
                          ? false
                          : dataPoint.startDate.data.data > dataPoint.endDate.data.data,
                      },
                    };
                    return newDataPoint;
                  }
                });
                setState(newState);
              }}
            />
            <DateInput
              error={false}
              errorMessage={""}
              dateValue={state[idx].endDate.data.data}
              label={"End Date:"}
              required={true}
              handleChange={function (date, current) {
                const newState: Array<StatefulData<JobData>> = state.map((dataPoint, index) => {
                  if (idx !== index) {
                    return dataPoint;
                  } else {
                    const newDataPoint: StatefulData<JobData> = {
                      ...dataPoint,
                      startDate: {
                        data: {
                          data: dataPoint.startDate.data.data,
                        },
                        error: current ? false : dataPoint.startDate.data.data > date,
                      },
                      endDate: {
                        data: {
                          data: date,
                          current: current,
                        },
                        error: false,
                      },
                    };
                    return newDataPoint;
                  }
                });
                setState(newState);
              }}
              labelName={`endDate_${idx}`}
              currentText={"Current Employer"}
              currentValue={state[idx].endDate.data.current}
            />
            <TextInput
              label="Address:"
              labelID={`address1_${idx}`}
              labelName={`address1_${idx}`}
              required={true}
              error={state[idx].address.data.address1.error}
              errorMessage="A Street Address is Required"
              onChange={(e) => handleAddressTextInputChange(e, idx, "address1")}
              onBlur={(e) => handleAddressTextInputBlur(e, idx, "address1", checkInputForNotEmpty)}
              placeholder={jobExamples[idx].address.address1}
            />
            <TextInput
              label="Apt/Suite/Addl Info:"
              labelID={`address2_${idx}`}
              labelName={`address2_${idx}`}
              required={false}
              onChange={(e) => handleAddressTextInputChange(e, idx, "address2")}
              placeholder={jobExamples[idx].address.address2}
            />
            <TextInput
              label="City:"
              labelID={`city_${idx}`}
              labelName={`city_${idx}`}
              onChange={(e) => handleAddressTextInputChange(e, idx, "city")}
              onBlur={(e) => handleAddressTextInputBlur(e, idx, "city", checkInputForNotEmpty)}
              required={true}
              errorMessage="Please Enter A City"
              error={state[idx].address.data.city.error}
              placeholder={jobExamples[idx].address.city}
            />
            <SelectInput
              error={false}
              errorMessage={""}
              label={"State:"}
              labelID={`state_${idx}`}
              labelName={`state_${idx}`}
              onChange={(e) => handleAddressSelectInputChange(e, idx, "state")}
              options={[...stateAbbreviations]}
              required={true}
            />
            <TextInput
              label="ZIP Code:"
              labelID={`zip_${idx}`}
              labelName={`zip_${idx}`}
              onChange={(e) => handleAddressTextInputChange(e, idx, "zip")}
              onBlur={(e) => handleAddressTextInputBlur(e, idx, "zip", checkValidZIP)}
              required={true}
              errorMessage="Please Enter Valid US ZIP Code"
              placeholder={jobExamples[idx].address.zip}
              error={state[idx].address.data.zip.error}
            />
            <TextAreaInput
              label="Description:"
              labelID={`description_${idx}`}
              labelName={`description`}
              onChange={(e) => handleTextInputChangeWithArrayData(e, idx, state, setState)}
              onBlur={(e) =>
                handleTextInputBlurWithArrayData(e, idx, state, setState, checkInputForNotEmpty)
              }
              required={true}
              errorMessage="A Job Description is Required"
              placeholder={jobExamples[idx].description}
              error={state[idx].description.error}
            />
          </FormSubsection>
        </React.Fragment>
      );
    });

    return jobs;
  }
  const handleSubmit = () => {
    const substantialJobs = state.filter((jobData) => !jobIsEmpty(jobData));
    let error = false;
    substantialJobs.forEach((jobData) => {
      for (const field in jobData) {
        const dataPoint = jobData[field as keyof JobData];
        if (dataPoint) {
          if ("error" in dataPoint) {
            if (!error) {
              error = dataPoint.error as boolean;
            }
          }
        }
      }
    });
    const payloadData: JobData[] = substantialJobs.map((jobData) => {
      const job: JobData = {
        address: {
          address1: jobData.address.data.address1.data,
          city: jobData.address.data.city.data,
          state: jobData.address.data.state.data,
          zip: jobData.address.data.zip.data,
          address2: jobData.address.data.address2 ? jobData.address.data.address2.data : undefined,
        },
        companyName: jobData.companyName.data,
        description: jobData.description.data,
        endDate: jobData.endDate.data,
        jobTitle: jobData.jobTitle.data,
        startDate: jobData.startDate.data,
      };
      return job;
    });
    submitHandler({
      data: payloadData,
      error,
    });
    nextHandler();
  };
  //!RENDER
  return (
    <FormContainer
      title={
        state.length === 0
          ? "Work Experience:"
          : `Work Experience: (${state.length} Job${state.length > 1 ? "s" : ""})`
      }
      nextHandler={handleSubmit}
      prevHandler={prevHandler}
      handleAdd={state.length < jobExamples.length ? handleClickAddJob : undefined}
      animating={animating}
      handleAnimationEnd={handleAnimationEnd}
    >
      {state.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-md px-3 pt-2 text-center">No Jobs Added:</p>
          <p className="px-3 pb-2 text-center text-sm">
            To Add A Job, Click the + In The Upper Right Corner
          </p>
        </div>
      ) : (
        renderJobs(state)
      )}
    </FormContainer>
  );
}

export default WorkExperienceForm;
