const ScreenTypes = [
  "start",
  "name",
  "contactInfo",
  "address",
  "workExperience",
  "education",
  "skills",
] as const;

type ScreenType = (typeof ScreenTypes)[number];

export { ScreenTypes };
export default ScreenType;
