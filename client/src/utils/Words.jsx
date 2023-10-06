import wordbank from "../data.json";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const generateWordSet = async () => {
  let wordSet;
  await fetch(wordbank)
    .then((response) => response.text())
    .then((res) => {
      const wordArr = res.split("\n");
      wordSet = new Set(wordArr);
    });
  return { wordSet };
};
