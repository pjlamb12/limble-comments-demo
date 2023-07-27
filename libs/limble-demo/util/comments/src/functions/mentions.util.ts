export function findSubstringFromLastAtSign(str: string) {
  const lastIndex = str.lastIndexOf('@');

  if (lastIndex !== -1) {
    return str.substring(lastIndex + 1);
  } else {
    // If there is no "@" sign in the string, return the whole string.
    return str;
  }
}

export function findSubstringUntilLastAtSign(str: string) {
  const lastIndex = str.lastIndexOf('@');

  if (lastIndex !== -1) {
    return str.substring(0, lastIndex + 1);
  } else {
    // If there is no "@" sign in the string, return the whole string.
    return str;
  }
}
