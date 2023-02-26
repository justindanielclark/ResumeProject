import {
  JobData,
  EducationData,
  ReferenceData,
  NameData,
  Address,
  PhoneContactData,
  WebContactData,
  NonCollegiateEducationData,
} from "./resumeData";

type TransitionState = "none" | "forward" | "backwards";

type AppState = {
  currentSlide: number;
  transitionSlide: number;
  transitioning: TransitionState;
  resume: {
    name: {
      data: NameData;
      error: boolean;
      prevRendered: boolean;
    };
    contactAddress: {
      data: Address;
      error: boolean;
      prevRendered: boolean;
    };
    contactWeb: {
      data: WebContactData;
      error: boolean;
      prevRendered: boolean;
    };
    contactPhone: {
      data: PhoneContactData;
      error: boolean;
      prevRendered: boolean;
    };
    workExperience: {
      data: Array<JobData>;
      error: boolean;
      prevRendered: boolean;
    };
    education: {
      data: Array<EducationData>;
      error: boolean;
      prevRendered: boolean;
    };
    nonCollegiateEducation: {
      data: Array<NonCollegiateEducationData>;
      error: boolean;
      prevRendered: boolean;
    };
    references: {
      data: Array<ReferenceData>;
      error: boolean;
      prevRendered: boolean;
    };
    skills: {
      data: Array<string>;
      error: boolean;
      prevRendered: boolean;
    };
  };
};

export type { TransitionState, AppState };
export default AppState;
