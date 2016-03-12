export const uncapitalize = (string) => {
  const firstLetterUncapitalized = string.charAt(0).toLowerCase();
  const restOfTheString = string.substr(1);

  return firstLetterUncapitalized + restOfTheString;
};
