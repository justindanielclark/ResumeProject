import { NameData, Address, PhoneContactData, WebContactData, JobData } from "./resumeData";

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

type ReducerAction =
  | NameAction
  | AddressContactAction
  | PhoneContactAction
  | WebContactAction
  | WorkExperienceAction;

export default ReducerAction;
