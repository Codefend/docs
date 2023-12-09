import { outputBaseItem, outputBaseTitle } from "./output-base";

export const outputIgnoreTitle = (option: IOutputIgnoreTitleOption) => {
  return outputBaseTitle({
    icon: "✔",
    title: "Ignore Transformation",
    detectedWords: option.detectedWords,
    registeredWords: option.registeredWords,
  });
};

export const outputIgnoreItem = (option: IOutputIgnoreItemOption) => {
  return outputBaseItem({
    icon: "I",
    from: option.from,
    to: option.from,
    regex: option.regex,
    occurrences: option.occurrences,
    hasArrow: false,
  });
};

export interface IOutputIgnoreTitleOption {
  detectedWords: number;
  registeredWords: number;
}

export interface IOutputIgnoreItemOption {
  from: string;
  occurrences: number;
  regex: string;
}
