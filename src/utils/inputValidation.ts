function checkInputForNotEmpty(name: string): boolean {
  return name.length !== 0;
}

function checkValidZIP(zip: string): boolean {
  const reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return reg.test(zip);
}

export { checkInputForNotEmpty, checkValidZIP };
