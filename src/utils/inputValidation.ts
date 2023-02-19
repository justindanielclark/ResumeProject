function checkInputForNotEmpty(name: string): boolean {
  return name.length !== 0;
}

function checkValidZIP(zip: string): boolean {
  const reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return reg.test(zip);
}

function checkValidPhoneNumber(str: string): boolean {
  const phoneRegex = new RegExp(/\(\d{3}\)\d{3}-\d{4}/);
  return phoneRegex.test(str);
}

export { checkInputForNotEmpty, checkValidZIP, checkValidPhoneNumber };
