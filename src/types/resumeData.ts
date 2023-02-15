const prefixes = ["N/A", "Mr.", "Mrs.", "Ms.", "Mx.", "Dr."] as const;
const suffixes = ["N/A", "Jr.", "Sr."] as const;
const degrees = ["Bachelors", "Masters", "Doctorate"] as const;
const degreeTypes = ["Arts", "Science"] as const;

type PrefixType = (typeof prefixes)[number];
type SuffixType = (typeof suffixes)[number];
type DegreeType = (typeof degreeTypes)[number];
type Degree = (typeof degrees)[number];
type WebInfoType = {
  websiteName: string;
  URL: string;
};
type Address = {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
};
type Job = {
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate: Date;
  address: Address;
  description: string;
  skillsets: Array<string>;
};
type Education = {
  school: string;
  end: Date;
  degree: Degree;
  degreeType: DegreeType;
  field: string;
};
type Reference = {
  fName: string;
  lName: string;
  title: string;
  job?: Job;
};

type ResumeData = {
  name: {
    prefix: PrefixType;
    firstName: string;
    lastName: string;
    suffix: SuffixType;
  };
  contactInformation: {
    phone: {
      home: Array<number>;
      mobile: Array<number>;
      other: Array<number>;
    };
    email: Array<string>;
    websites: Array<WebInfoType>;
    address: Address;
  };
  workExperience: Array<Job>;
  education: Array<Education>;
  skills: Array<string>;
  references: Array<Reference>;
};

export { prefixes, suffixes, degrees, degreeTypes };
export default ResumeData;
