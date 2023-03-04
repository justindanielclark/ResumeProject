import {
  JobData,
  EducationData,
  ReferenceData,
  NameData,
  Address,
  PhoneContactData,
  WebContactData,
  NonCollegiateEducationData,
  ProjectData,
} from "./resumeData";

type AppState = {
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
  projects: {
    data: Array<ProjectData>;
    error: boolean;
    prevRendered: boolean;
  };
};

export type { AppState };
export default AppState;
