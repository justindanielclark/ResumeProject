import {
  JobData,
  ContactData,
  EducationData,
  ReferenceData,
  NameData,
} from "./resumeData";

type AppState = {
  currentSlide: number;
  transitionSlide?: number;
  transitioning: "none" | "forward" | "backwards";
  resume: {
    name: {
      data: NameData;
      error?: boolean;
      prevRendered: boolean;
    };
    contact: {
      data: ContactData;
      error?: boolean;
      prevRendered: boolean;
    };
    workExperience: {
      data: Array<JobData>;
      error?: boolean;
      prevRendered: boolean;
    };
    education: {
      data: Array<EducationData>;
      error?: boolean;
      prevRendered: boolean;
    };
    references: {
      data: Array<ReferenceData>;
      error?: boolean;
      prevRendered: boolean;
    };
    skills: {
      data: Array<string>;
      error?: boolean;
      prevRendered: boolean;
    };
  };
};

export default AppState;
