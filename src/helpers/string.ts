export const isStringMatch = (search: string, source: string) => {
  return source.toLowerCase().includes(search.toLowerCase());
};

export const takeFirstLetterEachWord = (text: string) => {
  var matches = text.match(/\b(\w)/g);
  return (matches ?? []).join("");
};
