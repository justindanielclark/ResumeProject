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
  if (stateField in state) {
    if ("error" in state[stateField as keyof StatefulData<T>]) {
      setState({
        ...state,
        [stateField]: {
          data: inputValue,
          error: !validatorFunc(inputValue),
        },
      });
    } else {
      setState({
        ...state,
        [stateField]: {
          data: inputValue,
        },
      });
    }
  } else {
    throw new Error("Attempted to access a field that does not exist in state");
  }
}

function handleTextInputBlur<T>(
  e: React.ChangeEvent<HTMLInputElement>,
  state: StatefulData<T>,
  setState: React.Dispatch<React.SetStateAction<StatefulData<T>>>,
  validatorFunc: (str: string) => boolean
): void {
  const valid = validatorFunc(e.target.value);
  const stateField = e.target.name;
  if (stateField in state) {
    if (!valid) {
      if ("error" in state[stateField as keyof StatefulData<T>]) {
        setState({
          ...state,
          [stateField]: {
            data: e.target.value,
            error: !valid,
          },
        });
      }
    }
  } else {
    throw new Error("Attempted to access a field that does not exist in state");
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
  console.log({ selectValue });
  console.log({ stateField });
  if (stateField in state) {
    setState({
      ...state,
      [stateField]: {
        data: selectValue,
      },
    });
  }
}

export { handleTextInputChange, handleTextInputBlur, handleSelectInputChange };
