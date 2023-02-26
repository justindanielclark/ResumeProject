import {
  NameData,
  Address,
  PhoneContactData,
  WebContactData,
  JobData,
  EducationData,
  NonCollegiateEducationData,
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

interface AddressContactAction extends WithPayload<Address> {
  type: "submitAddressContactInfo";
}

interface PhoneContactAction extends WithPayload<PhoneContactData> {
  type: "submitPhoneContactInfo";
}

interface WebContactAction extends WithPayload<WebContactData> {
  type: "submitWebContactInfo";
}

interface WorkExperienceAction extends WithPayload<Array<JobData>> {
  type: "submitWorkExperienceInfo";
}
interface EducationAction extends WithPayload<Array<EducationData>> {
  type: "submitEducationInfo";
}
interface NonCollegiateAction extends WithPayload<Array<NonCollegiateEducationData>> {
  type: "submitNonCollegiateEducationInfo";
}

type ReducerAction =
  | NameAction
  | AddressContactAction
  | PhoneContactAction
  | WebContactAction
  | WorkExperienceAction
  | EducationAction
  | NonCollegiateAction;

export default ReducerAction;
