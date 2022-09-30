export const whiteSpace = function (str: string) {
  const regex = /\s/;
  if (regex.test(str)) {
    return true;
  }

  return false;
};

export const longStr = function (str: string) {
  if (str.length > 255) {
    return true;
  }

  return false;
};

export const emptyStr = function (str: string) {
  if (str.length < 1) {
    return true;
  }

  return false;
};

export const specChar = function (str: string) {
  const regex = /\W/;

  if (regex.test(str)) {
    return true;
  }

  return false;
};
