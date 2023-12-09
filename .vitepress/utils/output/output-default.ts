import { outputBaseItem, outputBaseTitle } from "./output-base";

export const outputDefaultTitle = (option: IOutputDefaultTitleOption) => {
  return outputBaseTitle({
    icon: "✔",
    title: "Default Transformation",
    detectedWords: option.detectedWords,
  });
};

export const outputDefaultItem = (option: IOutputDefaultItemOption) => {
  return outputBaseItem({
    icon: "D",
    from: option.from,
    to: option.to,
    regex: option.regex,
    occurrences: option.occurrences,
    hasArrow: true,
  });
};

export interface IOutputDefaultTitleOption {
  detectedWords: number;
  registeredWords: number;
}

export interface IOutputDefaultItemOption {
  from: string;
  to: string;
  occurrences: number;
  regex: string;
}
