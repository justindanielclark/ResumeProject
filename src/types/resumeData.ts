import pronouns from "../data/pronouns";
import { prefixes, suffixes } from "../data/nameAdditives";
import { degrees, degreeTypes } from "../data/degrees";

type PronounType = (typeof pronouns)[number];
type PrefixType = (typeof prefixes)[number];
type SuffixType = (typeof suffixes)[number];
type DegreeType = (typeof degreeTypes)[number];
type Degree = (typeof degrees)[number];
type WebInfoType = {
  websiteName: string;
  URL: string;
};
type NameData = {
  prefix: PrefixType;
  firstName: string;
  lastName: string;
  suffix: SuffixType;
  pronouns: PronounType;
};
type PhoneContactData = {
  home: string;
  mobile: string;
  other: string;
};
type WebContactData = {
  email: Array<string>;
  websites: Array<WebInfoType>;
};
type Address = {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
};
type JobData = {
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate: Date;
  address: Address;
  description: string;
  skillsets: Array<string>;
};
type EducationData = {
  school: string;
  end: Date;
  degree: Degree;
  degreeType: DegreeType;
  field: string;
};
type ReferenceData = {
  fName: string;
  lName: string;
  title: string;
  job?: JobData;
};
type StatefulData<T> = {
  [P in keyof T]: {
    data: T[P];
    error?: boolean;
  };
};

type Payload<T> = {
  data: {
    [P in keyof T]: T[P];
  };
  error: boolean;
};

type ResumeData = {
  name: NameData;
  contactAddress: Address;
  contactWeb: WebContactData;
  contactPhone: PhoneContactData;
  workExperience: Array<JobData>;
  education: Array<EducationData>;
  skills: Array<string>;
  references: Array<ReferenceData>;
};

export { prefixes, suffixes, pronouns, degrees, degreeTypes };
export type {
  JobData,
  NameData,
  ReferenceData,
  Address,
  WebContactData,
  PhoneContactData,
  EducationData,
  SuffixType,
  PrefixType,
  PronounType,
  StatefulData,
  Payload,
  WebInfoType,
};
export default ResumeData;
