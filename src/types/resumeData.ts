const pronouns = [
  ["-None Selected-"],
  ["he", "him", "his"],
  ["she", "her", "her"],
  ["they", "they", "their"],
  ["zie", "zim", "zir"],
  ["sie", "sie", "hir"],
  ["ey", "em", "eir"],
  ["ve", "ver", "vis"],
  ["tey", "ter", "tem"],
  ["e", "em", "eir"],
] as const;
const prefixes = [
  "-None Selected-",
  "Mr.",
  "Mrs.",
  "Ms.",
  "Mx.",
  "Dr.",
] as const;
const suffixes = ["-None Selected-", "Jr.", "Sr."] as const;
const degrees = ["Bachelors", "Masters", "Doctorate"] as const;
const degreeTypes = ["Arts", "Science"] as const;

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
  pronoun: PronounType;
};
type ContactData = {
  phone: {
    home: Array<number>;
    mobile: Array<number>;
    other: Array<number>;
  };
  email: Array<string>;
  websites: Array<WebInfoType>;
  address: Address;
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

type ResumeData = {
  name: NameData;
  contactInformation: ContactData;
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
  ContactData,
  EducationData,
  SuffixType,
  PrefixType,
  PronounType,
};
export default ResumeData;
