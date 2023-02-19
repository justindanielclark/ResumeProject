import { NameData, Address, PhoneContactData } from "./resumeData";

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

type ReducerAction = NameAction | AddressContactAction | PhoneContactAction;

export default ReducerAction;
