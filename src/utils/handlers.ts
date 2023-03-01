import React from "react";
import { StatefulData } from "../types/resumeData";

function handleTextInputChange<T>(
  e: React.ChangeEvent<HTMLInputElement>,
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
  e: React.ChangeEvent<HTMLInputElement>,
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
  e: React.ChangeEvent<HTMLInputElement>,
  state: StatefulData<T>,
  setState: React.Dispatch<React.SetStateAction<StatefulData<T>>>,
  validatorFunc: (str: string) => boolean
): void {
  const valid = validatorFunc(e.target.value);
  const stateField = e.target.name;
  setState({
    ...state,
    [stateField]: {
      data: e.target.value,
      error: !valid,
    },
  });
}

function handleTextInputBlurWithArrayData<T>(
  e: React.ChangeEvent<HTMLInputElement>,
  idx: number,
  state: Array<StatefulData<T>>,
  setState: React.Dispatch<React.SetStateAction<Array<StatefulData<T>>>>,
  validatorFunc: (str: string) => boolean
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
          error: !validatorFunc(inputValue),
        },
      };
      return newData;
    }
  });
  setState(newState);
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
