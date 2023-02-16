import {
  NameData,
  ContactData,
  EducationData,
  JobData,
  ReferenceData,
} from "./resumeData";

interface WithPayload<Type> {
  payload: {
    data: Type;
    error: boolean;
  };
}

interface NameAction extends WithPayload<NameData> {
  type: "submitName";
}

interface ContactAction extends WithPayload<ContactData> {
  type: "submitContactInfo";
}

interface WorkExperienceAction extends WithPayload<Array<JobData>> {
  type: "submitWorkExperience";
}

interface EducationAction extends WithPayload<Array<EducationData>> {
  type: "submitEducation";
}

interface SkillsAction extends WithPayload<Array<string>> {
  type: "submitSkills";
}

interface ReferenceAction extends WithPayload<Array<ReferenceData>> {
  type: "submitReferences";
}

type ReducerAction =
  | NameAction
  | ContactAction
  | WorkExperienceAction
  | EducationAction
  | SkillsAction
  | ReferenceAction;

export default ReducerAction;
