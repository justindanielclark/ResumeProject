import { FormAnimatingTypes } from "../components/FormContainer/FormContainer";

type AnimatingAppState = {
  currentSlide: number;
  transitionSlide: number;
  transitioning: FormAnimatingTypes;
};

export default AnimatingAppState;
