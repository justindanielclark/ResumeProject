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

function checkValidWebsiteAddress(str: string): boolean {
  const websiteRegex = new RegExp(
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  );
  return websiteRegex.test(str);
}

function checkValidEmail(str: string): boolean {
  const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  return emailRegex.test(str);
}

export {
  checkInputForNotEmpty,
  checkValidZIP,
  checkValidPhoneNumber,
  checkValidEmail,
  checkValidWebsiteAddress,
};
