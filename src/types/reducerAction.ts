const actions = [
  "submitName",
  "submitContactInfo",
  "submitAddress",
  "submitWorkExperience",
  "submitEducation",
  "submitSkills",
] as const;

type ReducerAction = {
  type: (typeof actions)[number];
  payload: any;
};

export default ReducerAction;
