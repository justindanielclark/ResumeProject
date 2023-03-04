import React from "react";
import { StatefulData } from "../types/resumeData";

function handleTextInputChange<T>(
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  state: StatefulData<T>,
  setState: React.Dispatch<React.SetStateAction<StatefulData<T>>>,
  validatorFunc: (str: string) => boolean
): void {
  const inputValue = e.target.value;
  const stateField = e.target.name;
  setState({
    ...state,
    [stateField]: {
      data: inputValue,
      error: !validatorFunc(inputValue),
    },
  });
}

function handleTextInputChangeWithArrayData<T>(
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  idx: number,
  state: Array<StatefulData<T>>,
  setState: React.Dispatch<React.SetStateAction<Array<StatefulData<T>>>>
): void {
  const inputValue = e.target.value;
  const stateField = e.target.name;
  const newState: Array<StatefulData<T>> = state.map((data, index) => {
    if (index !== idx) {
      return data;
    } else {
      const newData: StatefulData<T> = {
        ...data,
        [stateField]: {
          data: inputValue,
          error: false,
        },
      };
      return newData;
    }
  });
  setState(newState);
}

function handleTextInputBlur<T>(
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  state: StatefulData<T>,
  setState: React.Dispatch<React.SetStateAction<StatefulData<T>>>,
  validatorFunc: (str: string) => boolean
): void {
  const input = e.target.value;
  const valid = validatorFunc(input);
  const stateField = e.target.name;
  if (state[stateField as keyof StatefulData<T>].error !== !valid) {
    setState({
      ...state,
      [stateField]: {
        data: input,
        error: !valid,
      },
    });
  }
}

function handleTextInputBlurWithArrayData<T>(
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  idx: number,
  state: Array<StatefulData<T>>,
  setState: React.Dispatch<React.SetStateAction<Array<StatefulData<T>>>>,
  validatorFunc: (str: string) => boolean
): void {
  const inputValue = e.target.value;
  const valid = validatorFunc(inputValue);
  const stateField = e.target.name;
  if (state[idx][stateField as keyof StatefulData<T>].error !== !valid) {
    const newState: Array<StatefulData<T>> = state.map((data, index) => {
      if (index !== idx) {
        return data;
      } else {
        const newData: StatefulData<T> = {
          ...data,
          [stateField]: {
            data: inputValue,
            error: !validatorFunc(inputValue),
          },
        };
        return newData;
      }
    });
    setState(newState);
  }
}

function handleSelectInputChange<T>(
  e: React.ChangeEvent<HTMLSelectElement>,
  state: StatefulData<T>,
  setState: React.Dispatch<React.SetStateAction<StatefulData<T>>>,
  values: readonly string[]
): void {
  const selectValue = e.target.value as (typeof values)[number];
  const stateField = e.target.name;
  if (stateField in state) {
    setState({
      ...state,
      [stateField]: {
        data: selectValue,
        error: false,
      },
    });
  }
}

function handleSelectInputChangeWithArrayData<T>(
  e: React.ChangeEvent<HTMLSelectElement>,
  idx: number,
  state: Array<StatefulData<T>>,
  setState: React.Dispatch<React.SetStateAction<Array<StatefulData<T>>>>,
  values: readonly string[]
): void {
  const selectValue = e.target.value as (typeof values)[number];
  const stateField = e.target.name;
  const newState: Array<StatefulData<T>> = state.map((data, index) => {
    if (index !== idx) {
      return data;
    } else {
      const newData: StatefulData<T> = {
        ...data,
        [stateField]: {
          data: selectValue,
          error: false,
        },
      };
      return newData;
    }
  });
  setState(newState);
}

function handleDateInputChangeWithArrayData<T>(
  dateInfo: {
    date: Date;
    current: boolean;
  },
  idx: number,
  state: Array<StatefulData<T>>,
  stateField: string,
  setState: React.Dispatch<React.SetStateAction<Array<StatefulData<T>>>>
): void {
  const newState: Array<StatefulData<T>> = state.map((data, index) => {
    if (index !== idx) {
      return data;
    } else {
      const newData: StatefulData<T> = {
        ...data,
        [stateField]: {
          data: dateInfo,
          error: false,
        },
      };
      return newData;
    }
  });
  setState(newState);
}

export {
  handleTextInputChange,
  handleTextInputBlur,
  handleSelectInputChange,
  handleTextInputBlurWithArrayData,
  handleTextInputChangeWithArrayData,
  handleSelectInputChangeWithArrayData,
  handleDateInputChangeWithArrayData,
};
