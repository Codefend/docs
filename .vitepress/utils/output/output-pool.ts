import { outputBaseItem, outputBaseTitle } from "./output-base";

export const outputPoolTitle = (option: IOutputPoolTitleOption) => {
  return outputBaseTitle({
    icon: "✔",
    title: "Pool Transformation",
    detectedWords: option.detectedWords,
    registeredWords: option.registeredWords,
  });
};

export const outputPoolItem = (option: IOutputPoolItemOption) => {
  return outputBaseItem({
    icon: "P",
    from: option.from,
    to: option.to,
    regex: option.regex,
    occurrences: option.occurrences,
    hasArrow: true,
  });
};

export interface IOutputPoolTitleOption {
  detectedWords: number;
  registeredWords: number;
}

export interface IOutputPoolItemOption {
  from: string;
  to: string;
  occurrences: number;
  regex: string;
}
