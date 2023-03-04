import pronouns from "../data/pronouns";
import { prefixes, suffixes } from "../data/nameAdditives";
import { degrees, degreeTypes } from "../data/degrees";

type PronounType = (typeof pronouns)[number];
type PrefixType = (typeof prefixes)[number];
type SuffixType = (typeof suffixes)[number];
type DegreeType = (typeof degreeTypes)[number];
type Degree = (typeof degrees)[number];
type DateDataPointType = {
  data: Date;
  current?: boolean;
};
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
type NonCollegiateEducationData = {
  program: string;
  end: DateDataPointType;
  description: string;
};
type EducationData = {
  school: string;
  end: DateDataPointType;
  degree: Degree;
  degreeType: DegreeType;
  field: string;
};
type ReferenceData = {
  fName: string;
  lName: string;
  relation: string;
  phone: string;
  email: string;
};
type JobData = {
  companyName: string;
  jobTitle: string;
  startDate: DateDataPointType;
  endDate: DateDataPointType;
  address: Address;
  description: string;
};
type ProjectData = {
  name: string;
  description: string;
  skills: string;
  liveURL?: string;
  repoURL?: string;
};
type ComplexType =
  | WebInfoType
  | NameData
  | PhoneContactData
  | WebContactData
  | Address
  | EducationData
  | JobData
  | ReferenceData
  | ProjectData;

type StatefulDataHelper<T> = {
  [P in keyof T]: {
    data: T[P];
    error?: boolean;
  };
};

type StatefulData<Type> = {
  [Property in keyof Type]: {
    data: Type[Property] extends Array<infer ArrayDataType>
      ? Array<{ data: ArrayDataType; error: boolean }>
      : Type[Property] extends ComplexType
      ? StatefulDataHelper<Type[Property]>
      : Type[Property];
    error: boolean;
  };
};

type Payload<T> = {
  data: {
    [P in keyof T]: T[P];
  };
  error: boolean;
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
  NonCollegiateEducationData,
  ProjectData,
};
