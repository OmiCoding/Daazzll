import { validCheck } from "../../custom-types";



export const validPhone: validCheck = function (phoneNum: string) {
  // This only applies for US phone numbers.
  if (phoneNum.length !== 12) {
    return "Please put in a valid phone number.";
  } else {
    const phoneArr = phoneNum.split("-");
    const smallRegex = /\d{3}/;
    const largeRegex = /\d{4}/;

    for (let i = 0; i < phoneArr.length; i++) {
      const numSet = phoneArr[i];
      if (numSet.length === 3 && !smallRegex.test(numSet)) {
        return "Please put in a valid phone number.";
      } else if (numSet.length === 4 && !largeRegex.test(numSet)) {
        return "Please put in a valid phone number.";
      }

      if (numSet.length === 3) continue;
      else if (i === 2 && numSet.length === 4) continue;

      if (i === 2 && numSet.length !== 4)
        return "Please put in a valid phone number.";
      else if (numSet.length !== 3)
        return "Please put in a valid phone number.";
    }

    return false;
  }
};
