export const formatNoVowels = (text: string) => {
  return text.replace(/[aeiou]/gi, "");
};
